import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CbotService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return `cbot service running in ${this.configService.get("APP_ENV")}`;
  }
}
