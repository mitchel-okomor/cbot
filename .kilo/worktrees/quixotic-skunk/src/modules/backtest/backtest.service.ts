import { Injectable, Logger } from "@nestjs/common";
import { BacktestResultRepository } from "./repository/backtest-result.repository";
import { BacktestResult } from "../../database/entities";
import { CommonUtil } from "src/utils";
import { Equal } from "typeorm";
import { User } from "src/database/entities";

@Injectable()
export class BacktestService {
  private readonly logger = new Logger(BacktestService.name);

  constructor(private readonly backtestResultRepository: BacktestResultRepository) {}

  async runBacktest(user: User, payload: { name: string; config: Record<string, any> }): Promise<BacktestResult> {
    try {
      // Here you would run the actual backtest logic
      // For now, we save the config and return mock results
      const mockResults = {
        totalTrades: 45,
        winningTrades: 28,
        losingTrades: 17,
        winRate: 62.2,
        totalProfit: 1250.50,
        maxDrawdown: 8.5,
        sharpeRatio: 1.45,
      };

      const mockMetrics = {
        profitFactor: 1.85,
        avgWin: 85.30,
        avgLoss: -45.20,
        largestWin: 320.00,
        largestLoss: -180.00,
      };

      const backtest = this.backtestResultRepository.create({
        userId: user.id,
        name: payload.name,
        config: payload.config,
        results: mockResults,
        metrics: mockMetrics,
      });

      return await this.backtestResultRepository.save(backtest);
    } catch (error) {
      this.logger.error(
        "BacktestService :: runBacktest error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async getHistory(user: User): Promise<BacktestResult[]> {
    try {
      return await this.backtestResultRepository.find({
        where: { userId: Equal(user.id) },
        order: { createdAt: "DESC" },
      });
    } catch (error) {
      this.logger.error(
        "BacktestService :: getHistory error %o",
        CommonUtil.getError(error)
      );
      return [];
    }
  }

  async getBacktest(user: User, id: string): Promise<BacktestResult | null> {
    try {
      const results = await this.backtestResultRepository.find({
        where: { id: Equal(id), userId: Equal(user.id) },
      });
      return results[0] || null;
    } catch (error) {
      this.logger.error(
        "BacktestService :: getBacktest error %o",
        CommonUtil.getError(error)
      );
      return null;
    }
  }
}
