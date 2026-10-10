import { Module } from "@nestjs/common";
import { TradingService } from "./trading.service";
import { TradeRepository } from "./repository/trade.repository";
import { TradeCache, RedisModule } from "../../cache";
import { DatabaseModule } from "../../database";
import { Trade } from "../../database/entities";
import { TradingController } from "./trading.controller";

@Module({
  controllers: [TradingController],
  providers: [TradingService, TradeRepository, TradeCache],
  imports: [DatabaseModule.forFeature([Trade]), RedisModule],
  exports: [TradingService, TradeRepository],
})
export class TradingModule {}
