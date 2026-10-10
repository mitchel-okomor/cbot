import { Controller, Get } from "@nestjs/common";
import { CbotService } from "./cbot.service";

@Controller()
export class CbotController {
  constructor(private readonly cbootService: CbotService) {}

  @Get()
  getHello(): string {
    return this.cbootService.getHello();
  }
}
