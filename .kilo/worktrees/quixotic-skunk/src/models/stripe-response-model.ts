import { StripeWebhookEvent } from "src/enums/payment.enum";

export class StripeWebhookResponseModel<T> {
  type: StripeWebhookEvent;
  "event.type"?: string;
  data: T;

  constructor(type: StripeWebhookEvent, eventType: string, data: T) {
    this.type = type;
    this["event.type"] = eventType;
    this.data = data;
  }
}
