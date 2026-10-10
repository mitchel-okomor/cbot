import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { QueryNotificationDTO } from "./dto/query-notification.dto";

import { NotificationRepository } from "./repository/notification.repository";
import { Notification, User } from "src/database/entities";
import {
  Between,
  Equal,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
} from "typeorm";
import { IPaginatedRes } from "src/interfaces";
import { CommonUtil } from "src/utils";
import { plainToClass } from "class-transformer";
import * as moment from "moment";
import { CreateNotificationDTO } from "./dto/create-bulk-notification.dto";

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async markAsRead(user: User, all: any, id: string): Promise<void> {
    try {
      const parsedAll: boolean = all === "true" || all === true || all === 1;

      if (!parsedAll && !id) {
        throw new HttpException(
          "id is required if all is false",
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!parsedAll) {
        // Update a specific notification as read when 'all' is false
        await this.notificationRepository.update(
          {
            user: { id: user.id },
            id: Equal(id),
            isRead: false,
          },
          { isRead: true },
        );
      } else {
        // Update all unread notifications for the user and business as read
        await this.notificationRepository.update(
          {
            user: { id: user.id },
            isRead: false,
          },
          { isRead: true },
        );
      }
    } catch (error) {
      this.logger.error(
        "NotificationService :: clearNotification error %o",
        CommonUtil.getError(error),
      );
    }
  }

  async getStaffNotification(
    filters: QueryNotificationDTO,
    user: User,
  ): Promise<IPaginatedRes> {
    const queryNotificationDTOClass = plainToClass(
      QueryNotificationDTO,
      filters,
    );

    const skip = queryNotificationDTOClass.getSkip();
    const sort = queryNotificationDTOClass.getSort();

    let startDate;
    let endDate;

    if (filters.timeFrame) {
      const { start, end } = CommonUtil.resolveDateRange(
        null,
        null,
        filters.timeFrame,
      );

      startDate = start;
      endDate = end;
    }

    const query: FindManyOptions<Notification> = {
      where: { user: Equal(user.id) },
      take: queryNotificationDTOClass.perPage,
      order: sort,
      skip: skip,
    };

    if (filters.isRead === true) {
      query.where["isRead"] = true;
    } else if (filters.isRead === false) {
      query.where["isRead"] = false;
    }

    if (filters.startDate) {
      startDate = filters.startDate;
    } else if (filters.endDate) {
      endDate = filters.endDate;
    } else if (filters.endDate && filters.startDate) {
      endDate = filters.endDate;
      startDate = filters.endDate;
    }

    if (endDate && startDate) {
      query.where["createdAt"] = Between(
        moment(startDate).toDate(),
        moment(endDate).toDate(),
      );
    } else if (endDate) {
      query.where["createdAt"] = LessThanOrEqual(moment(endDate).toDate());
    } else if (startDate) {
      query.where["createdAt"] = MoreThanOrEqual(moment(startDate).toDate());
    }

    if (filters.type) {
      query.where["type"] = filters.type;
    }

    const [tasks, total] =
      await this.notificationRepository.findAndCount(query);

    const unread = await this.notificationRepository.count({
      where: { user: Equal(user.id), isRead: false },
    });

    return CommonUtil.paginate(
      tasks,
      total,
      filters?.perPage,
      filters?.pageNumber,
      { unread },
    );
  }

  async createNotification(
    createNotificationDTO: CreateNotificationDTO,
  ): Promise<void> {
    try {
      await this.notificationRepository.save(createNotificationDTO);
    } catch (error) {
      this.logger.error(
        "NotificationService :: createNotification error %o",
        CommonUtil.getError(error),
      );
      throw error;
    }
  }

  async createBulkNotification(data: CreateNotificationDTO[]): Promise<void> {
    try {
      await this.notificationRepository.save(data);
    } catch (error) {
      this.logger.error(
        "NotificationService :: createBulkNotification error %o",
        CommonUtil.getError(error),
      );
      throw error;
    }
  }

  async deleteNotification(user: User, id: string): Promise<void> {
    await this.notificationRepository.softDelete({
      user: { id: user.id },
      id: id,
    });
  }
}
