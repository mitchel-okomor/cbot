import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionRepository } from "./repository/transaction.repository";
import { Equal } from "typeorm";

import { GenericProviderFactory } from "../factory/provider-factory";
import { GeneratePaymentLinkDto } from "./dto/generate-paymentlink.dto";
import {
  PAYMENT_METHOD,
  PAYMENT_PROVIDER,
  PAYMENT_STATUS,
} from "src/enums/payment.enum";
import IPaymentLinkProvider from "src/interfaces/payment/IPaymentLinkProvider";
import { Transaction } from "src/database/entities";
import { RedisService } from "src/cache";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
    private readonly genericProviderFactory: GenericProviderFactory,
    @Inject(RedisService) private readonly redisService: RedisService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.transactionRepository.save({
      amount: createTransactionDto.amount,

      currency: createTransactionDto.currency,

      reference: createTransactionDto.reference,

      request: createTransactionDto.request,

      response: createTransactionDto.response,

      status: PAYMENT_STATUS.PENDING,

      paymentMethod:
        createTransactionDto.payment_mode || PAYMENT_METHOD.PAYMENT_LINK,

      processor: createTransactionDto.processor || PAYMENT_PROVIDER.PAYSTACK,

      meta: createTransactionDto.meta || "",
    });
  }

  async findByRef(reference: string) {
    return this.transactionRepository.findOne({
      reference: Equal(reference),
    });
  }

  async findByClientRef(client_reference: string) {
    const transaction = await this.transactionRepository.findOne({
      reference: Equal(client_reference),
    });

    return transaction;
  }

  async generatePaymentLink(generatePaymentLink: GeneratePaymentLinkDto) {
    try {
      console.log(
        "payment_link :: initTransactionDto \n %o",
        JSON.stringify(generatePaymentLink),
      );

      const check = await this.findByClientRef(
        generatePaymentLink.client_reference,
      );
      if (check) {
        throw new Error("Duplicate transaction found!");
      }

      let processor: IPaymentLinkProvider;

      if (generatePaymentLink.currency === "NGN") {
        processor = this.genericProviderFactory.getPaymentLinkProvider({
          currency: generatePaymentLink.currency,
          provider: PAYMENT_PROVIDER.PAYSTACK,
        });
      } else {
        processor = this.genericProviderFactory.getPaymentLinkProvider({
          currency: generatePaymentLink.currency,
          provider: PAYMENT_PROVIDER.FLUTTERWAVE,
        });
      }
      const resp = await processor.generatePaymentLink(generatePaymentLink);

      let transaction: Transaction;

      if (resp.data) {
        transaction = await this.create(resp.data);
      }

      return { paymentDetails: resp.data, transaction };
    } catch (error) {
      console.error("paymentLink error ", error);
      throw error;
    }
  }
}
