import { Injectable } from "@nestjs/common";
import { NotificationSetting } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class NotificationSettingCache extends AbstractModelCache<NotificationSetting> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, NotificationSetting);
  }
}
