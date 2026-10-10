import { Injectable, Logger } from "@nestjs/common";
import { AbstractProvider } from "../abstract.provider";
import { ProviderCredentialValidator } from "../../../interfaces/providers/provider-config.interface";
import * as nodeMailer from "nodemailer";
import {
  SingleMail,
  ISingleMailMultipleRecipient,
  IMultipleMailMultipleRecipient,
} from "../../../interfaces/notification/email/common.interface";
import { IEmailProvider } from "../../../interfaces/notification/email/IEmailProvider.interface";

@Injectable()
export class NodeMailerProvider
  extends AbstractProvider
  implements IEmailProvider
{
  private readonly logger = new Logger(NodeMailerProvider.name);
  private readonly emailHost: string;
  private readonly emailServiceProvider: string;
  private readonly emailUsername: string;
  private readonly emailPassword: string;

  private transporter: any;
  constructor() {
    super();

    this.emailHost = process.env.EMAIL_HOST;
    this.emailUsername = process.env.EMAIL_USERNAME;
    this.emailServiceProvider = process.env.EMAIL_SERVICE_PROVIDER;
    this.emailPassword = process.env.EMAIL_PASSWORD;

    this.transporter = nodeMailer.createTransport({
      host: this.emailHost,
      service: this.emailServiceProvider,
      port: this.emailServiceProvider === "gmail" ? 465 : 587,
      secure: this.emailServiceProvider === "gmail",
      requireTLS: true,
      auth: {
        user: this.emailUsername,
        pass: this.emailPassword,
      },
    });
  }

  sendOneMail = async (payload: SingleMail) => {
    const { subject, email, options } = payload;
    const msg = {
      subject,
      to: email,
      html: payload.htmlOrTemplateId,
      from: "productpointerspms@gmail.com",
      // from: `"${options?.fromName}" <${options?.fromEmail}>`,
    };

    if (options?.cc) {
      msg["cc"] = options.cc;
    }

    if (options?.fromName) {
      msg["from"] = `"${options.fromName}" <${options?.fromEmail}>`;
    }

    return await this.transporter.sendMail(msg);
  };

  sendSingleMailMultipleRecipients = async (
    payload: ISingleMailMultipleRecipient,
  ) => {
    const { emails, options, htmlOrTemplateId, subject } = payload;
    const bulkMailComposer = [];

    emails?.map((to) => {
      const mail = {
        from: `"${options?.fromName}" <${options?.fromEmail}>`,
        html: htmlOrTemplateId,
        to,
        subject,
      };

      bulkMailComposer.push(mail);
    });

    return await this.transporter.sendMail(bulkMailComposer);
  };

  sendDynamicMailsMultipleRecipients(
    payload: IMultipleMailMultipleRecipient,
  ): void {
    this.logger.log("sendDynamicMailsMultipleRecipients :: payload", payload);
  }

  instantiateProvider() {
    this.transporter = nodeMailer.createTransport({
      host: this.emailHost,
      service: this.emailServiceProvider,
      port: this.emailServiceProvider === "gmail" ? 465 : 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: this.emailUsername,
        pass: this.emailPassword,
      },
    });

    return this;
  }

  getConfigurationRequirement(): ProviderCredentialValidator {
    return {
      username: true,
      password: true,
    };
  }
}
