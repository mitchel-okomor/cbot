import { Controller, Get, Post, Body, Param, Req } from "@nestjs/common";
import { ExchangeService } from "./exchange.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseModel } from "src/models/response-model";
import { IAuthenticatedReq } from "src/interfaces";

@ApiTags("Exchange")
@Controller("exchange")
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @ApiBearerAuth()
  @Get("keys")
  async getKeys(@Req() req: IAuthenticatedReq) {
    const response = await this.exchangeService.getApiKeys(req.user);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Post("add-key")
  async addKey(@Body() payload: any, @Req() req: IAuthenticatedReq) {
    const response = await this.exchangeService.addApiKey(req.user, payload);
    return ResponseModel.success("Key added successfully", response);
  }

  @ApiBearerAuth()
  @Get("balance")
  async getBalance(@Req() req: IAuthenticatedReq) {
    const response = await this.exchangeService.getBalance(req.user);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Get("prices/:symbol")
  async getPrices(@Param("symbol") symbol: string, @Req() req: IAuthenticatedReq) {
    const response = await this.exchangeService.getPrice(req.user, symbol);
    return ResponseModel.success("Request successful", response);
  }
}
