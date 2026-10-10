import { Controller, Get, Post, Delete, Body, Param, Query, Req } from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { ResponseModel } from "src/models/response-model";
import { AddToWatchlistDTO, QueryWatchlistDTO } from "./dto";
import { IAuthenticatedReq } from "src/interfaces";

@ApiTags("Watchlist")
@Controller("watchlist")
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiBearerAuth()
  @Get()
  @ApiQuery({ name: "isActive", required: false, type: Boolean })
  @ApiQuery({ name: "symbol", required: false, type: String })
  async getWatchlist(@Req() req: IAuthenticatedReq, @Query() query: QueryWatchlistDTO) {
    const response = await this.watchlistService.getWatchlist(req.user, query);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Post()
  async addToWatchlist(@Req() req: IAuthenticatedReq, @Body() payload: AddToWatchlistDTO) {
    const response = await this.watchlistService.addToWatchlist(req.user, payload);
    return ResponseModel.success("Added to watchlist", response);
  }

  @ApiBearerAuth()
  @Delete(":symbol")
  async removeFromWatchlist(@Req() req: IAuthenticatedReq, @Param("symbol") symbol: string) {
    await this.watchlistService.removeFromWatchlist(req.user, symbol);
    return ResponseModel.success("Removed from watchlist");
  }

  @ApiBearerAuth()
  @Post(":symbol/toggle")
  async toggleActive(@Req() req: IAuthenticatedReq, @Param("symbol") symbol: string, @Body("isActive") isActive: boolean) {
    const response = await this.watchlistService.toggleActive(req.user, symbol, isActive);
    return ResponseModel.success("Watchlist updated", response);
  }
}
