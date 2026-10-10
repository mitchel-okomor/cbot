// header-check.middleware.ts
import { Request, Response, NextFunction } from "express";
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommonUtil } from "../utils";
import { EncryptionService } from "../interceptors";

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ApiKeyMiddleware.name);

  private readonly webClientId: string;

  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly configService: ConfigService
  ) {
    this.webClientId = this.configService.getOrThrow("X_WEB_API_KEY");
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.log(`Request url: ${req.originalUrl}`);
      const clientId = req.header("x-api-key");

      const allowedClientIds = [this.webClientId];

      if (
        allowedClientIds.length &&
        (!clientId || !allowedClientIds.includes(clientId))
      ) {
        throw new HttpException(
          "Forbidden: Invalid client ID",
          HttpStatus.FORBIDDEN
        );
      }

      return next();
    } catch (error) {
      console.error(
        "HeaderCheckMiddleware :: Error occurred while checking headers:",
        CommonUtil.getError(error)
      );
      this.logger.error(
        "HeaderCheckMiddleware :: Error occurred while checking headers:",
        CommonUtil.getError(error)
      );

      throw new HttpException(
        "Forbidden: Invalid client",
        HttpStatus.FORBIDDEN
      );
    }
  }
}
