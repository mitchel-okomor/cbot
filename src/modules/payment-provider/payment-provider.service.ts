import { Injectable, Logger } from "@nestjs/common";
import { CommonUtil } from "src/utils";
import { GenericProviderFactory } from "../factory/provider-factory";
import { PAYMENT_PROVIDER, PAYMENT_STATUS } from "src/enums/payment.enum";
import { GeneratePaymentLinkDTO } from "./dto";

@Injectable()
export class PaymentProviderService {
  private readonly logger = new Logger(PaymentProviderService.name);

  constructor(private readonly genericProviderFactory: GenericProviderFactory) {}

  async getProviders(query?: { enabled?: boolean }): Promise<any[]> {
    try {
      // Return configured providers
      return [
        {
          provider: PAYMENT_PROVIDER.STRIPE,
          enabled: true,
          name: "Stripe",
          supportedCurrencies: ["USD", "EUR", "GBP", "NGN"],
        },
        {
          provider: PAYMENT_PROVIDER.FLUTTERWAVE,
          enabled: true,
          name: "Flutterwave",
          supportedCurrencies: ["NGN", "USD", "GHS", "KES"],
        },
        {
          provider: PAYMENT_PROVIDER.PAYSTACK,
          enabled: true,
          name: "Paystack",
          supportedCurrencies: ["NGN", "GHS", "ZAR", "KES"],
        },
      ].filter(p => query?.enabled === undefined || p.enabled === query.enabled);
    } catch (error) {
      this.logger.error(
        "PaymentProviderService :: getProviders error %o",
        CommonUtil.getError(error)
      );
      return [];
    }
  }

  async configureProvider(provider: PAYMENT_PROVIDER, config: { enabled?: boolean; secretKey?: string; publicKey?: string; webhookSecret?: string; config?: Record<string, any> }): Promise<any> {
    try {
      // In a real implementation, save to database
      this.logger.log(`Configured provider ${provider}`);
      return { provider, ...config, updatedAt: new Date() };
    } catch (error) {
      this.logger.error(
        "PaymentProviderService :: configureProvider error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async generatePaymentLink(payload: GeneratePaymentLinkDTO): Promise<any> {
    try {
      let processor;

      if (payload.currency === "NGN") {
        processor = this.genericProviderFactory.getPaymentLinkProvider({
          currency: payload.currency,
          provider: payload.provider || PAYMENT_PROVIDER.PAYSTACK,
        });
      } else {
        processor = this.genericProviderFactory.getPaymentLinkProvider({
          currency: payload.currency,
          provider: payload.provider || PAYMENT_PROVIDER.STRIPE,
        });
      }

      const response = await processor.generatePaymentLink(payload);
      return response;
    } catch (error) {
      this.logger.error(
        "PaymentProviderService :: generatePaymentLink error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async verifyPayment(provider: PAYMENT_PROVIDER, reference: string): Promise<any> {
    try {
      const processor = this.genericProviderFactory.getPaymentLinkProvider({
        currency: "USD",
        provider,
      });

      const response = await processor.requeryPaymentLinkTransaction(reference);
      return response;
    } catch (error) {
      this.logger.error(
        "PaymentProviderService :: verifyPayment error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }
}
