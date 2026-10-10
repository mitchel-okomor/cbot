import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncryptionService } from '.';
import { CommonUtil } from '../utils';

@Injectable()
export class EncryptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(EncryptionInterceptor.name);

  constructor(private readonly encryptionService: EncryptionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      return next.handle().pipe(
        map((data) => {
          const request = context.switchToHttp().getRequest();

          if (this.encryptionService.useEncryption(request)) {
            return {
              data: this.encryptionService.encrypt(JSON.stringify(data)),
            };
          }
          return data;
        }),
      );
    } catch (error) {
      this.logger.error(
        'EncryptionInterceptor :: intercept %o',
        CommonUtil.getError(error),
      );
    }
  }
}
