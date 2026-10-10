import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { EncryptionService } from ".";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class EncryptionMiddleware implements NestMiddleware {
  constructor(private readonly encryptionService: EncryptionService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    // Skip encryption if the request is a form data or encryption is ignored based on headers and environment

    const contentType = req.headers["content-type"] || "";
    const isFormData =
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded");

    if (isFormData || !this.encryptionService.useEncryption(req)) {
      return next();
    }

    // Proceed with decryption if request method is not GET and request body is not empty

    if (req.body && Object.keys(req.body).length > 0 && req.method !== "GET") {
      const encryptedData = req.body?.data;

      if (!encryptedData) {
        throw new BadRequestException("Bad decryption");
      }

      try {
        req.body = JSON.parse(this.encryptionService.decrypt(encryptedData));
      } catch (error) {
        console.error("Decryption failed:", error);
        throw new BadRequestException("Bad decryption");
      }
    }

    next();
  }
}
