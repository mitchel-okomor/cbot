import { forwardRef, Global, Module } from "@nestjs/common";
import { TransactionRepository } from "../transaction/repository/transaction.repository";
import { TransactionErrorLogRepository } from "../transaction/repository/transactionerrorlog.repository";
import { TransactionModule } from "../transaction/transaction.module";
import { WebhookModule } from "../webhook/webhook.module";
import { PaymentProviderController } from "./payment-provider.controller";
import { PaymentProviderService } from "./payment-provider.service";
import StripeProvider from "./providers/stripe.provider";

@Global()
@Module({
  controllers: [PaymentProviderController],
  providers: [
    PaymentProviderService,
    StripeProvider,
    TransactionRepository,
    TransactionErrorLogRepository,
  ],
  imports: [WebhookModule, forwardRef(() => TransactionModule)],
  exports: [PaymentProviderService, StripeProvider],
})
export class PaymentProviderModule {}
