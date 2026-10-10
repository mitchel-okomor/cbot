import { Injectable, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TransactionCache } from "src/cache/services/transaction.cache";
import { AbstractCacheableRepository } from "src/database";
import { Transaction } from "src/database/entities";

@Injectable()
export class TransactionRepository extends AbstractCacheableRepository<Transaction> {
  protected readonly logger = new Logger(TransactionRepository.name);

  constructor(
    protected dataSource: DataSource,
    private readonly transactionCache: TransactionCache
  ) {
    super(dataSource, Transaction, transactionCache);
  }
}
