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
}
