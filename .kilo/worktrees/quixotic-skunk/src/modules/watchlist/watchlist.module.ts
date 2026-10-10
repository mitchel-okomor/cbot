import { Module } from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { WatchlistRepository } from "./repository/watchlist.repository";
import { WatchlistController } from "./watchlist.controller";
import { WatchlistCache, RedisModule } from "../../cache";
import { DatabaseModule } from "../../database";
import { Watchlist } from "../../database/entities";

@Module({
  controllers: [WatchlistController],
  providers: [
    WatchlistService,
    WatchlistRepository,
    WatchlistCache,
  ],
  imports: [DatabaseModule.forFeature([Watchlist]), RedisModule],
  exports: [WatchlistService, WatchlistRepository],
})
export class WatchlistModule {}
