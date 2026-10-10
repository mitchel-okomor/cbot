import { Injectable } from "@nestjs/common";
import { Watchlist } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class WatchlistCache extends AbstractModelCache<Watchlist> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, Watchlist);
  }
}
