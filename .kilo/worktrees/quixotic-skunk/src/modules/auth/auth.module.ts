import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../user/users.module";
import { RedisModule } from "../../cache";
import { EncryptionService } from "../../interceptors";

@Module({
  imports: [RedisModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, EncryptionService],
  exports: [AuthService],
})
export class AuthModule {}
