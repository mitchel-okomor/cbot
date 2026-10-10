import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "src/modules/transaction/dto/create-transaction.dto";

import { ResponseModel } from "../../../models/response-model";
import { GeneratePaymentLinkDto } from "../../transaction/dto/generate-paymentlink.dto";
import AbstractPaymentProvider from "./AbstractPaymentProvider";
import IPaymentLinkProvider from "src/interfaces/payment/IPaymentLinkProvider";
import { CommonUtil } from "src/utils";
import {
  PAYMENT_CHANNEL,
  PAYMENT_PROVIDER,
  PAYMENT_STATUS,
} from "src/enums/payment.enum";

import {
  GenerateStripePaymentLinkResponse,
  StripePaymentSession,
} from "src/interfaces/payment/stripe.responses";
import Stripe from "stripe";
import { PAYMENT_MODE } from "src/enums";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Injectable()
export default class StripeProvider
  extends AbstractPaymentProvider
  implements IPaymentLinkProvider
{
  protected stripe: any;

  constructor() {
    super();
    this.stripe = new Stripe(process.env.STRIPE_SECRETE_KEY, {
      apiVersion: null,
    });
  }

  async generatePaymentLink(generatePaymentLinkDTO: GeneratePaymentLinkDto) {
    console.log(
      "generatePaymentLinkDTO \n",
      JSON.stringify(generatePaymentLinkDTO),
      "\n\n ",
    );

    const txRef = CommonUtil.generateTransactionReference(this.getRefPrefix());

    try {
      const createPaymentSessionPayload: StripePaymentSession = {
        line_items: [
          {
            price_data: {
              currency: generatePaymentLinkDTO.currency,
              product_data: {
                name: generatePaymentLinkDTO.client_reference,
              },
              unit_amount: Math.round(
                CommonUtil.convertToSmallestUnit(
                  generatePaymentLinkDTO.amount,
                  generatePaymentLinkDTO.currency,
                ),
              ),
            },
            quantity: 1,
          },
        ],
        mode: PAYMENT_MODE.PAYMENT,
        success_url: generatePaymentLinkDTO?.call_back_url,
        cancel_url: process.env.CANCEL_URL,
        metadata: {
          paymentRef: txRef,
          identifier: generatePaymentLinkDTO.client_reference,
        },
      };

      console.log(
        "createPaymentSessionPayload \n %o",
        JSON.stringify(createPaymentSessionPayload),
      );

      const generateStripePaymentLinkResponse: GenerateStripePaymentLinkResponse =
        await this.stripe.checkout.sessions.create(createPaymentSessionPayload);
      console.log(
        "generateStripePaymentLinkResponse \n %o",
        generateStripePaymentLinkResponse,
      );

      const generatePaymentLinkResponse: CreateTransactionDto = {
        reference: txRef,
        request: JSON.stringify(generatePaymentLinkDTO),
        response: JSON.stringify(generateStripePaymentLinkResponse),
        status: PAYMENT_STATUS.PENDING,
        payment_mode: PAYMENT_CHANNEL.PAYMENT_LINK,
        amount: generatePaymentLinkDTO.amount,
        currency: generatePaymentLinkDTO.currency,
        phone_number: generatePaymentLinkDTO.phone_number,
        client_reference: generatePaymentLinkDTO.client_reference,
        meta: generatePaymentLinkDTO?.meta
          ? JSON.stringify(generatePaymentLinkDTO?.meta)
          : null,
        processor: PAYMENT_PROVIDER.STRIPE,
        payment_link: generateStripePaymentLinkResponse.url,
      };

      console.log(
        "generatePaymentLinkResponse \n",
        generatePaymentLinkResponse,
      );
      return new ResponseModel(
        PAYMENT_STATUS.SUCCESS,
        "Payment link generated successfully!",
        generatePaymentLinkResponse,
      );
    } catch (error) {
      console.log(`StripeProvider :: generatePaymentLink Error \n`, error);
      return new ResponseModel(
        PAYMENT_STATUS.FAILED,
        "Operation failed!",
        null,
      );
    }
  }

  async requeryPaymentLinkTransaction(
    reference: string,
  ): Promise<ResponseModel<any>> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(reference);
      console.info("transactionRequeryResponse \n %o", session);
      return new ResponseModel(
        PAYMENT_STATUS.SUCCESS,
        "requery successful",
        session,
      );
    } catch (error: any) {
      console.log("requeryTransaction error \n %o", error);
      return new ResponseModel(
        PAYMENT_STATUS.ERROR,
        "failed",
        error.raw.message,
      );
    }
  }

  protected getRefPrefix(): string {
    return "STRP";
  }
}
