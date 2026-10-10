import { Injectable } from "@nestjs/common";
import { Device } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class DeviceCache extends AbstractModelCache<Device> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, Device);
  }
}
