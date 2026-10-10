import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { CbotController } from "./cbot.controller";
import { CbotService } from "./cbot.service";
import { UsersModule } from "./modules/user/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import * as Joi from "joi";
import { ScheduleModule } from "@nestjs/schedule";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { DatabaseModule } from "./database";
import { RedisModule } from "./cache";
import { SoftVerifyTokenMiddleware } from "./middlewares/softauth";
import { UsersController } from "./modules/user/users.controller";
import { VerifyTokenMiddleware } from "./middlewares/authentication";
import { NotificationModule } from "./modules/notification/notification.module";
import { NotificationController } from "./modules/notification/notification.controller";
import { StorageModule } from "./modules/storage/storage.module";
import { EncryptionService } from "./interceptors";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { EncryptionInterceptor } from "./interceptors/encryption.interceptor";
// import { ApiKeyMiddleware } from "./middlewares/apikey.middleware";
import { LoggerModule } from "./logger";
import { WebhookModule } from "./modules/webhook/webhook.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { ApiKeyMiddleware } from "./middlewares/apikey.middleware";
import { TradingModule } from "./modules/trading/trading.module";
import { ExchangeModule } from "./modules/exchange/exchange.module";
import { WatchlistModule } from "./modules/watchlist/watchlist.module";
import { AlertModule } from "./modules/alert/alert.module";
import { BacktestModule } from "./modules/backtest/backtest.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_ENV: Joi.string().required(),
        PORT: Joi.number().required(),

        JWT_SECRET: Joi.string().required(),
        JWT_RESET_PASSWORD_SECRET_KEY: Joi.string().required(),
        JWT_EXPIRES_IN_SECONDS: Joi.number().required(),
        APP_ID: Joi.string().required(),

        //cache
        REDIS_URL: Joi.string().required(),

        //db
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string(),
        POSTGRES_DB: Joi.string().required(),
      }),
      envFilePath:
        process.env.NODE_ENV === "production" ? "./.prod.env" : `./.env`,
    }),
    ScheduleModule.forRoot(),
    RedisModule,
    UsersModule,
    AuthModule,
    NotificationModule,
    StorageModule,
    WebhookModule,
    TransactionModule,
    AnalyticsModule,
    TradingModule,
    ExchangeModule,
    WatchlistModule,
    AlertModule,
    BacktestModule,
  ],
  controllers: [CbotController],
  providers: [
    CbotService,
    EncryptionService,
    {
      provide: APP_INTERCEPTOR,
      useClass: EncryptionInterceptor,
    },
  ],
})
export class CbotModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .exclude({ path: "/states", method: RequestMethod.GET })
      .forRoutes(UsersController, NotificationController, {
        method: RequestMethod.PATCH,
        path: "/auth/update-password",
      })

      .apply(SoftVerifyTokenMiddleware)
      .forRoutes();
    // .apply(ApiKeyMiddleware)
    // .forRoutes("*");
  }
}
