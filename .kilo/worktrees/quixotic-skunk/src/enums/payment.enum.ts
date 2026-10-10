export enum PAYMENT_PROVIDER {
  PAYSTACK = "PAYSTACK",
  FLUTTERWAVE = "FLUTTERWAVE",
  STRIPE = "STRIPE",
}

export enum PAYMENT_STATUS {
  SUCCESS = "00",
  FAILED = "99",
  PENDING = "03",
  NOT_FOUND = "04",
  REVERSED = "91",
  REVERSAL_FAILED = "92",
  ERROR = "95",
  UNKNOWN = "96",
}

export enum REQUERY_STATUS {
  SUCCESS = "00",
  FAILED = "99",
  PENDING = "03",
  NOT_FOUND = "04",
  REVERSED = "91",
  REVERSAL_FAILED = "92",
  ERROR = "95",
  UNKNOWN = "96",
}

export enum PAYMENT_METHOD {
  PAYMENT_LINK = "PAYMENTLINK",
  TRANSFER = "TRANSFER",
}

export enum PAYMENT_CHANNEL {
  PAYMENT_LINK = "PAYMENTLINK",
  TRANSFER = "TRANSFER",
}

export enum PAYSTACK_WEBHOOK_EVENT {
  CHARGE_SUCCESS = "charge.success",
  TRANSFER_SUCCESS = "transfer.success",
  TRANSFER_REVERSED = "transfer.reversed",
  TRANSFER_FAILED = "transfer.failed",
  CUSTOMER_IDENTIFICATION_SUCCESS = "customeridentification.success",
  CUSTOMER_IDENTIFICATION_FAILED = "customeridentification.failed",
}

export enum FLUTTERWAVE_WEBHOOK_EVENT {
  TRANSFER_COMPLETED = "transfer.completed",
  CHARGE_COMPLETED = "charge.completed",
  BANK_TRANSFER_TRANSACTION = "BANK_TRANSFER_TRANSACTION",
}

export enum StripeWebhookEvent {
  INTENT_SUCCESSFUL = "payment_intent.succeeded",
  CHARGE_SUCCESSFUL = "charge.succeeded",
  CHARGE_FAILED = "charge.failed",
  CHECKOUT_SESSION_COMPLETED = "checkout.session.completed",
  PAYOUT_COMPLETED = "payout.paid",
}

export enum VIRTUAL_ACCOUNT_PROVIDER {
  CONSISTENT_TRUST = "CONSISTENT_TRUST",
  PROVIDUS = "PROVIDUS",
  WEMA = "WEMA",
  PRUNNY = "PRUNNY",
}
