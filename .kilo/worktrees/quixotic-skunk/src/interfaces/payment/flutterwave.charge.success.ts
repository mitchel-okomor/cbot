export interface FlutterwaveChargeWebhookResponse {
  id: number;
  txRef: string;
  flwRef: string;
  orderRef: string;
  paymentPlan: string | null;
  paymentPage: string | null;
  createdAt: string;
  amount: number;
  charged_amount: number;
  status: "successful" | "failed" | "pending";
  IP: string;
  currency: string;
  appFee: number;
  merchantFee: number;
  merchantBaseFee: number;
  charge_type: string;
  customer: {
    id: number;
    phone: string;
    fullName: string;
    customerToken: string | null;
    email: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  accountId: number;
  entity: {
    account_number: string;
    first_name: string;
    last_name: string;
    createdAt: string;
  };
  "event.type"?: string; // This is the event field!
}
