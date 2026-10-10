import { Injectable } from "@nestjs/common";
import { User } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class UserCache extends AbstractModelCache<User> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, User);
  }
}
