import { forwardRef, Module } from "@nestjs/common";
import { GenericProviderFactory } from "../factory/provider-factory";
import { PaymentProviderModule } from "../payment-provider/payment-provider.module";

@Module({
  imports: [forwardRef(() => PaymentProviderModule)],
  providers: [GenericProviderFactory, PaymentProviderModule],
  exports: [GenericProviderFactory],
})
export class FactoryModule {}
