import { ResponseModel } from "src/models/response-model";

export interface ICurrencyProvider {
  fetchExchangeRate(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<ResponseModel<any>>;

  convertAmount(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<
    ResponseModel<{
      convertedAmount: number;
      rate: number;
      fromCurrency: string;
      toCurrency: string;
    }>
  >;

  getCachedRate(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<number | null>;

  fetchMultipleRates(
    amount: number,
    fromCurrency?: string,
    toCurrencies?: string[],
  ): Promise<ResponseModel<Record<string, number>>>;

  clearRateCache(): void;

  getRate(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<number | null>;
}
