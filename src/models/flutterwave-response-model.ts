import { FLUTTERWAVE_WEBHOOK_EVENT } from "src/enums/payment.enum";

export class FlutterwaveWebhookResponseModel<T> {
  event: FLUTTERWAVE_WEBHOOK_EVENT;
  "event.type"?: string;
  data: T;

  constructor(event: FLUTTERWAVE_WEBHOOK_EVENT, eventType: string, data: T) {
    this.event = event;
    this["event.type"] = eventType;
    this.data = data;
  }
}
