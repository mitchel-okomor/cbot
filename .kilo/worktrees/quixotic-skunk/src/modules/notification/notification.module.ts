import { forwardRef, Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { NotificationCache, RedisModule } from "../../cache";
import { Notification, NotificationSetting } from "../../database/entities";
import { NotificationRepository } from "./repository/notification.repository";
import { NotificationSettingRepository } from "./repository/notification-setting.repository";
import { DatabaseModule } from "../../database";
import { AuthNotificationService } from "./handlers/auth-notification";
import { EmailNotificationService } from "./services/email.service";
import { FactoryModule } from "../factory/factory.module";
import { PushNotificationService } from "./services/push-notification.service";
import { TradeNotificationService } from "./handlers/trade-notification";

@Module({
  imports: [
    DatabaseModule.forFeature([Notification, NotificationSetting]),
    RedisModule,
    forwardRef(() => FactoryModule),
  ],
  providers: [
    NotificationService,
    AuthNotificationService,
    NotificationRepository,
    NotificationCache,
    NotificationSettingRepository,
    EmailNotificationService,
    PushNotificationService,
    TradeNotificationService,
  ],
  exports: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
