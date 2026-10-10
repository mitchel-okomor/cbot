import { Injectable } from '@nestjs/common';
import { Notification } from '../../database/entities';
import { AbstractModelCache } from './abstract.cache.service';
import { RedisService } from '../redis.service';

@Injectable()
export class NotificationCache extends AbstractModelCache<Notification> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, Notification);
  }
}
