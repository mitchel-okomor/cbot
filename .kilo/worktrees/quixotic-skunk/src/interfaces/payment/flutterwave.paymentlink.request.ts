/**
 * https://developer.flutterwave.com/docs/collecting-payments/standard/
 */
export default interface FlutterwavePaymentLinkPayload {
  tx_ref: string;
  amount: number;

  currency: string;
  redirect_url: string;
  customer: {
    email: string;
    name?: string;
    phonenumber?: string;
  };

  meta?: Record<string, any>;
  customizations?: {
    title?: string;
    logo?: string;
    description?: string;
  };
  payment_options?: number;
  subaccounts?: SubaccountProps[];
}

export interface SubaccountProps {
  id: string;
}

export interface IFlutterwaveExchangeRateResponse {
  status: string;
  message: string;
  data: {
    rate: number;
    from_currency: string;
    to_currency: string;
    timestamp: string;
  };
}

export interface IFlutterwaveRateConversionRequest {
  from_currency: string; // NGN
  to_currency: string; // USD, EUR, GBP, etc.
  amount?: number; // Optional: if you want to convert specific amount
}
