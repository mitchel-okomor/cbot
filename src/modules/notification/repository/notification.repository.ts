import { Injectable, Logger } from "@nestjs/common";
import { AbstractCacheableRepository } from "../../../database";
import { DataSource } from "typeorm";
import { NotificationCache } from "../../../cache";
import { Notification } from "../../../database/entities";

@Injectable()
export class NotificationRepository extends AbstractCacheableRepository<Notification> {
  protected readonly logger = new Logger(NotificationRepository.name);

  constructor(
    protected dataSource: DataSource,
    protected readonly notificationCache: NotificationCache
  ) {
    super(dataSource, Notification, notificationCache);
  }
}
