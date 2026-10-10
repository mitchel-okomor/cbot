import { Injectable, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AbstractCacheableRepository } from "src/database";
import { TransactionErrorLogCache } from "src/cache/services/transaction-error-log.cache";
import { TransactionErrorLog } from "src/database/entities";

@Injectable()
export class TransactionErrorLogRepository extends AbstractCacheableRepository<TransactionErrorLog> {
  protected readonly logger = new Logger(TransactionErrorLogRepository.name);

  constructor(
    protected dataSource: DataSource,
    private readonly transactionErrorLogCache: TransactionErrorLogCache
  ) {
    super(dataSource, TransactionErrorLog, transactionErrorLogCache);
  }
}
