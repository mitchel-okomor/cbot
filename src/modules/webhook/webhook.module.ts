import { forwardRef, Module } from "@nestjs/common";
import { TransactionRepository } from "../transaction/repository/transaction.repository";
import { TransactionErrorLogRepository } from "../transaction/repository/transactionerrorlog.repository";
import { StripeWebhookService } from "./services/stripe.webhook.service";
import { WebhookController } from "./webhook.controller";
import { WebhookService } from "./webhook.service";
import { PaymentProviderModule } from "../payment-provider/payment-provider.module";
import { TransactionModule } from "../transaction/transaction.module";
import { TransactionCache, TransactionErrorLogCache } from "src/cache";

@Module({
  controllers: [WebhookController],
  providers: [
    TransactionCache,
    TransactionRepository,
    TransactionErrorLogRepository,
    TransactionErrorLogCache,
    WebhookService,
    StripeWebhookService,
  ],
  imports: [forwardRef(() => PaymentProviderModule), TransactionModule],
  exports: [WebhookService, StripeWebhookService],
})
export class WebhookModule {}
