import * as ccxt from "ccxt";
import { AbstractExchangeProvider } from "../abstract-exchange.provider";

export class BybitProvider extends AbstractExchangeProvider {
  private exchange: any;
  private priceSubscriptions: Map<string, any> = new Map();

  constructor(apiKey: string, apiSecret: string, apiPassphrase?: string) {
    super(apiKey, apiSecret);
    this.exchange = new ccxt.bybit({
      apiKey: apiKey,
      secret: apiSecret,
      password: apiPassphrase,
      options: {
        defaultType: "spot",
      },
    });
  }

  async getPrice(symbol: string): Promise<number> {
    try {
      const ticker = await this.exchange.fetchTicker(symbol);
      return ticker.last;
    } catch (error:any) {
      this.logger.error(`Bybit getPrice error: ${error.message}`);
      throw error;
    }
  }

  async get24hStats(symbol: string): Promise<any> {
    try {
      const ticker = await this.exchange.fetchTicker(symbol);
      return {
        priceChange: ticker.percentage,
        volume: ticker.quoteVolume,
        high: ticker.high,
        low: ticker.low,
        lastPrice: ticker.last,
      };
    } catch (error:any) {
      this.logger.error(`Bybit get24hStats error: ${error.message}`);
      throw error;
    }
  }

  async placeOrder(params: any): Promise<any> {
    try {
      const order = await this.exchange.createOrder(
        params.symbol,
        params.type.toLowerCase(),
        params.side.toLowerCase(),
        params.quantity,
        params.price,
      );
      return {
        orderId: order.id,
        executedQty: order.filled,
        price: order.price,
        status: order.status,
      };
    } catch (error:any) {
      this.logger.error(`Bybit placeOrder error: ${error.message}`);
      throw error;
    }
  }

  async getBalance(asset?: string): Promise<any> {
    try {
      const balance = await this.exchange.fetchBalance();
      if (asset) {
        return {
          total: balance.total[asset] || 0,
          free: balance.free[asset] || 0,
          locked: balance.used[asset] || 0,
        };
      }
      return Object.keys(balance.total).reduce((acc, key) => {
        if (balance.total[key] > 0) {
          acc[key] = {
            total: balance.total[key],
            free: balance.free[key],
            locked: balance.used[key],
          };
        }
        return acc;
      }, {});
    } catch (error:any) {
      this.logger.error(`Bybit getBalance error: ${error.message}`);
      throw error;
    }
  }

  async getKlines(params: any): Promise<any[]> {
    try {
      const klines = await this.exchange.fetchOHLCV(
        params.symbol,
        params.interval || "15m",
        undefined,
        params.limit || 100,
      );
      return klines.map((k) => ({
        open: k[1],
        high: k[2],
        low: k[3],
        close: k[4],
        volume: k[5],
        timestamp: new Date(k[0]),
      }));
    } catch (error:any) {
      this.logger.error(`Bybit getKlines error: ${error.message}`);
      throw error;
    }
  }

  async getOrderBook(symbol: string, limit: number): Promise<any> {
    try {
      const book = await this.exchange.fetchOrderBook(symbol, limit);
      return {
        bids: book.bids,
        asks: book.asks,
      };
    } catch (error:any) {
      this.logger.error(`Bybit getOrderBook error: ${error.message}`);
      throw error;
    }
  }

  async getTopLosers(params: any): Promise<any[]> {
    // Bybit implementation
    // Similar to Binance but with different API calls
    throw new Error("Method not implemented.");
  }

  subscribePrice(symbol: string, callback: (price: number) => void): void {
    // Implement WebSocket subscription for Bybit
    // Using ccxt's WebSocket or custom implementation
    throw new Error("Method not implemented.");
  }

  unsubscribePrice(symbol: string): void {
    throw new Error("Method not implemented.");
  }

  async validateApiKey(apiKey: string, secret: string): Promise<boolean> {
    try {
      const tempExchange = new ccxt.bybit({
        apiKey: apiKey,
        secret: secret,
      });
      await tempExchange.fetchBalance();
      return true;
    } catch {
      return false;
    }
  }
}
