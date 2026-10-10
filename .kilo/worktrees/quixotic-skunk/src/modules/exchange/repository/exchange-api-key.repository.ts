import { Injectable, Logger } from "@nestjs/common";
import { AbstractCacheableRepository } from "../../../database";
import { DataSource } from "typeorm";
import { ExchangeApiKey } from "../../../database/entities";
import { ExchangeApiKeyCache } from "../../../cache";

@Injectable()
export class ExchangeApiKeyRepository extends AbstractCacheableRepository<ExchangeApiKey> {
  protected readonly logger = new Logger(ExchangeApiKeyRepository.name);

  constructor(
    protected dataSource: DataSource,
    private readonly exchangeApiKeyCache: ExchangeApiKeyCache
  ) {
    super(dataSource, ExchangeApiKey, exchangeApiKeyCache);
  }
}
