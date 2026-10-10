import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EMAIL_NOTIFICATION_EVENTS } from "src/enums";
import {
  IForgotPasswordEMAIL,
  INewAdminEMAIL,
  IOtpEMAIL,
} from "src/interfaces";
import { CommonUtil } from "src/utils";
import * as fs from "fs";
import { EmailNotificationService } from "../services/email.service";

@Injectable()
export class AuthNotificationService {
  private readonly logger = new Logger(AuthNotificationService.name);

  constructor(
    private readonly emailNotificationService: EmailNotificationService
  ) {}

  @OnEvent(EMAIL_NOTIFICATION_EVENTS.OTP_EMAIL)
  async sendOTPEmail(data: IOtpEMAIL) {
    try {
      const filePath = "src/mails/verification-code/index.html";

      const emailData = fs.readFileSync(filePath, "utf8");

      const result = emailData
        .replace(/{{code1}}/g, data.code.toString().charAt(0))
        .replace(/{{code2}}/g, data.code.toString().charAt(1))
        .replace(/{{code3}}/g, data.code.toString().charAt(2))
        .replace(/{{code4}}/g, data.code.toString().charAt(3))
        .replace(/{{name}}/g, data.name);

      const mailData = {
        to: data.email,
        subject: "Verification",
        html: result,
      };

      await this.emailNotificationService.sendOneEmail(mailData);
    } catch (error) {
      this.logger.error(
        "AuthNotificationService :: sendOTPEmail error \n %o",
        CommonUtil.getError(error)
      );
    }
  }

  @OnEvent(EMAIL_NOTIFICATION_EVENTS.NEW_ADMIN_EMAIL)
  async sendNewAdminEmail(data: INewAdminEMAIL) {
    try {
      const filePath = "src/mails/admin-new-account/index.html";

      const emailData = fs.readFileSync(filePath, "utf8");

      const result = emailData
        .replace(/{{password}}/g, data.password)
        .replace(/{{name}}/g, data.name);

      const mailData = {
        to: data.email,
        subject: "Admin account created",
        html: result,
      };

      await this.emailNotificationService.sendOneEmail(mailData);
    } catch (error) {
      this.logger.error(
        "AuthNotificationService :: sendOTPEmail error \n %o",
        CommonUtil.getError(error)
      );
    }
  }

  @OnEvent(EMAIL_NOTIFICATION_EVENTS.FORGOT_PASSWORD_EMAIL)
  async sendForgotPasswordEmail(data: IForgotPasswordEMAIL) {
    try {
      const filePath = "src/mails/EmailTemplate-forgot-password/index.html";

      const emailData = fs.readFileSync(filePath, "utf8");

      const result = emailData
        .replace(/%url%/g, data.url.toString())
        .replace(/%name%/g, data.name);

      const mailData = {
        to: data.email,
        subject: "Verification",
        html: result,
      };

      await this.emailNotificationService.sendOneEmail(mailData);
    } catch (error) {
      this.logger.error(
        "AuthNotificationService :: sendOTPEmail error \n %o",
        CommonUtil.getError(error)
      );
    }
  }
}
