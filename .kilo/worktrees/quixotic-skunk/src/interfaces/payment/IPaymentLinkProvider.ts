import { CreateTransactionDto } from "src/modules/transaction/dto/create-transaction.dto";
import { REQUERY_STATUS } from "src/enums/payment.enum";
import { GeneratePaymentLinkDto } from "src/modules/transaction/dto/generate-paymentlink.dto";
import { ResponseModel } from "src/models/response-model";

export default interface IPaymentLinkProvider {
  generatePaymentLink(
    generatePaymentLinkRequest: GeneratePaymentLinkDto,
  ): Promise<ResponseModel<CreateTransactionDto>>;

  requeryPaymentLinkTransaction(
    reference: string,
  ): Promise<
    ResponseModel<{
      reference: string;
      status: REQUERY_STATUS;
      providerResponse?: any;
    }>
  >;
}
