import { Logger, Type } from '@nestjs/common';
import { RedisService } from '../redis.service';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
} from 'typeorm';
import { CommonUtil } from '../../utils';
import { AbstractEntity } from '../../database';

export abstract class AbstractModelCache<T extends AbstractEntity<T>> {
  protected readonly logger = new Logger(AbstractModelCache.name);
  protected model: Type<T>;
  protected cache: RedisService;

  constructor(cacheService: RedisService, modelClass: Type<T>) {
    this.cache = cacheService;
    this.model = modelClass;
  }

  async findById(id: string, relations?: FindOptionsRelations<T>) {
    if (!id) return null;
    if (relations) {
      return await this.findByIdWithRelations(id, relations);
    }
    try {
      const key = `${this.model.name}_id_${id}`;
      return await this.cache.getData(key);
    } catch (error) {
      this.logger.error('findById error', CommonUtil.getError(error));
      return null;
    }
  }

  async cacheFindById(
    id: string,
    relations: FindOptionsRelations<T>,
    data: any,
  ): Promise<void> {
    if (!id) return;
    if (relations) {
      return this.cacheFindByIdWithRelations(id, relations, data);
    }
    if (!data) return;
    try {
      const key = `${this.model.name}_id_${id}`;
      return await this.cache.saveData(key, data);
    } catch (error) {
      this.logger.error('cacheFindById error', CommonUtil.getError(error));
    }
  }

  async findByIdWithRelations(id: string, relations?: FindOptionsRelations<T>) {
    if (!id) return null;

    try {
      const key = `${this.model.name}_${id}_${JSON.stringify(relations)}`;
      return await this.cache.getData(key);
    } catch (error) {
      this.logger.error(
        'findByIdWithRelations error',
        CommonUtil.getError(error),
      );
      return null;
    }
  }

  async cacheFindByIdWithRelations(
    id: string,
    relations: FindOptionsRelations<T>,
    data: any,
  ): Promise<void> {
    try {
      if (!id) return;
      const key = `${this.model.name}_${id}_${JSON.stringify(relations)}`;
      await this.cache.saveData(key, data);
    } catch (error) {
      this.logger.error(
        'cacheFindByIdWithRelations error',
        CommonUtil.getError(error),
      );
    }
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ) {
    try {
      const key = `${this.model.name}_${JSON.stringify({ where, relations })}`;
      return await this.cache.getData(key);
    } catch (error) {
      this.logger.error('findOne error', CommonUtil.getError(error));
      return null;
    }
  }

  async cacheFindOne(
    where: FindOptionsWhere<T>,
    relations: FindOptionsRelations<T>,
    data: any,
  ) {
    if (!data) return;
    const key = `${this.model.name}_${JSON.stringify({ where, relations })}`;
    return await this.cache.saveData(key, data);
  }

  async find(
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations?: FindOptionsRelations<T>,
    order?: FindOptionsOrder<T>,
  ) {
    try {
      const key = `${this.model.name}_${JSON.stringify({ where, relations, order })}`;
      return await this.cache.getData(key);
    } catch (error) {
      this.logger.error('find error', CommonUtil.getError(error));
      return null;
    }
  }

  async cacheFind(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations: FindOptionsRelations<T>,
    order: FindOptionsOrder<T>,
    data: any,
  ) {
    try {
      if (!data) return;
      const key = `${this.model.name}_${JSON.stringify({ where, relations, order })}`;
      return await this.cache.saveData(key, data);
    } catch (error) {
      this.logger.error('cacheFind error', CommonUtil.getError(error));
    }
  }

}
