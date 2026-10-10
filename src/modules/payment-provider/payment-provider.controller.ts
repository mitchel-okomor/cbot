import { Controller, Get, Post, Body, Query, Req, Param } from "@nestjs/common";
import { PaymentProviderService } from "./payment-provider.service";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { ResponseModel } from "src/models/response-model";
import { ConfigurePaymentProviderDTO, GeneratePaymentLinkDTO, QueryPaymentProvidersDTO } from "./dto";
import { IAuthenticatedReq } from "src/interfaces";
import { PAYMENT_PROVIDER } from "src/enums";

@ApiTags("Payment Provider")
@Controller("payment-provider")
export class PaymentProviderController {
  constructor(private readonly paymentProviderService: PaymentProviderService) {}

  @ApiBearerAuth()
  @Get()
  @ApiQuery({ name: "enabled", required: false, type: Boolean })
  async getProviders(@Req() req: IAuthenticatedReq, @Query() query: QueryPaymentProvidersDTO) {
    const response = await this.paymentProviderService.getProviders(query);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Post("configure")
  async configureProvider(@Req() req: IAuthenticatedReq, @Body() payload: ConfigurePaymentProviderDTO) {
    const response = await this.paymentProviderService.configureProvider(payload.provider, payload);
    return ResponseModel.success("Provider configured", response);
  }

  @ApiBearerAuth()
  @Post("generate-link")
  async generatePaymentLink(@Req() req: IAuthenticatedReq, @Body() payload: GeneratePaymentLinkDTO) {
    const response = await this.paymentProviderService.generatePaymentLink(payload);
    return ResponseModel.success("Payment link generated", response);
  }

  @ApiBearerAuth()
  @Post("verify/:provider/:reference")
  async verifyPayment(@Req() req: IAuthenticatedReq, @Param("provider") provider: PAYMENT_PROVIDER, @Param("reference") reference: string) {
    const response = await this.paymentProviderService.verifyPayment(provider, reference);
    return ResponseModel.success("Payment verified", response);
  }
}
