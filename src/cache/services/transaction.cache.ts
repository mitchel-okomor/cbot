import { Injectable } from "@nestjs/common";
import { Transaction } from "../../database/entities";
import { AbstractModelCache } from "./abstract.cache.service";
import { RedisService } from "../redis.service";

@Injectable()
export class TransactionCache extends AbstractModelCache<Transaction> {
  constructor(private readonly cacheService: RedisService) {
    super(cacheService, Transaction);
  }
}
