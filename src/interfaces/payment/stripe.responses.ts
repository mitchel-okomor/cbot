export interface StripeCreateAccountResponse {
  id: string;
  object: string;
  business_profile: BusinessProfile;
  business_type: any;
  capabilities: Capabilities;
  charges_enabled: boolean;
  controller: Controller;
  country: string;
  created: number;
  default_currency: string;
  details_submitted: boolean;
  email: string;
  external_accounts: ExternalAccounts;
  future_requirements: Requirements;
  metadata: Metadata;
  payouts_enabled: boolean;
  requirements: Requirements;
  settings: Settings;
  tos_acceptance: StripeCreateAccountResponseTosAcceptance;
  type: string;
}

export interface BusinessProfile {
  mcc: any;
  name: string;
  product_description: any;
  support_address: any;
  support_email: any;
  support_phone: any;
  support_url: any;
  url: any;
}

export interface Capabilities {
  card_payments: TransfersClass;
  transfers: TransfersClass;
}

export interface TransfersClass {
  requested: boolean;
}

export interface Controller {
  type: string;
}

export interface ExternalAccounts {
  object: string;
  data: any[];
  has_more: boolean;
  url: string;
}

export interface Requirements {
  alternatives: any[];
  current_deadline: any;
  currently_due: string[];
  disabled_reason: any | string;
  errors: any[];
  eventually_due: string[];
  past_due: string[];
  pending_verification: any[];
}

export interface Metadata {}

export interface Settings {
  bacs_debit_payments: Metadata;
  branding: Branding;
  card_issuing: CardIssuing;
  card_payments: SettingsCardPayments;
  dashboard: Dashboard;
  payments: Payments;
  payouts: Payouts;
  sepa_debit_payments: Metadata;
}

export interface Branding {
  icon: any;
  logo: any;
  primary_color: any;
  secondary_color: any;
}

export interface CardIssuing {
  tos_acceptance: CardIssuingTosAcceptance;
}

export interface CardIssuingTosAcceptance {
  date: any;
  ip: any;
}

export interface SettingsCardPayments {
  decline_on: DeclineOn;
  statement_descriptor_prefix: any;
  statement_descriptor_prefix_kanji: any;
  statement_descriptor_prefix_kana: any;
}

export interface DeclineOn {
  avs_failure: boolean;
  cvc_failure: boolean;
}

export interface Dashboard {
  display_name: string;
  timezone: string;
}

export interface Payments {
  statement_descriptor: any;
  statement_descriptor_kana: any;
  statement_descriptor_kanji: any;
}

export interface Payouts {
  debit_negative_balances: boolean;
  schedule: Schedule;
  statement_descriptor: any;
}

export interface Schedule {
  delay_days: number;
  interval: string;
}

export interface StripeCreateAccountResponseTosAcceptance {
  date: any;
  ip: any;
  user_agent: any;
}

export interface StripeInitiateTransferResponse {
  id: string;
  object: string;
  amount: number;
  amount_reversed: number;
  balance_transaction: string;
  created: number;
  currency: string;
  description: any;
  destination: string;
  destination_payment: string;
  livemode: boolean;
  metadata: Metadata;
  reversals: Reversals;
  reversed: boolean;
  source_transaction: string;
  source_type: string;
  transfer_group: string;
}

export interface Reversals {
  object: string;
  data: any[];
  has_more: boolean;
  url: string;
}

export interface StripeRetrieveAccountResponse {
  id: string;
  object: string;
  business_profile: BusinessProfile;
  business_type: any;
  capabilities: Capabilities;
  charges_enabled: boolean;
  controller: Controller;
  country: string;
  created: number;
  default_currency: string;
  details_submitted: boolean;
  email: string;
  external_accounts: ExternalAccounts;
  future_requirements: Requirements;
  metadata: Metadata;
  payouts_enabled: boolean;
  requirements: Requirements;
  settings: Settings;
  tos_acceptance: StripeRetrieveAccountResponseTosAcceptance;
  type: string;
}

export interface BusinessProfile {
  mcc: any;
  name: string;
  product_description: any;
  support_address: any;
  support_email: any;
  support_phone: any;
  support_url: any;
  url: any;
}

export interface Controller {
  type: string;
}

export interface ExternalAccounts {
  object: string;
  data: any[];
  has_more: boolean;
  url: string;
}

export interface Requirements {
  alternatives: any[];
  current_deadline: any;
  currently_due: string[];
  disabled_reason: any | string;
  errors: any[];
  eventually_due: string[];
  past_due: string[];
  pending_verification: any[];
}

export interface Settings {
  bacs_debit_payments: Metadata;
  branding: Branding;
  card_issuing: CardIssuing;
  card_payments: CardPayments;
  dashboard: Dashboard;
  payments: Payments;
  payouts: Payouts;
  sepa_debit_payments: Metadata;
}

export interface Branding {
  icon: any;
  logo: any;
  primary_color: any;
  secondary_color: any;
}

export interface CardIssuing {
  tos_acceptance: CardIssuingTosAcceptance;
}

export interface CardIssuingTosAcceptance {
  date: any;
  ip: any;
}

