import {
  CACHE_MANAGER,
  CACHE_TTL_METADATA,
  CacheInterceptor,
  Cache,
} from "@nestjs/cache-manager";
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CommonUtil } from "../utils";
import { Observable, tap } from "rxjs";

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    protected readonly reflector: Reflector
  ) {
    super(cache, reflector);
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<string | unknown>> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    // Debug: Log key and TTL
    const { url, method, params, query } = request;

    const normalizedUrl = url?.replace(/\/+$/, ""); // Remove trailing slashes

    let cacheKey = `${method}-${normalizedUrl}`;

    // Add sorted params and query
    const paramsString =
      params && Object.keys(params).length
        ? JSON.stringify(CommonUtil.sortObjectKeys(params))
        : "";
    if (paramsString) {
      cacheKey += `-${paramsString}`;
    }

    const queryString =
      query && Object.keys(query).length
        ? JSON.stringify(CommonUtil.sortObjectKeys(query))
        : "";
    if (queryString) {
      cacheKey += `${queryString.replace(/{|}|"/g, "")}`;
    }

    const appEnv = process.env.APP_ENV || "unknown";

    const FinalKey = `${appEnv}_harmony_${cacheKey}`;

    const ttl = this.reflector.get<number>(CACHE_TTL_METADATA, handler);

    return next.handle().pipe(
      tap(async (response) => {
        await this.cacheManager.set(FinalKey, response, { ttl }); // Explicitly set TTL here
      })
    );
  }
}
