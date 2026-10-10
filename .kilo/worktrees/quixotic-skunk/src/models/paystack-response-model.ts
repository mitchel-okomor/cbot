import { PAYSTACK_WEBHOOK_EVENT } from "src/enums/payment.enum";

export class PaystackWebhookResponseModel<T> {
  event: PAYSTACK_WEBHOOK_EVENT;
  data: T;

  constructor(event: PAYSTACK_WEBHOOK_EVENT, data: T) {
    this.event = event;
    this.data = data;
  }
}
