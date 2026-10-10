import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NotificationService } from "../notification/notification.service";
import { AlertService } from "../alert/alert.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ConfigService } from "@nestjs/config";
import { Trade, User } from "src/database/entities";
import { ExchangeService } from "../exchange/exchange.service";
import { TradeRepository } from "./repository/trade.repository";
import {
  CONVICTION_LEVEL,
  EMAIL_NOTIFICATION_EVENTS,
  TRADE_EVENTS,
  TRADE_STATUS,
} from "src/enums";

@Injectable()
export class TradingService {
  private readonly logger = new Logger(TradingService.name);
  private readonly tradingConfigs: Map<string, any> = new Map();

  constructor(
    private readonly tradeRepository: TradeRepository,
    private readonly exchangeService: ExchangeService,
    private readonly notificationService: NotificationService,
    private readonly alertService: AlertService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async scanForOpportunities() {
    try {
      // Get all users with active trading
      const users = await this.getActiveUsers();

      for (const user of users) {
        await this.scanForUser(user);
      }
    } catch (error: any) {
      this.logger.error(`Scan error: ${error.message}`);
    }
  }

  async scanForUser(user: User) {
    try {
      const config = await this.getUserConfig(user);

      // Get top losers
      const losers = await this.exchangeService.getTopLosers(user, {
        minVolume: config.minVolume,
        maxVolume: config.maxVolume,
        dropThreshold: config.dropThreshold,
        limit: 20,
      });

      // Check active trades
      const activeTrades = await this.tradeRepository.count({
        where: { userId: user.id, status: TRADE_STATUS.ACTIVE },
      });

      if (activeTrades >= config.maxActiveTrades) {
        return;
      }

      for (const loser of losers) {
        const existingTrade = await this.tradeRepository.findOne({
          userId: user.id,
          symbol: loser.symbol,
          status: TRADE_STATUS.ACTIVE,
        });

        if (!existingTrade) {
          await this.enterTrade(user, loser, config);
        }
      }
    } catch (error: any) {
      this.logger.error(`Scan for user ${user.id} error: ${error.message}`);
    }
  }

  async enterTrade(user: User, coinData: any, config: any) {
    try {
      const positionSize = this.calculatePositionSize(coinData, config);
      const order = await this.exchangeService.placeOrder(user, {
        symbol: coinData.symbol,
        side: "BUY",
        type: "MARKET",
        quantity: positionSize / coinData.lastPrice,
      });

      const trade = this.tradeRepository.create({
        user,
        userId: user.id,
        symbol: coinData.symbol,
        entryPrice: order.price,
        currentPrice: order.price,
        totalInvested: positionSize,
        quantity: order.executedQty,
        targetProfit: config.targetProfit,
        stopLoss: config.stopLoss,
        exchangeProvider: config.preferredExchange,
        conviction: this.calculateConviction(coinData),
        dropPercentage: coinData.change,
        volume24h: coinData.volume,
        dcaLevels: this.generateDCALevels(order.price, config),
      });

      await this.tradeRepository.save(trade);

      // Emit event
      this.eventEmitter.emit(TRADE_EVENTS.TRADE_ENTERED, {
        user,
        trade,
        coinData,
      });

      this.eventEmitter.emit(EMAIL_NOTIFICATION_EVENTS.TRADE_ENTRY, {
        user: user,
        type: "TRADE_ENTRY",
        title: `Trade Entered: ${coinData.symbol}`,
        body: `Bought ${coinData.symbol} at $${order.price.toFixed(4)}`,
        data: { tradeId: trade.id },
      });

      this.logger.log(`Trade entered: ${coinData.symbol} for user ${user.id}`);
    } catch (error: any) {
      this.logger.error(`Enter trade error: ${error.message}`);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async monitorActiveTrades() {
    try {
      const activeTrades = await this.tradeRepository.find({
        where: { status: TRADE_STATUS.ACTIVE },
        relations: ["user"],
      });

      for (const trade of activeTrades) {
        await this.monitorTrade(trade);
      }
    } catch (error: any) {
      this.logger.error(`Monitor trades error: ${error.message}`);
    }
  }

  async getActiveTrades() {
    try {
      const activeTrades = await this.tradeRepository.find({
        where: { status: TRADE_STATUS.ACTIVE },
        relations: ["user"],
      });

      return activeTrades;
    } catch (error: any) {
      this.logger.error(`Monitor trades error: ${error.message}`);
    }
  }

  async monitorTrade(trade: Trade) {
    try {
      const currentPrice = await this.exchangeService.getPrice(
        trade.user,
        trade.symbol,
      );

      trade.currentPrice = currentPrice;

      const profit =
        ((currentPrice - trade.entryPrice) / trade.entryPrice) * 100;

      // Check stop loss
      if (profit <= -trade.stopLoss) {
        await this.closeTrade(trade, "STOP_LOSS");
        return;
      }

      // Check take profit
      if (profit >= trade.targetProfit) {
        await this.closeTrade(trade, "TAKE_PROFIT");
        return;
      }

      // Check trailing stop
      if (profit > 5 && trade.trailingStop) {
        const highestPrice = await this.getHighestPrice(trade);
        if (
          highestPrice &&
          currentPrice / highestPrice - 1 < -trade.trailingStop / 100
        ) {
          await this.closeTrade(trade, "TRAILING_STOP");
          return;
        }
      }

      // Check DCA
      const dropFromEntry =
        ((trade.entryPrice - currentPrice) / trade.entryPrice) * 100;
      const dcaLevel = trade.dcaLevel || 0;
      const nextDCA = (dcaLevel + 1) * 5; // 5% spacing

      if (dropFromEntry >= nextDCA && dcaLevel < 5) {
        await this.executeDCA(trade, currentPrice);
      }

      await this.tradeRepository.save(trade);
    } catch (error: any) {
      this.logger.error(`Monitor trade ${trade.id} error: ${error.message}`);
    }
  }

  async executeDCA(trade: Trade, currentPrice: number) {
    try {
      const config = await this.getUserConfig(trade.user);
      const dcaAmount =
        config.basePositionSize * 0.5 * (1 - trade.dcaLevel * 0.15);

      const order = await this.exchangeService.placeOrder(trade.user, {
        symbol: trade.symbol,
        side: "BUY",
        type: "MARKET",
        quantity: dcaAmount / currentPrice,
      });

      trade.totalInvested += dcaAmount;
      trade.quantity += order.executedQty;
      trade.entryPrice = trade.totalInvested / trade.quantity;
      trade.dcaLevel = (trade.dcaLevel || 0) + 1;

      await this.tradeRepository.save(trade);

      this.eventEmitter.emit(TRADE_EVENTS.DCA_EXECUTED, {
        trade,
        amount: dcaAmount,
        price: currentPrice,
      });

      this.eventEmitter.emit(EMAIL_NOTIFICATION_EVENTS.DCA_EXECUTED, {
        user: trade.user,
        type: "DCA_EXECUTED",
        title: `DCA Executed: ${trade.symbol}`,
        body: `DCA level ${trade.dcaLevel} at $${currentPrice.toFixed(4)}`,
        data: { tradeId: trade.id },
      });
    } catch (error: any) {
      this.logger.error(`DCA error: ${error.message}`);
    }
  }

  async closeTrade(trade: Trade, reason: string) {
    try {
      const order = await this.exchangeService.placeOrder(trade.user, {
        symbol: trade.symbol,
        side: "SELL",
        type: "MARKET",
        quantity: trade.quantity,
      });

      const profit =
        ((order.price - trade.entryPrice) / trade.entryPrice) * 100;
      const profitAmount =
        order.executedQty * order.price - trade.totalInvested;

      trade.status = TRADE_STATUS.CLOSED;
      trade.closedAt = new Date();
      trade.exitReason = reason;
      trade.profitPercentage = profit;
      trade.profitAmount = profitAmount;
      trade.currentPrice = order.price;

      await this.tradeRepository.save(trade);

      this.eventEmitter.emit(TRADE_EVENTS.TRADE_EXITED, {
        trade,
        profit,
        profitAmount,
        reason,
      });

      this.eventEmitter.emit(EMAIL_NOTIFICATION_EVENTS.TRADE_EXIT, {
        user: trade.user,
        type: "TRADE_EXIT",
        title: `Trade Closed: ${trade.symbol}`,
        body: `${reason}: ${profit.toFixed(2)}% ($${profitAmount.toFixed(2)})`,
        data: { tradeId: trade.id },
      });

      this.logger.log(
        `Trade ${trade.id} closed: ${reason} (${profit.toFixed(2)}%)`,
      );
    } catch (error: any) {
      this.logger.error(`Close trade error: ${error.message}`);
    }
  }

  // Helper methods
  private async getActiveUsers(): Promise<User[]> {
    // Fetch users with active trading
    return [];
  }

  private async getUserConfig(user: User): Promise<any> {
    // Get user-specific trading config
    return {
      minVolume: 50000,
      maxVolume: 500000,
      dropThreshold: 10,
      maxActiveTrades: 15,
      targetProfit: 20,
      stopLoss: 20,
      basePositionSize: 200,
    };
  }

  private calculatePositionSize(coinData: any, config: any): number {
    let size = config.basePositionSize;
    if (coinData.change <= -40) size *= 1.5;
    else if (coinData.change <= -30) size *= 1.25;
    if (coinData.volume < 100000) size *= 0.75;
    return size;
  }

  private calculateConviction(coinData: any): CONVICTION_LEVEL {
    if (coinData.change <= -40) return CONVICTION_LEVEL.HIGH;
    if (coinData.change <= -20) return CONVICTION_LEVEL.MEDIUM;
    return CONVICTION_LEVEL.LOW;
  }

  private generateDCALevels(entryPrice: number, config: any): number[] {
    const levels = [];
    for (let i = 1; i <= 5; i++) {
      levels.push(entryPrice * (1 - (i * 5) / 100));
    }
    return levels;
  }

  private async getHighestPrice(trade: Trade): Promise<number | null> {
    // Get highest price since trade entry
    return null;
  }

  async getTradeHistory(user: User): Promise<Trade[]> {
    return this.tradeRepository.find({
      where: { userId: user.id },
      order: { createdAt: "DESC" },
      take: 100,
    });
  }

  async getOpportunities(user: User): Promise<any[]> {
    const config = await this.getUserConfig(user);
    return this.exchangeService.getTopLosers(user, {
      minVolume: config.minVolume,
      maxVolume: config.maxVolume,
      dropThreshold: config.dropThreshold,
      limit: 20,
    });
  }
}
