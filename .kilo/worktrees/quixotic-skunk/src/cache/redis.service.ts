import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CacheUtil } from "../utils/cache.util";
import { CommonUtil } from "../utils";
import { Reflector } from "@nestjs/core";
import Redis from "ioredis";

@Injectable()
export class RedisService
  extends CacheInterceptor
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RedisService.name);

  constructor(
    @Inject("REDIS_CLIENT") private readonly cache: Cache,
    protected readonly reflector: Reflector,

    @Inject("REDIS_CLIENT") private readonly redis: Redis,
  ) {
    super(cache, reflector);
  }
  async onModuleInit() {
    console.log("✅ Redis Connected");
  }

  async onModuleDestroy() {
    console.log("🔴 Closing Redis connection...");
    this.redis.quit();
  }
  async getData(key: string): Promise<any> {
    try {
      let data: any = await this.redis.get(CacheUtil.getCacheKey(key));
      if (data) {
        data = JSON.parse(data);
      }
      return data;
    } catch (error) {
      this.logger.error(
        "RedisService :: getData error %o",
        CommonUtil.getError(error),
      );

      return null;
    }
  }

  async zrevrange(key: string, start: number, limit: number): Promise<any> {
    try {
      return await this.redis.zrevrange(
        CacheUtil.getCacheKey(key),
        start,
        limit,
        "WITHSCORES",
      );
    } catch (error) {
      this.logger.error(
        "RedisService :: getData error %o",
        CommonUtil.getError(error),
      );

      return null;
    }
  }

  async zrevrank(key: string, id: string): Promise<any> {
    try {
      return await this.redis.zrevrank(CacheUtil.getCacheKey(key), id);
    } catch (error) {
      this.logger.error(
        "RedisService :: getData error %o",
        CommonUtil.getError(error),
      );

      return null;
    }
  }

  async saveData(
    key: string,
    value:
      | Record<string, unknown>
      | Record<string, unknown>[]
      | string
      | number
      | any,
    ttl?: number,
  ): Promise<void> {
    try {
      ttl = ttl || (ttl === 0 ? ttl : Number(process.env.CACHE_TTL));
      const data = JSON.stringify(value);
      await this.redis.set(CacheUtil.getCacheKey(key), data, "EX", ttl);
    } catch (error) {
      this.logger.error(
        "RedisService :: saveData error %o",
        CommonUtil.getError(error),
      );
    }
  }

  async zadd(
    key: string,
    value:
      | Record<string, unknown>
      | Record<string, unknown>[]
      | string
      | number
      | any,
    id?: string,
  ): Promise<void> {
    try {
      await this.redis.zadd(CacheUtil.getCacheKey(key), value, id);
    } catch (error) {
      this.logger.error(
        "RedisService :: saveData error %o",
        CommonUtil.getError(error),
      );
    }
  }

  async deleteData(key: string): Promise<void> {
    try {
      await this.redis.del(CacheUtil.getCacheKey(key));
    } catch (error) {
      this.logger.error(
        "RedisService :: deleteData error %o",
        CommonUtil.getError(error),
      );
    }
  }

  async deleteMany(keys: string[]): Promise<void> {
    try {
      keys?.forEach((key) => {
        this.deleteData(key);
      });
    } catch (error) {
      this.logger.error(
        "RedisService :: deleteMany error %o",
        CommonUtil.getError(error),
      );
    }
  }

  async setExpiry(key: string, ttl) {
    this.redis.expire(CacheUtil.getCacheKey(key), ttl);
  }

  async get(key: string): Promise<any> {
    let data: any = await this.cache.get(key);
    data = JSON.parse(data);
    return data;
  }

  /***
   * This should be used with only cache keys that hold numeric values.
   * We use it to update the value of a key in cache by incrementing its value by the provided increment value
   */
  async updateKeyByIncrement(
    key: string,
    increment: number,
    ttl?: number,
  ): Promise<void> {
    try {
      const incrementValue = await this.getUpdateByIncrementValue(
        key,
        increment,
      );
      if (incrementValue) await this.saveData(key, incrementValue);
    } catch (error) {
      console.log("RedisProvider :: updateKeyByIncrement error \n %o", error);
    }
  }

  async updateKeyByIncrementAndFetch(
    key: string,
    increment: number,
    ttl?: number,
  ): Promise<number> {
    try {
      const updateValue = await this.getUpdateByIncrementValue(key, increment);
      if (updateValue) await this.saveData(key, updateValue);
      return updateValue;
    } catch (error) {
      console.log(
        "RedisProvider :: updateKeyByIncrementAndFetch error \n %o",
        error,
      );
      return null;
    }
  }

  private async getUpdateByIncrementValue(
    key: string,
    increment: number = 1,
  ): Promise<number> {
    try {
      if (!key) {
        throw new Error("getUpdateByIncrementValue:: invalid update key");
      }

      let currentValue = await this.get(key);
      if (!currentValue || currentValue == "NULL") currentValue = 0;

      return Number(currentValue) + increment;
    } catch (error) {
      console.log(
        "RedisProvider :: getUpdateByIncrementValue error \n %o",
        error,
      );
      return null;
    }
  }
}
