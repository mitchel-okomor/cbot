import { Controller, Get, Query, Req } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { ResponseModel } from "src/models/response-model";
import { GetAnalyticsDTO, GetRiskDTO } from "./dto";
import { IAuthenticatedReq } from "src/interfaces";

@ApiTags("Analytics")
@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiBearerAuth()
  @Get("dashboard")
  async getDashboard(@Req() req: IAuthenticatedReq) {
    const response = await this.analyticsService.getDashboard(req.user);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Get("chart")
  @ApiQuery({ name: "symbol", required: false, type: String })
  @ApiQuery({ name: "timeframe", required: false, type: String })
  @ApiQuery({ name: "days", required: false, type: Number })
  async getChart(@Req() req: IAuthenticatedReq, @Query() query: GetAnalyticsDTO) {
    const response = await this.analyticsService.getChart(req.user, query);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Get("risk")
  @ApiQuery({ name: "symbol", required: false, type: String })
  async getRisk(@Req() req: IAuthenticatedReq, @Query() query: GetRiskDTO) {
    const response = await this.analyticsService.getRisk(req.user, query);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Get("symbols")
  async getSymbols(@Req() req: IAuthenticatedReq) {
    const response = await this.analyticsService.getSymbols(req.user);
    return ResponseModel.success("Request successful", response);
  }
}
