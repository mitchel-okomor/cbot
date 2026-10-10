import Binance from "node-binance-api";
import { AbstractExchangeProvider } from "../abstract-exchange.provider";

export class BinanceProvider extends AbstractExchangeProvider {
  private binance: any;
  private priceSubscriptions: Map<string, any> = new Map();

  constructor(apiKey: string, apiSecret: string) {
    super(apiKey, apiSecret);
    this.binance = new Binance().options({
      APIKEY: apiKey,
      APISECRET: apiSecret,
    });
  }

  async getPrice(symbol: string): Promise<number> {
    try {
      const ticker = await this.binance.prices(symbol);
      return parseFloat(ticker[symbol]);
    } catch (error: any) {
      this.logger.error(`Binance getPrice error: ${error.message}`);
      throw error;
    }
  }

  async get24hStats(symbol: string): Promise<any> {
    try {
      const stats = await this.binance.daily(symbol);
      return {
        priceChange: parseFloat(stats[symbol].priceChangePercent),
        volume: parseFloat(stats[symbol].volume),
        high: parseFloat(stats[symbol].highPrice),
        low: parseFloat(stats[symbol].lowPrice),
        lastPrice: parseFloat(stats[symbol].lastPrice),
      };
    } catch (error: any) {
      this.logger.error(`Binance get24hStats error: ${error.message}`);
      throw error;
    }
  }

  async placeOrder(params: any): Promise<any> {
    try {
      const order = await this.binance.order(
        params.side,
        params.symbol,
        params.quantity,
        params.price || 0,
        {
          type: params.type,
        },
      );
      return {
        orderId: order.orderId,
        executedQty: parseFloat(order.executedQty),
        price: parseFloat(order.price),
        status: order.status,
      };
    } catch (error: any) {
      this.logger.error(`Binance placeOrder error: ${error.message}`);
      throw error;
    }
  }

  async getBalance(asset?: string): Promise<any> {
    try {
      const balances = await this.binance.balance();
      if (asset) {
        return {
          total: parseFloat(balances[asset].total),
          free: parseFloat(balances[asset].available),
          locked: parseFloat(balances[asset].onOrder),
        };
      }
      return Object.keys(balances).reduce((acc, key) => {
        if (parseFloat(balances[key].total) > 0) {
          acc[key] = {
            total: parseFloat(balances[key].total),
            free: parseFloat(balances[key].available),
            locked: parseFloat(balances[key].onOrder),
          };
        }
        return acc;
      }, {});
    } catch (error: any) {
      this.logger.error(`Binance getBalance error: ${error.message}`);
      throw error;
    }
  }

  async getKlines(params: any): Promise<any[]> {
    try {
      const klines = await this.binance.candlesticks(
        params.symbol,
        params.interval || "15m",
        params.limit || 100,
      );
      return klines.map((k) => ({
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5]),
        timestamp: new Date(k[0]),
      }));
    } catch (error: any) {
      this.logger.error(`Binance getKlines error: ${error.message}`);
      throw error;
    }
  }

  async getOrderBook(symbol: string, limit: number): Promise<any> {
    try {
      const book = await this.binance.book(symbol, limit);
      return {
        bids: book.bids.map((b: any) => [parseFloat(b[0]), parseFloat(b[1])]),
        asks: book.asks.map((a: any) => [parseFloat(a[0]), parseFloat(a[1])]),
      };
    } catch (error: any) {
      this.logger.error(`Binance getOrderBook error: ${error.message}`);
      throw error;
    }
  }

  async getTopLosers(params: {
    minVolume: number;
    maxVolume: number;
    dropThreshold: number;
    limit: number;
  }): Promise<any[]> {
    try {
      const ticker = await this.binance.daily();
      const usdtPairs = Object.keys(ticker)
        .filter((s) => s.endsWith("USDT"))
        .map((s) => ({
          symbol: s,
          volume: parseFloat(ticker[s].volume),
          change: parseFloat(ticker[s].priceChangePercent),
          lastPrice: parseFloat(ticker[s].lastPrice),
          lowPrice: parseFloat(ticker[s].lowPrice),
          highPrice: parseFloat(ticker[s].highPrice),
        }))
        .filter(
          (p) =>
            p.volume >= params.minVolume &&
            p.volume <= params.maxVolume &&
            p.change <= -params.dropThreshold,
        )
        .sort((a, b) => a.change - b.change)
        .slice(0, params.limit || 20);

      return usdtPairs;
    } catch (error: any) {
      this.logger.error(`Binance getTopLosers error: ${error.message}`);
      throw error;
    }
  }

  subscribePrice(symbol: string, callback: (price: number) => void): void {
    if (this.priceSubscriptions.has(symbol)) {
      return;
    }

    const ws = this.binance.websockets;
    const subscription = ws.depth(symbol, (depth: any) => {
      const price = parseFloat(depth.bids[0][0]);
      callback(price);
    });

    this.priceSubscriptions.set(symbol, subscription);
    this.logger.log(`Subscribed to ${symbol} price updates`);
  }

  unsubscribePrice(symbol: string): void {
    const subscription = this.priceSubscriptions.get(symbol);
    if (subscription) {
      subscription();
      this.priceSubscriptions.delete(symbol);
      this.logger.log(`Unsubscribed from ${symbol} price updates`);
    }
  }

  async validateApiKey(apiKey: string, secret: string): Promise<boolean> {
    try {
      const tempBinance = new Binance().options({
        APIKEY: apiKey,
        APISECRET: secret,
      });
      await tempBinance.prices("BTCUSDT");
      return true;
    } catch {
      return false;
    }
  }
}
