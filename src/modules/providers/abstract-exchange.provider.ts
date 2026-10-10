import { Logger } from "@nestjs/common";
import { IExchangeProvider } from "src/interfaces/exchange/exchange-provider.interface";

export abstract class AbstractExchangeProvider implements IExchangeProvider {
  protected logger = new Logger(this.constructor.name);
  protected apiKey: string;
  protected apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  abstract getPrice(symbol: string): Promise<number>;
  abstract get24hStats(symbol: string): Promise<any>;
  abstract placeOrder(params: any): Promise<any>;
  abstract getBalance(asset?: string): Promise<any>;
  abstract getKlines(params: any): Promise<any[]>;
  abstract getOrderBook(symbol: string, limit: number): Promise<any>;
  abstract getTopLosers(params: any): Promise<any[]>;
  abstract subscribePrice(
    symbol: string,
    callback: (price: number) => void,
  ): void;
  abstract unsubscribePrice(symbol: string): void;
  abstract validateApiKey(apiKey: string, secret: string): Promise<boolean>;
}
