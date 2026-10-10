import { Injectable } from "@nestjs/common";
import { BacktestResult } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class BacktestResultCache extends AbstractModelCache<BacktestResult> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, BacktestResult);
  }
}
