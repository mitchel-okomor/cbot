import { Injectable, Logger } from "@nestjs/common";
import { ExchangeApiKey } from "src/database/entities";
import { EXCHANGE_PROVIDER } from "src/enums";
import { IExchangeProvider } from "src/interfaces/exchange/exchange-provider.interface";
import { BinanceProvider } from "../providers/trade/binance.provider";
import { BybitProvider } from "../providers/trade/bybit.provider";

@Injectable()
export class ExchangeFactory {
  private readonly logger = new Logger(ExchangeFactory.name);
  private providers: Map<string, IExchangeProvider> = new Map();

  createProvider(
    provider: EXCHANGE_PROVIDER,
    apiKey: string,
    apiSecret: string,
    apiPassphrase?: string,
  ): IExchangeProvider {
    const key = `${provider}-${apiKey}`;

    if (this.providers.has(key)) {
      return this.providers.get(key);
    }

    let exchangeProvider: IExchangeProvider;

    switch (provider) {
      case EXCHANGE_PROVIDER.BINANCE:
        exchangeProvider = new BinanceProvider(apiKey, apiSecret);
        break;
      case EXCHANGE_PROVIDER.BYBIT:
        exchangeProvider = new BybitProvider(apiKey, apiSecret, apiPassphrase);
        break;
      default:
        throw new Error(`Unsupported exchange provider: ${provider}`);
    }

    this.providers.set(key, exchangeProvider);
    return exchangeProvider;
  }

  createProviderFromApiKey(apiKey: ExchangeApiKey): IExchangeProvider {
    return this.createProvider(
      apiKey.provider,
      apiKey.apiKey,
      apiKey.apiSecret,
      apiKey.apiPassphrase,
    );
  }

  async validateCredentials(
    provider: EXCHANGE_PROVIDER,
    apiKey: string,
    apiSecret: string,
    apiPassphrase?: string,
  ): Promise<boolean> {
    try {
      const providerInstance = this.createProvider(
        provider,
        apiKey,
        apiSecret,
        apiPassphrase,
      );
      return await providerInstance.validateApiKey(apiKey, apiSecret);
    } catch (error: any) {
      this.logger.error(`Validation error: ${error.message}`);
      return false;
    }
  }

  clearProvider(key: string): void {
    this.providers.delete(key);
  }

  clearAllProviders(): void {
    this.providers.clear();
  }
}
