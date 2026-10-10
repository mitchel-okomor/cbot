import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { GENERIC_RESPONSE_STATUS } from '../enums';
import { ResponseModel } from '../models/response-model';
import { CommonUtil } from 'src/utils';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseModel<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseModel<T>> {
    let response: {
      statusCode: string;
      message: string;
      data: any;
      status?: any;
    };

    const ctx = context.switchToHttp();
    // const request = ctx.getRequest();
    const httpResponse = ctx.getResponse();

    return next.handle().pipe(
      map((incomingResponse: any) => {
        if (incomingResponse instanceof ResponseModel) {
          response = incomingResponse;
        } else if (
          incomingResponse instanceof Error ||
          incomingResponse instanceof HttpException
        ) {
          response = {
            statusCode: GENERIC_RESPONSE_STATUS.FAILED,
            message: incomingResponse?.message || 'An Error occurred',
            data: null,
          };
        } else if (
          (incomingResponse?.stack && incomingResponse?.message) ||
          (incomingResponse?.statusCode &&
            incomingResponse?.statusCode !== '00')
        ) {
          response = {
            statusCode: '99',
            message: 'An Error occurred',
            data:
              incomingResponse?.data ||
              incomingResponse?.message ||
              'An Error occurred',
          };
        } else if (!incomingResponse) {
          response = {
            statusCode: '99',
            message: 'An Error occurred',
            data: null,
          };
        } else {
          response = {
            statusCode: incomingResponse?.statusCode || '00',
            message: incomingResponse?.message || 'Operation successful',
            data: incomingResponse?.data || null,
          };
        }

        if (
          incomingResponse instanceof ResponseModel &&
          CommonUtil.isFailure(response?.status || response?.statusCode)
        ) {
          httpResponse.status(400);
          response.message = incomingResponse?.message;
        }

        if (
          response?.message
            ?.toLowerCase()
            .includes('cannot read properties of undefined')
        ) {
          response.message = 'Unable to process this request.';
        }

        return response;
      }),
    );
  }
}
