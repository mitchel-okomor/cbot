import { Controller, Logger } from "@nestjs/common";
import { WebhookService } from "./webhook.service";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("webhook")
@Controller("webhook")
export class WebhookController {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly webhookService: WebhookService) {}
}
