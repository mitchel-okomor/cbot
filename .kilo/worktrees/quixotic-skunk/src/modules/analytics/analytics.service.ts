import { Injectable, Logger } from "@nestjs/common";
import { CommonUtil } from "src/utils";
import { TradeRepository } from "../trading/repository/trade.repository";
import { Trade } from "src/database/entities";
import { Equal, In, MoreThanOrEqual } from "typeorm";
import { User } from "src/database/entities";
import { ExchangeService } from "../exchange/exchange.service";
import { TRADE_STATUS } from "src/enums";

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    private readonly tradeRepository: TradeRepository,
    private readonly exchangeService: ExchangeService,
  ) {}

  async getDashboard(user: User): Promise<any> {
    try {
      const trades = await this.tradeRepository.find({
        where: { userId: Equal(user.id) },
        order: { createdAt: "DESC" },
      });

      const activeTrades = trades.filter(t => t.status === TRADE_STATUS.ACTIVE);
      const closedTrades = trades.filter(t => t.status === TRADE_STATUS.CLOSED);

      const totalProfit = closedTrades.reduce((sum, t) => sum + (t.profitAmount || 0), 0);
      const winRate = closedTrades.length > 0
        ? (closedTrades.filter(t => (t.profitAmount || 0) > 0).length / closedTrades.length) * 100
        : 0;

      return {
        totalTrades: trades.length,
        activeTrades: activeTrades.length,
        closedTrades: closedTrades.length,
        totalProfit: totalProfit.toFixed(2),
        winRate: winRate.toFixed(2),
        openPositions: activeTrades.map(t => ({
          symbol: t.symbol,
          entryPrice: t.entryPrice,
          currentPrice: t.currentPrice,
          profit: t.profitPercentage?.toFixed(2),
        })),
      };
    } catch (error) {
      this.logger.error(
        "AnalyticsService :: getDashboard error %o",
        CommonUtil.getError(error)
      );
      return {};
    }
  }

  async getChart(user: User, query?: { symbol?: string; timeframe?: string; days?: number }): Promise<any> {
    try {
      const days = query?.days || 30;
      const trades = await this.tradeRepository.find({
        where: {
          userId: Equal(user.id),
          createdAt: MoreThanOrEqual(new Date(Date.now() - days * 24 * 60 * 60 * 1000)),
        },
        order: { createdAt: "ASC" },
      });

      if (query?.symbol) {
        const filtered = trades.filter(t => t.symbol === query.symbol.toUpperCase());
        return this.formatChartData(filtered);
      }

      return this.formatChartData(trades);
    } catch (error) {
      this.logger.error(
        "AnalyticsService :: getChart error %o",
        CommonUtil.getError(error)
      );
      return {};
    }
  }

  async getRisk(user: User, query?: { symbol?: string }): Promise<any> {
    try {
      const trades = await this.tradeRepository.find({
        where: { userId: Equal(user.id), status: TRADE_STATUS.ACTIVE },
      });

      if (query?.symbol) {
        const filtered = trades.filter(t => t.symbol === query.symbol.toUpperCase());
        return this.calculateRisk(filtered);
      }

      return this.calculateRisk(trades);
    } catch (error) {
      this.logger.error(
        "AnalyticsService :: getRisk error %o",
        CommonUtil.getError(error)
      );
      return {};
    }
  }

  async getSymbols(user: User): Promise<string[]> {
    try {
      const trades = await this.tradeRepository.find({
        where: { userId: Equal(user.id) },
        select: ["symbol"],
      });
      const symbols = [...new Set(trades.map(t => t.symbol))];
      return symbols;
    } catch (error) {
      this.logger.error(
        "AnalyticsService :: getSymbols error %o",
        CommonUtil.getError(error)
      );
      return [];
    }
  }

  private formatChartData(trades: Trade[]): any {
    const dailyData: Record<string, { profit: number; trades: number }> = {};

    trades.forEach(trade => {
      if (trade.closedAt) {
        const date = trade.closedAt.toISOString().split("T")[0];
        if (!dailyData[date]) {
          dailyData[date] = { profit: 0, trades: 0 };
        }
        dailyData[date].profit += trade.profitAmount || 0;
        dailyData[date].trades += 1;
      }
    });

    return Object.entries(dailyData).map(([date, data]) => ({
      date,
      profit: data.profit.toFixed(2),
      trades: data.trades,
    }));
  }

  private calculateRisk(trades: Trade[]): any {
    const totalExposure = trades.reduce((sum, t) => sum + (t.totalInvested || 0), 0);
    const totalProfit = trades.reduce((sum, t) => sum + (t.profitAmount || 0), 0);
    const avgPositionSize = trades.length > 0 ? totalExposure / trades.length : 0;

    return {
      totalExposure: totalExposure.toFixed(2),
      unrealizedProfit: totalProfit.toFixed(2),
      activePositions: trades.length,
      avgPositionSize: avgPositionSize.toFixed(2),
      riskLevel: totalExposure > 50000 ? "HIGH" : totalExposure > 20000 ? "MEDIUM" : "LOW",
      positions: trades.map(t => ({
        symbol: t.symbol,
        invested: t.totalInvested,
        profit: t.profitAmount?.toFixed(2),
        stopLoss: t.stopLoss,
      })),
    };
  }
}
