import { Controller, Get, Put, Body, Query, Req } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { ResponseModel } from "src/models/response-model";
import { UpdateUserConfigDTO, GetConfigDTO } from "./dto";
import { IAuthenticatedReq } from "src/interfaces";

@ApiTags("Config")
@Controller("config")
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @ApiBearerAuth()
  @Get()
  @ApiQuery({ name: "section", required: false, enum: ["trading", "notifications", "risk", "all"] })
  async getConfig(@Req() req: IAuthenticatedReq, @Query() query: GetConfigDTO) {
    const response = await this.configService.getConfig(req.user, query.section);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Put()
  async updateConfig(@Req() req: IAuthenticatedReq, @Body() payload: UpdateUserConfigDTO) {
    const response = await this.configService.updateConfig(req.user, payload);
    return ResponseModel.success("Config updated successfully", response);
  }
}
