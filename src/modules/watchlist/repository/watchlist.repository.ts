import { Injectable, Logger } from "@nestjs/common";
import { AbstractCacheableRepository } from "../../../database";
import { DataSource } from "typeorm";
import { Watchlist } from "../../../database/entities";
import { WatchlistCache } from "../../../cache";

@Injectable()
export class WatchlistRepository extends AbstractCacheableRepository<Watchlist> {
  protected readonly logger = new Logger(WatchlistRepository.name);

  constructor(
    protected dataSource: DataSource,
    private readonly watchlistCache: WatchlistCache
  ) {
    super(dataSource, Watchlist, watchlistCache);
  }
}
