import { Module } from "@nestjs/common";
import { ExchangeService } from "./exchange.service";
import { ExchangeApiKeyRepository } from "./repository/exchange-api-key.repository";
import { ExchangeController } from "./exchange.controller";
import { ExchangeApiKeyCache, RedisModule } from "../../cache";
import { DatabaseModule } from "../../database";
import { ExchangeApiKey } from "../../database/entities";

@Module({
  controllers: [ExchangeController],
  providers: [
    ExchangeService,
    ExchangeApiKeyRepository,
    ExchangeApiKeyCache,
  ],
  imports: [DatabaseModule.forFeature([ExchangeApiKey]), RedisModule],
  exports: [ExchangeService, ExchangeApiKeyRepository],
})
export class ExchangeModule {}
