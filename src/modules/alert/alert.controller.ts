import { Controller, Get, Post, Body, Param, Query, Req } from "@nestjs/common";
import { AlertService } from "./alert.service";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { ResponseModel } from "src/models/response-model";
import { CreateAlertDTO, QueryAlertDTO } from "./dto";
import { IAuthenticatedReq } from "src/interfaces";

@ApiTags("Alert")
@Controller("alerts")
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @ApiBearerAuth()
  @Get()
  @ApiQuery({ name: "isRead", required: false, type: Boolean })
  @ApiQuery({ name: "symbol", required: false, type: String })
  @ApiQuery({ name: "type", required: false, type: String })
  @ApiQuery({ name: "severity", required: false, type: String })
  async getAlerts(@Req() req: IAuthenticatedReq, @Query() query: QueryAlertDTO) {
    const response = await this.alertService.getAlerts(req.user, query);
    return ResponseModel.success("Request successful", response);
  }

  @ApiBearerAuth()
  @Post()
  async createAlert(@Req() req: IAuthenticatedReq, @Body() payload: CreateAlertDTO) {
    const response = await this.alertService.createAlert(req.user, payload);
    return ResponseModel.success("Alert created", response);
  }

  @ApiBearerAuth()
  @Post(":id/read")
  async markAsRead(@Req() req: IAuthenticatedReq, @Param("id") id: string) {
    await this.alertService.markAsRead(req.user, id);
    return ResponseModel.success("Marked as read");
  }

  @ApiBearerAuth()
  @Post("read-all")
  async markAllAsRead(@Req() req: IAuthenticatedReq) {
    await this.alertService.markAllAsRead(req.user);
    return ResponseModel.success("All marked as read");
  }
}
