import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { IPushNotificationProvider } from "../../interfaces/notification/push/IPushProvider.interface";
import { AbstractProvider } from "../providers/abstract.provider";
import { IStorageProvider } from "../../interfaces/storage/common";
import { PROVIDERS, SERVICE_GROUP } from "src/enums";
import { S3Provider } from "../providers/storage/s3.provider";
import { NodeMailerProvider } from "../providers/notification/nodemailer.provider";
import { IEmailProvider } from "src/interfaces/notification/email/IEmailProvider.interface";
import { OneSignalProvider } from "../providers/notification/onesignal.provider";
import { PAYMENT_PROVIDER } from "src/enums/payment.enum";
import IPaymentLinkProvider from "src/interfaces/payment/IPaymentLinkProvider";
import StripeProvider from "../payment-provider/providers/stripe.provider";

@Injectable()
export class GenericProviderFactory {
  private readonly logger = new Logger(GenericProviderFactory.name);

  static dataMap: Map<string, AbstractProvider>;
  static serviceProviderMap: Map<string, PROVIDERS>;

  // Default currency provider - can be configured via environment
  private readonly DEFAULT_CURRENCY_PROVIDER =
    process.env.DEFAULT_CURRENCY_PROVIDER || PAYMENT_PROVIDER.FLUTTERWAVE;

  constructor(private readonly stripe: StripeProvider) {
    this.initializeProviderMap();
    this.initializeServiceProviderMap();
  }

  initializeProviderMap(): void {
    if (!GenericProviderFactory.dataMap) {
      GenericProviderFactory.dataMap = new Map<string, AbstractProvider>();
    }
  }

  initializeServiceProviderMap(): void {
    if (!GenericProviderFactory.serviceProviderMap) {
      GenericProviderFactory.serviceProviderMap = new Map<string, PROVIDERS>();

      GenericProviderFactory.serviceProviderMap.set(
        SERVICE_GROUP.PUSH_NOTIFICATION,
        PROVIDERS.ONE_SIGNAL,
      );

      GenericProviderFactory.serviceProviderMap.set(
        SERVICE_GROUP.STORAGE,
        PROVIDERS.AWS,
      );

      GenericProviderFactory.serviceProviderMap.set(
        SERVICE_GROUP.EMAIL,
        PROVIDERS.NODEMAILER,
      );
    }
  }

  resolveProviderByName<T>(providerName: string): T {
    return GenericProviderFactory.dataMap.get(providerName) as T;
  }

  resolveStorageProvider(): IStorageProvider {
    return new S3Provider();
  }

  resolveEmailProvider(): IEmailProvider {
    return new NodeMailerProvider();
  }

  resolvePushNotificationProvider(): IPushNotificationProvider {
    return new OneSignalProvider();
  }

  resolveProvider<T>(serviceName: SERVICE_GROUP): T {
    const providerName =
      GenericProviderFactory.serviceProviderMap.get(serviceName);

    if (!providerName) {
      throw new HttpException(
        `No provider mapped to service ${serviceName}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const provider = GenericProviderFactory.dataMap.get(providerName);
    return provider.instantiateProvider() as T;
  }

  resolvePaymentLinkProviderByName(providerName: string): IPaymentLinkProvider {
    let provider: IPaymentLinkProvider;

    switch (providerName?.toUpperCase()) {
      case PAYMENT_PROVIDER.STRIPE:
        provider = this.stripe;
        break;

      default:
        throw new Error("Invalid provider");
        break;
    }

    if (!provider) {
      throw new Error("Unable to instantiate processor!");
    }

    return provider;
  }

  getPaymentLinkProvider(data: {
    currency?: string;
    provider?: string;
  }): IPaymentLinkProvider {
    this.logger.log(
      "getPaymentLinkProvider :: getting payment provider for configuration",
      data,
    );

    let provider: IPaymentLinkProvider;

    if (data.provider) {
      return this.resolvePaymentLinkProviderByName(data.provider);
    }

    //Todo - get provider by currency[country] and product[payment_link] from the productprovider table
    switch (data.currency?.toUpperCase()) {
      case "USD":
      case "EUR":
      case "GBP":
      case "CAD":
        provider = this.stripe;
        break;

      case "NGN":
        // provider = this.flutterwave;
        provider = this.stripe;
        break;

      default:
        throw new HttpException(
          "Unable to process request. No provision provider!",
          HttpStatus.BAD_REQUEST,
        );
    }

    if (!provider) {
      throw new Error("unable to resolve provider!");
    }

    return provider;
  }
}
