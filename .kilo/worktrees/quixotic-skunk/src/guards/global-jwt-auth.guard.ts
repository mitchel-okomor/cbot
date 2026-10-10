import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class GlobalJwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(GlobalJwtAuthGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context
      .switchToHttp()
      .getRequest()
      .headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new HttpException(
        "Authorization token not found",
        HttpStatus.UNAUTHORIZED
      );
    }

    context.switchToHttp().getRequest().user = {};
    return true;
  }
}
