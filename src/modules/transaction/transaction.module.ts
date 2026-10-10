import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionRepository } from "./repository/transaction.repository";
import { TransactionErrorLogRepository } from "./repository/transactionerrorlog.repository";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { FactoryModule } from "../factory/factory.module";
import {
  RedisService,
  TransactionCache,
  TransactionErrorLogCache,
} from "src/cache";
import { PaymentProviderModule } from "../payment-provider/payment-provider.module";
import { Transaction, TransactionErrorLog } from "src/database/entities";
import { DatabaseModule } from "src/database";

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    RedisService,
    TransactionCache,
    TransactionRepository,
    TransactionErrorLogRepository,
    TransactionCache,
    TransactionErrorLogCache,
  ],
  imports: [
    forwardRef(() => PaymentProviderModule),
    forwardRef(() => FactoryModule),
    DatabaseModule.forFeature([Transaction, TransactionErrorLog]),
  ],
  exports: [
    TransactionService,
    TransactionRepository,
    TransactionErrorLogRepository,
    TransactionCache,
    TransactionErrorLogCache,
  ],
})
export class TransactionModule {}
