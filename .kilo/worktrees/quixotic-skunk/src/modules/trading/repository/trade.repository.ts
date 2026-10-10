import { Injectable, Logger } from "@nestjs/common";
import { AbstractCacheableRepository } from "../../../database";
import { DataSource } from "typeorm";
import { Trade } from "../../../database/entities";
import { TradeCache } from "../../../cache";

@Injectable()
export class TradeRepository extends AbstractCacheableRepository<Trade> {
  protected readonly logger = new Logger(TradeRepository.name);

  constructor(
    protected dataSource: DataSource,
    private readonly tradeCache: TradeCache
  ) {
    super(dataSource, Trade, tradeCache);
  }
}
