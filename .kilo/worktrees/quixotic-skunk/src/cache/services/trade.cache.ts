import { Injectable } from "@nestjs/common";
import { Trade } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class TradeCache extends AbstractModelCache<Trade> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, Trade);
  }
}
