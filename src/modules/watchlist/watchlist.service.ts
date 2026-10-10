import { Injectable, Logger } from "@nestjs/common";
import { WatchlistRepository } from "./repository/watchlist.repository";
import { Watchlist } from "../../database/entities";
import { CommonUtil } from "src/utils";
import { Equal, In } from "typeorm";
import { User } from "src/database/entities";

@Injectable()
export class WatchlistService {
  private readonly logger = new Logger(WatchlistService.name);

  constructor(private readonly watchlistRepository: WatchlistRepository) {}

  async getWatchlist(user: User, query?: { isActive?: boolean; symbol?: string }): Promise<Watchlist[]> {
    try {
      const where: any = { userId: Equal(user.id) };
      if (query?.isActive !== undefined) {
        where.isActive = Equal(query.isActive);
      }
      if (query?.symbol) {
        where.symbol = Equal(query.symbol.toUpperCase());
      }
      return await this.watchlistRepository.find({ where, order: { createdAt: "DESC" } });
    } catch (error) {
      this.logger.error(
        "WatchlistService :: getWatchlist error %o",
        CommonUtil.getError(error)
      );
      return [];
    }
  }

  async addToWatchlist(user: User, payload: { symbol: string; entryPrice?: number; dropThreshold?: number; notes?: string }): Promise<Watchlist> {
    try {
      const existing = await this.watchlistRepository.findOne(
        { userId: Equal(user.id), symbol: Equal(payload.symbol.toUpperCase()) } as any
      );

      if (existing) {
        throw new Error(`Symbol ${payload.symbol} already in watchlist`);
      }

      const watchlist = this.watchlistRepository.create({
        userId: user.id,
        symbol: payload.symbol.toUpperCase(),
        entryPrice: payload.entryPrice,
        dropThreshold: payload.dropThreshold,
        notes: payload.notes,
        isActive: true,
      });

      return await this.watchlistRepository.save(watchlist);
    } catch (error) {
      this.logger.error(
        "WatchlistService :: addToWatchlist error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async removeFromWatchlist(user: User, symbol: string): Promise<void> {
    try {
      await this.watchlistRepository.delete({ userId: Equal(user.id), symbol: Equal(symbol.toUpperCase()) });
    } catch (error) {
      this.logger.error(
        "WatchlistService :: removeFromWatchlist error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async toggleActive(user: User, symbol: string, isActive: boolean): Promise<Watchlist> {
    try {
      await this.watchlistRepository.update(
        { userId: Equal(user.id), symbol: Equal(symbol.toUpperCase()) },
        { isActive }
      );
      return this.watchlistRepository.findOne(
        { userId: Equal(user.id), symbol: Equal(symbol.toUpperCase()) } as any
      );
    } catch (error) {
      this.logger.error(
        "WatchlistService :: toggleActive error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }
}
