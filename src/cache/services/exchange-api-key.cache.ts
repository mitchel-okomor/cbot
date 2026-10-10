import { Injectable } from "@nestjs/common";
import { ExchangeApiKey } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class ExchangeApiKeyCache extends AbstractModelCache<ExchangeApiKey> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, ExchangeApiKey);
  }
}
