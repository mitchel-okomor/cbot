import { Module, Global } from "@nestjs/common";
import Redis from "ioredis";
import { RedisService } from "./redis.service";

@Global()
@Module({
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: async () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT, 10),
          password: process.env.REDIS_PASSWORD,
          ...(process.env.REDIS_TLS === "true" ? { tls: {} } : {}),
          reconnectOnError: (err) => {
            const targetError = ["ECONNREFUSED", "ECONNRESET"];
            if (targetError.includes((err as any).code)) {
              return true; // Reconnect on specific errors
            }
            return false; // Do not reconnect
          },
        });
      },
    },
    RedisService,
  ],
  exports: ["REDIS_CLIENT", RedisService],
})
export class RedisModule {}