export interface CardPayments {
  decline_on: DeclineOn;
  statement_descriptor_prefix: any;
  statement_descriptor_prefix_kanji: any;
  statement_descriptor_prefix_kana: any;
}

export interface DeclineOn {
  avs_failure: boolean;
  cvc_failure: boolean;
}

export interface Dashboard {
  display_name: string;
  timezone: string;
}

export interface Payments {
  statement_descriptor: any;
  statement_descriptor_kana: any;
  statement_descriptor_kanji: any;
}

export interface Payouts {
  debit_negative_balances: boolean;
  schedule: Schedule;
  statement_descriptor: any;
}

export interface Schedule {
  delay_days: number;
  interval: string;
}

export interface StripeRetrieveAccountResponseTosAcceptance {
  date: any;
  ip: any;
  user_agent: any;
}

export interface StripePaymentIntent {
  amount: number;
  currency: string;
  //payment_method_types: Array<string>;
  statement_descriptor?: string;
  metadata: {
    paymentRef: string;
    identifier: string;
  };
  automatic_payment_methods: { enabled: boolean };
}
export interface StripePaymentSession {
  line_items: Array<StripeItemList>;
  mode: Mode;
  success_url: string;
  cancel_url: string;

  //payment_method_types: Array<string>;
  // statement_descriptor?: string;
  metadata: {
    paymentRef: string;
    identifier: string;
  };
  // automatic_payment_methods: { enabled: boolean };
}

type StripeMetadata = {
  paymentRef: string;
  identifier: string;
  phone_number: string;
};

type StripeItemList = {
  price_data: PriceData;
  quantity: number;
};

type PriceData = {
  currency: string;
  product_data: ProductData;
  unit_amount: number;
};

type ProductData = {
  name: string;
};

export enum PaymentMode {
  PAYMENT = 'payment',
  SETUP = 'setup',
  SUBSCRIPTION = 'subscription'
}

export interface StripeGenerateAccountLinkesponse {
  object: string;
  created: number;
  expires_at: number;
  url: string;
}

export interface GenerateStripePaymentLinkResponse {
  id: string;
  object: string;
  after_expiration: any;
  allow_promotion_codes: any;
  amount_subtotal: any;
  amount_total: any;
  automatic_tax: {
    enabled: boolean;
    status: any;
  };
  billing_address_collection: any;
  cancel_url: string;
  client_reference_id: any;
  consent: any;
  consent_collection: any;
  created: number;
  currency: any;
  customer: any;
  customer_creation: any;
  customer_details: any;
  customer_email: any;
  expires_at: number;
  livemode: boolean;
  locale: any;
  metadata: any;
  mode: string;
  payment_intent: string;
  payment_link: any;
  payment_method_collection: any;
  payment_method_options: any;
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: {
    enabled: boolean;
  };
  recovered_from: any;
  redaction: any;
  setup_intent: any;
  shipping_address_collection: any;
  shipping_cost: any;
  shipping_details: any;
  shipping_options: [];
  status: string;
  submit_type: any;
  subscription: any;
  success_url: string;
  total_details: any;
  url: string;
}

export default interface StripePayoutResponse {
  id: string;
  object: string;
  amount: number;
  arrival_date: number;
  automatic: true;
  balance_transaction: string;
  created: number;
  currency: string;
  description: string;
  destination: string;
  failure_balance_transaction: any;
  failure_code: any;
  failure_message: string;
  livemode: boolean;
  metadata: Record<string, string>;
  method: string;
  original_payout: any;
  reversed_by: any;
  source_type: string;
  statement_descriptor: any;
  status: string;
  type: string;
}

export interface StripeChargeWebhookResponse {
  id: string;
  object: {
    amount: number;
    amount_capturable: number;
    amount_details: object;
    amount_received: number;
    application: any;
    application_fee_amount: any;
    automatic_payment_methods: any;
    canceled_at: any;
    cancellation_reason: any;
    capture_method: string;
    charges: {
      object: string;
      data: Array<any>;
      has_more: boolean;
      url: string;
    };
    client_secret: string;
    confirmation_method: string;
    created: number;
    currency: string;
    customer: any;
    description: string;
    invoice: any;
    last_payment_error: any;
    livemode: boolean;
    metadata: StripeMetadata;
    next_action: any;
    on_behalf_of: any;
    payment_method: string;
    payment_method_options: object;
    payment_method_types: Array<string>;
    payment_status: string;
    processing: any;
    receipt_email: any;
    review: any;
    setup_future_usage: any;
    shipping: any;
    statement_descriptor: any;
    statement_descriptor_suffix: any;
    status: string;
    transfer_data: any;
    transfer_group: any;
  };
}

export enum StripeWebhookResponseStatus {
  SUCCESSFUL = 'succeeded',
  COMPLETED = 'completed',
  PAID = 'paid',
  UNPAID = 'unpaid',
  NO_PAYMENT_REQUIRED = 'no_payment_required'
}

export enum StripeWebhookEvent {
  INTENT_SUCCESSFUL = 'payment_intent.succeeded',
  CHARGE_SUCCESSFUL = 'charge.succeeded',
  CHARGE_FAILED = 'charge.failed',
  CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed',
  PAYOUT_COMPLETED = 'payout.paid'
}

type Mode = 'payment' | 'setup' | 'subscription';
