import { Controller, Get, Req } from "@nestjs/common";
import { TradingService } from "./trading.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseModel } from "src/models/response-model";
import { IAuthenticatedReq } from "src/interfaces";

@ApiTags("Trading")
@Controller("trading")
export class TradingController {
  constructor(private readonly tradingService: TradingService) {}

  @ApiBearerAuth()
  @Get("active")
  async getActiveTrades(@Req() req: IAuthenticatedReq) {
    const response = await this.tradingService.getActiveTrades();
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Get("history")
  async getTradeHistory(@Req() req: IAuthenticatedReq) {
    const response = await this.tradingService.getTradeHistory(req.user);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Get("opportunities")
  async getOpportunities(@Req() req: IAuthenticatedReq) {
    const response = await this.tradingService.getOpportunities(req.user);
    return ResponseModel.success("Request successful", response);
  }
}
