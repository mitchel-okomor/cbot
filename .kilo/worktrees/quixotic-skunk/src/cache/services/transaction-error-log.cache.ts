import { Injectable } from "@nestjs/common";
import { TransactionErrorLog } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class TransactionErrorLogCache extends AbstractModelCache<TransactionErrorLog> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, TransactionErrorLog);
  }
}
