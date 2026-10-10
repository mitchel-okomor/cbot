import { Injectable, Logger } from "@nestjs/common";
import { AbstractCacheableRepository } from "../../../database";
import { DataSource } from "typeorm";
import { Alert } from "../../../database/entities";
import { AlertCache } from "../../../cache";

@Injectable()
export class AlertRepository extends AbstractCacheableRepository<Alert> {
  protected readonly logger = new Logger(AlertRepository.name);

  constructor(
    protected dataSource: DataSource,
    private readonly alertCache: AlertCache
  ) {
    super(dataSource, Alert, alertCache);
  }
}
