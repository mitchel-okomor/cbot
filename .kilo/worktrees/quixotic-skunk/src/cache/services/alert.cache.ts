import { Injectable } from "@nestjs/common";
import { Alert } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class AlertCache extends AbstractModelCache<Alert> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, Alert);
  }
}
