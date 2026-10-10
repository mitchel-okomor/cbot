import { InjectRepository } from "@nestjs/typeorm";
import { TransactionRepository } from "../../transaction/repository/transaction.repository";
import { TransactionErrorLogRepository } from "../../transaction/repository/transactionerrorlog.repository";
import { Equal } from "typeorm";
import { Transaction } from "src/database/entities";
import {
  FLUTTERWAVE_WEBHOOK_EVENT,
  PAYMENT_PROVIDER,
  PAYMENT_STATUS,
} from "src/enums/payment.enum";
import { FlutterwaveWebhookResponseModel } from "src/models/flutterwave-response-model";
import { Logger } from "@nestjs/common";
import { CommonUtil } from "src/utils";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { TRANSACTION_EVENTS } from "src/enums";
import { FlutterwaveChargeWebhookResponse } from "src/interfaces/payment/flutterwave.charge.success";

export class FlutterwaveWebhookService {
  private readonly logger = new Logger(FlutterwaveWebhookService.name);

  constructor(
    @InjectRepository(TransactionRepository)
    protected transactionRepository: TransactionRepository,

    @InjectRepository(TransactionErrorLogRepository)
    protected transactionErrorLogRepository: TransactionErrorLogRepository,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async handleFlutterwaveWebhookResponse(
    webhookResponse: FlutterwaveChargeWebhookResponse,
  ) {
    console.info(
      "flutterwave webhookResponse payload \n %o",
      JSON.stringify(webhookResponse),
    );

    try {
      //todo - validate data to be sure it is from flutterwave

      switch (webhookResponse?.status) {
        case "successful":
          await this.chargeSuccessHandler(webhookResponse);
          break;

        default:
          console.log(
            `unhandled event ${webhookResponse?.["event.type"]} with payload \n %o`,
            webhookResponse,
          );
          this.saveFailureLog(
            webhookResponse?.txRef,
            null,
            "UNHANDLED_FLUTTERWAVE_EVENT",
            null,
            null,
            webhookResponse,
            PAYMENT_PROVIDER.FLUTTERWAVE,
          );
          break;
      }
    } catch (error) {
      console.error(
        "WebhookController :: handleFlutterwaveWebhookResponse error \n %o",
        error,
      );
    }
  }

  private async chargeSuccessHandler(
    response: FlutterwaveChargeWebhookResponse,
  ): Promise<void> {
    console.log(
      "chargeSuccessHandler processing webhook response with ref ",
      response?.txRef,
    );

    let transactionUpdated = false;
    let transaction: Transaction;

    try {
      transaction = await this.transactionRepository.findOne({
        reference: Equal(response?.txRef),
      });
      console.log(
        `tnx related to ref ${response?.txRef} \n %o`,
        JSON.stringify(transaction),
      );

      if (transaction) {
        //preventing multiple updates
        if (transaction.status != PAYMENT_STATUS.PENDING) {
          console.log(
            `Transaction ${transaction.reference} already processed. Status: ${transaction.status}`,
          );
          return;
        }

        transaction.response = JSON.stringify(response);
        transaction.status =
          response?.status == "successful"
            ? PAYMENT_STATUS.SUCCESS
            : PAYMENT_STATUS.FAILED;

        transaction = await this.transactionRepository.save(transaction);
        transactionUpdated = true;

        // Emit event for successful transactions
        if (response?.status == "successful") {
          this.eventEmitter.emit(
            TRANSACTION_EVENTS.TRANSACTION_COMPLETED,
            transaction,
          );
        }
      } else {
        console.error(
          "transaction not found for payload with ref %s",
          response?.txRef,
        );
        this.saveFailureLog(
          response?.txRef,
          transaction?.amount,
          "TRANSACTION_NOT_FOUND",
          transaction,
          null,
          response,
          PAYMENT_PROVIDER.FLUTTERWAVE,
        );
      }
    } catch (error) {
      console.error("chargeSuccessHandler error \n", error);
      const reason = transactionUpdated
        ? "POSSIBLE_QUEUE_FAILURE"
        : "UNKNOWN_ERROR";
      this.saveFailureLog(
        response?.txRef,
        null,
        reason,
        transaction,
        error,
        response,
        PAYMENT_PROVIDER.FLUTTERWAVE,
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
      await this.transactionErrorLogRepository.save(failureLog);
    } catch (error) {
      console.error(
        `Terminal error :: saveFailureLog error for tnx with ref ${reference} \n %o`,
        error,
      );
    }
  }
}
