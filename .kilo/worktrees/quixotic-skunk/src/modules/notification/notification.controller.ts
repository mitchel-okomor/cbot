import {
  Controller,
  Get,
  Param,
  Patch,
  Req,
  Query,
  Delete,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { QueryNotificationDTO } from './dto/query-notification.dto';
import { IAuthenticatedReq } from 'src/interfaces';
import { ResponseModel } from 'src/models/response-model';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Fetch notifications',
    type: '',
  })
  @Get('/')
  async getStaffNotification(
    @Query() payload: QueryNotificationDTO,
    @Req() req: IAuthenticatedReq,
  ) {
    const response = await this.notificationService.getStaffNotification(
      payload,
      req.user,
    );
    return ResponseModel.success(
      'Notifications fetched successfully',
      response,
    );
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'id', description: 'Notification Id', required: false })
  @ApiQuery({
    name: 'all',
    type: Boolean,
    description: 'weather or not all should be marked',
  })
  @ApiResponse({
    status: 200,
    description: 'mark notification as read',
    type: '',
  })
  @Patch('/mark-as-read')
  async markAsRead(
    @Query() query: { id: string; all: boolean },
    @Req() req: IAuthenticatedReq,
  ) {
    const { all = false, id } = query;
    const response = await this.notificationService.markAsRead(
      req.user,
      all,
      id,
    );
    return ResponseModel.success('Operation successful', response);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Notification Id', required: true })
  @ApiResponse({
    status: 200,
    description: 'Delete a notification',
    type: '',
  })
  @Delete('/delete/:id')
  async deleteNotification(
    @Param('id') id: string,
    @Req() req: IAuthenticatedReq,
  ) {
    console.log('id', id);
    const response = await this.notificationService.deleteNotification(
      req.user,
      id,
    );
    return ResponseModel.success('Operation successful', response);
  }
}
