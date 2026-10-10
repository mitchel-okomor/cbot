import { Module } from "@nestjs/common";
import { BacktestService } from "./backtest.service";
import { BacktestResultRepository } from "./repository/backtest-result.repository";
import { BacktestController } from "./backtest.controller";
import { BacktestResultCache, RedisModule } from "../../cache";
import { DatabaseModule } from "../../database";
import { BacktestResult } from "../../database/entities";

@Module({
  controllers: [BacktestController],
  providers: [
    BacktestService,
    BacktestResultRepository,
    BacktestResultCache,
  ],
  imports: [DatabaseModule.forFeature([BacktestResult]), RedisModule],
  exports: [BacktestService, BacktestResultRepository],
})
export class BacktestModule {}
