import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EMAIL_NOTIFICATION_EVENTS } from "src/enums";
import {
  IApplicationConfirmationEMAIL,
  IPaymentReceiptEMAIL,
} from "src/interfaces";
import { CommonUtil } from "src/utils";
import * as fs from "node:fs";
import { EmailNotificationService } from "../services/email.service";

@Injectable()
export class TradeNotificationService {
  private readonly logger = new Logger(TradeNotificationService.name);

  constructor(
    private readonly emailNotificationService: EmailNotificationService,
  ) {}

  @OnEvent(EMAIL_NOTIFICATION_EVENTS.APPLICATION_CONFIRMATION_EMAIL)
  async sendApplicationConfirmationEmail(data: IApplicationConfirmationEMAIL) {
    try {
      const filePath = "src/mails/application-confirmation/index.html";

      const emailData = fs.readFileSync(filePath, "utf8");

      const result = emailData
        .replaceAll("{{full_name}}", data.fullName)
        .replaceAll("{{program_title}}", data.programTitle)
        .replaceAll("{{program_description}}", data.programDescription)
        .replaceAll("{{payment_link}}", data.paymentLink);

      const mailData = {
        to: data.email,
        subject: "Application Confirmation",
        html: result,
      };

      await this.emailNotificationService.sendOneEmail(mailData);
    } catch (error) {
      this.logger.error(
        "ApplicationNotificationService :: sendApplicationConfirmationEmail error \n %o",
        CommonUtil.getError(error),
      );
    }
  }

  @OnEvent(EMAIL_NOTIFICATION_EVENTS.PAYMENT_CONFIRMATION_EMAIL)
  async sendPaymentConfirmationEmail(data: IPaymentReceiptEMAIL) {
    const filePath = "src/mails/receipt/index.html";

    const emailData = fs.readFileSync(filePath, "utf8");

    const result = emailData
      .replaceAll("{{full_name}}", data.fullName)
      .replaceAll("{{receipt_number}}", data.receiptNumber)
      .replaceAll("{{program_title}}", data.programTitle)
      .replaceAll("{{program}}", data.programTitle)
      .replaceAll("{{email}}", data.email)
      .replaceAll("{{phone}}", data.phoneNumber)
      // .replaceAll("{{program_description}}", data.programDescription)
      // .replaceAll("{{amount_paid}}", data.amountPaid)
      .replaceAll("{{amount}}", data.amountPaid)
      .replaceAll("{{duration}}", data.programDuration)
      .replaceAll("{{payment_reference}}", data.transactionId)
      .replaceAll("{{currency}}", data.currency)
      .replaceAll("{{method}}", data.paymentMethod)
      .replaceAll("{{payment_date}}", data.paymentDate)
      .replaceAll("{{status}}", data.paymentStatus)
      .replaceAll("{{transaction_id}}", data.transactionId)
      .replaceAll("{{receipt_url}}", data.receiptDownloadLink)
      .replaceAll("{{receipt_number}}", data.receiptNumber);

    const mailData = {
      to: data.email,
      subject: "Payment Confirmation",
      html: result,
    };

    await this.emailNotificationService.sendOneEmail(mailData);
  }
  catch(error) {
    this.logger.error(
      "ApplicationNotificationService :: sendPaymentConfirmationEmail error \n %o",
      CommonUtil.getError(error),
    );
  }
}
