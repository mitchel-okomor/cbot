import { Logger } from '@nestjs/common';
import {
  DataSource,
  EntityTarget,
  Equal,
  FindOptionsOrder,
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { AbstractModelCache } from '../cache/services/abstract.cache.service';

export abstract class AbstractCacheableRepository<T> extends Repository<T> {
  protected readonly logger = new Logger(AbstractCacheableRepository.name);
  private repository: Repository<T>;

  constructor(
    protected readonly dataSource: DataSource,
    private readonly entity: EntityTarget<T>,
    private readonly entityCache: AbstractModelCache<T>,
  ) {
    super(entity, dataSource.createEntityManager());
    this.repository = dataSource.getRepository(entity);
  }

  async findOne(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T> | FindOptionsRelationByString,
    select?: FindOptionsSelect<T>,
  ): Promise<T> {
    try {
      return await this.repository.findOneOrFail({ where, relations, select });
    } catch (error) {
      this.logger.error('AbstractCacheableRepository :: findOne error');
      return null;
    }
  }

  async findOneCache(
    where: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    try {
      let entity = await this?.entityCache?.findOne(where, relations);

      if (!entity) {
        entity = await this.repository.findOneOrFail({ where, relations });
        this?.entityCache?.cacheFindOne(where, relations, entity);
      }

      return entity;
    } catch (error) {
      return null;
    }
  }

  async findById(id: string, relations?: FindOptionsRelations<T>): Promise<T> {
    try {
      const where = { id: Equal(id) } as unknown as FindOptionsWhere<T>;
      return await this.repository.findOneOrFail({ where, relations });
    } catch (error) {
      this.logger.error(
        'AbstractCacheableRepository :: findById error  %o',
        error,
      );
      return null;
    }
  }

  async findByIdCache(
    id: string,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    try {
      let entity = await this?.entityCache?.findById(id);

      if (!entity) {
        const where = { id: Equal(id) } as unknown as FindOptionsWhere<T>;
        entity = await this.repository.findOneOrFail({ where, relations });

        this?.entityCache?.cacheFindById(id, relations, entity);
      }

      return entity;
    } catch (error) {
      this.logger.error(
        'AbstractCacheableRepository :: findByIdCache error  %o',
        error,
      );
      return null;
    }
  }

  async findCache(
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations?: FindOptionsRelations<T>,
    order?: FindOptionsOrder<T>,
  ): Promise<T[]> {
    let entity = await this?.entityCache?.find(where, relations, order);

    if (!entity) {
      entity = await this.repository.find({
        where,
        relations,
        order,
        // cache: true TODO - come back to this  //TODO - make sure this is working as intended.
      });

      this?.entityCache?.cacheFind(where, relations, order, entity);
    }

    return entity;
  }
}
