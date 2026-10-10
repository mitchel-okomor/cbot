import { Controller, Get, Post, Body, Param, Query, Req } from "@nestjs/common";
import { BacktestService } from "./backtest.service";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { ResponseModel } from "src/models/response-model";
import { RunBacktestDTO, QueryBacktestDTO } from "./dto";
import { IAuthenticatedReq } from "src/interfaces";

@ApiTags("Backtest")
@Controller("backtest")
export class BacktestController {
  constructor(private readonly backtestService: BacktestService) {}

  @ApiBearerAuth()
  @Post("run")
  async runBacktest(@Req() req: IAuthenticatedReq, @Body() payload: RunBacktestDTO) {
    const response = await this.backtestService.runBacktest(req.user, payload);
    return ResponseModel.success("Backtest completed", response);
  }

  @ApiBearerAuth()
  @Get("history")
  @ApiQuery({ name: "symbol", required: false, type: String })
  @ApiQuery({ name: "name", required: false, type: String })
  async getHistory(@Req() req: IAuthenticatedReq, @Query() query: QueryBacktestDTO) {
    const response = await this.backtestService.getHistory(req.user);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Get(":id")
  async getBacktest(@Req() req: IAuthenticatedReq, @Param("id") id: string) {
    const response = await this.backtestService.getBacktest(req.user, id);
    return ResponseModel.success("Request successful", response);
  }
}
