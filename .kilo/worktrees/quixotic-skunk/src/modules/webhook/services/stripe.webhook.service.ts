import { Injectable, Logger } from "@nestjs/common";
import { Equal } from "typeorm";
import { CommonUtil } from "src/utils";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionRepository } from "src/modules/transaction/repository/transaction.repository";
import { StripeWebhookResponseModel } from "src/models/stripe-response-model";
import {
  StripeChargeWebhookResponse,
  StripeWebhookEvent,
  StripeWebhookResponseStatus,
} from "src/interfaces/payment/stripe.responses";
import { PAYMENT_PROVIDER, PAYMENT_STATUS } from "src/enums/payment.enum";
import { Transaction } from "src/database/entities";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Injectable()
export class StripeWebhookService {
  private readonly logger = new Logger(StripeWebhookService.name);

  constructor(
    @InjectRepository(TransactionRepository)
    protected transactionRepository: TransactionRepository,

    // @InjectRepository(TransactionErrorLogRepository)
    // protected transactionErrorLogRepository: TransactionErrorLogRepository,
  ) {}

  async handleStripeWebhookResponse(
    webhookResponse: StripeWebhookResponseModel<StripeChargeWebhookResponse>,
  ) {
    console.info(
      "handleStripeWebhookResponse payload \n %o",
      JSON.stringify(webhookResponse),
    );

    try {
      //todo - validate data to be sure it is from Stripe
      let paymentObject;

      switch (webhookResponse.type.toLowerCase()) {
        case StripeWebhookEvent.CHECKOUT_SESSION_COMPLETED:
          paymentObject = webhookResponse?.data;
          await this.chargeSuccessHandler(webhookResponse);
          console.log("Payment session was successful!: ", paymentObject);
          break;

        default:
          console.log(`Unhandled event type ${webhookResponse.type}`);
          this.saveFailureLog(
            webhookResponse?.data?.object.metadata.paymentRef,
            null,
            "UNHANDLED_STRIPE_EVENT",
            null,
            null,
            webhookResponse,
            PAYMENT_PROVIDER.STRIPE,
          );
      }
    } catch (error) {
      console.error(
        "WebhookController :: handleStripeWebhookResponse error \n %o",
        error,
      );
    }
  }

  private async chargeSuccessHandler(
    response: StripeWebhookResponseModel<StripeChargeWebhookResponse>,
  ): Promise<void> {
    console.log(
      "processing webhook response with ref: ",
      response?.data?.object?.metadata?.paymentRef,
    );

    let transactionUpdated = false;
    let transaction: Transaction;

    try {
      transaction = await this.transactionRepository.findOne({
        reference: Equal(response?.data?.object?.metadata?.paymentRef),
      });

      console.log(
        `tnx related to ref ${response?.data?.object.metadata?.paymentRef} \n %o`,
        JSON.stringify(transaction),
      );

      if (transaction) {
        if (transaction.status != PAYMENT_STATUS.PENDING) return;

        if (
          response?.data?.object.payment_status ==
          StripeWebhookResponseStatus.PAID
        ) {
          transaction.status = PAYMENT_STATUS.SUCCESS;
        } else if (
          response?.data?.object.payment_status ==
            StripeWebhookResponseStatus.UNPAID ||
          response?.data?.object.payment_status ==
            StripeWebhookResponseStatus.NO_PAYMENT_REQUIRED
        ) {
          transaction.status = PAYMENT_STATUS.PENDING;
        } else {
          transaction.status = PAYMENT_STATUS.UNKNOWN;
        }
      } else {
        this.saveFailureLog(
          response?.data?.object.metadata?.paymentRef,
          transaction?.amount,
          "TRANSACTION_NOT_FOUND",
          transaction,
          null,
          response,
          PAYMENT_PROVIDER.STRIPE,
        );
      }

      transaction.response = JSON.stringify(response);
      transaction = await this.transactionRepository.save(transaction);
      transactionUpdated = true;
    } catch (error) {
      console.log("chargeSuccessLiveHandler error \n %o", error);
      const reason = transactionUpdated
        ? "POSSIBLE_QUEUE_FAILURE"
        : "UNKNOWN_ERROR";
      this.saveFailureLog(
        response?.data?.object.metadata?.paymentRef,
        null,
        reason,
        transaction,
        error,
        response,
        PAYMENT_PROVIDER.STRIPE,
      );
    }
  }

  async saveFailureLog(
    reference: string,
    amount: number,
    reason: string,
    transaction?: Transaction,
    error?: any,
    data?: any,
    processor?: string,
  ): Promise<void> {
    try {
      reference = reference || "custom_".concat(CommonUtil.randomString(30));
      const failureLog = {
        amount,
        tnx_id: transaction?.id,
        reference,
        reason: reason || "UNKNOWN_ERROR",
        data: data ? JSON.stringify(data) : null,
        error: error ? JSON.stringify(error) : null,
        processor,
      };
      //  await this.transactionErrorLogRepository.save(failureLog);
    } catch (error) {
      console.error(
        `Terminal error :: saveFailureLog error for tnx with ref ${reference} \n %o`,
        error,
      );
    }
  }
}
