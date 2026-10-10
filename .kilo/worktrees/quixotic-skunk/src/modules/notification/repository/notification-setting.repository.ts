import { Injectable, Logger } from "@nestjs/common";
import { AbstractCacheableRepository } from "../../../database";
import { DataSource } from "typeorm";
import { NotificationSetting } from "../../../database/entities";
import { NotificationSettingCache } from "../../../cache";

@Injectable()
export class NotificationSettingRepository extends AbstractCacheableRepository<NotificationSetting> {
  protected readonly logger = new Logger(NotificationSettingRepository.name);

  constructor(
    protected dataSource: DataSource,
    private readonly notificationSettingCache: NotificationSettingCache
  ) {
    super(dataSource, NotificationSetting, notificationSettingCache);
  }
}
