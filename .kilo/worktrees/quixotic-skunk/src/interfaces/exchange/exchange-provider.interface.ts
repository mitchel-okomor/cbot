export interface IExchangeProvider {
  // Core trading
  getPrice(symbol: string): Promise<number>;
  get24hStats(symbol: string): Promise<{
    priceChange: number;
    volume: number;
    high: number;
    low: number;
  }>;
  placeOrder(params: {
    symbol: string;
    side: "BUY" | "SELL";
    type: "MARKET" | "LIMIT";
    quantity: number;
    price?: number;
  }): Promise<{
    orderId: string;
    executedQty: number;
    price: number;
    status: string;
  }>;

  // Account
  getBalance(asset?: string): Promise<{
    total: number;
    free: number;
    locked: number;
  }>;

  // Data
  getKlines(params: {
    symbol: string;
    interval: string;
    limit: number;
  }): Promise<any[]>;
  getOrderBook(symbol: string, limit: number): Promise<any>;
  getTopLosers(params: {
    minVolume: number;
    maxVolume: number;
    dropThreshold: number;
    limit: number;
  }): Promise<any[]>;

  // WebSocket
  subscribePrice(symbol: string, callback: (price: number) => void): void;
  unsubscribePrice(symbol: string): void;

  // Account
  validateApiKey(apiKey: string, secret: string): Promise<boolean>;
}
