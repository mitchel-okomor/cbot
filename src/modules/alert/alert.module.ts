import { Module } from "@nestjs/common";
import { AlertService } from "./alert.service";
import { AlertRepository } from "./repository/alert.repository";
import { AlertController } from "./alert.controller";
import { AlertCache, RedisModule } from "../../cache";
import { DatabaseModule } from "../../database";
import { Alert } from "../../database/entities";

@Module({
  controllers: [AlertController],
  providers: [
    AlertService,
    AlertRepository,
    AlertCache,
  ],
  imports: [DatabaseModule.forFeature([Alert]), RedisModule],
  exports: [AlertService, AlertRepository],
})
export class AlertModule {}
