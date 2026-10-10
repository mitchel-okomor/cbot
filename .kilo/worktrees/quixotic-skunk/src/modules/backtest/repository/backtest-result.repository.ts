import { Injectable, Logger } from "@nestjs/common";
import { AbstractCacheableRepository } from "../../../database";
import { DataSource } from "typeorm";
import { BacktestResult } from "../../../database/entities";
import { BacktestResultCache } from "../../../cache";

@Injectable()
export class BacktestResultRepository extends AbstractCacheableRepository<BacktestResult> {
  protected readonly logger = new Logger(BacktestResultRepository.name);

  constructor(
    protected dataSource: DataSource,
    private readonly backtestResultCache: BacktestResultCache
  ) {
    super(dataSource, BacktestResult, backtestResultCache);
  }
}
