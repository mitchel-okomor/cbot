import { Module } from "@nestjs/common";
import { UserService } from "./users.service";

import { UserRepository } from "./repository/user.repository";
import { UsersController } from "./users.controller";
import { UserCache, RedisModule } from "../../cache";
import { DatabaseModule } from "../../database";
import { User } from "../../database/entities";

@Module({
  controllers: [UsersController],
  providers: [
    //service
    UserService,

    //repo
    UserRepository,

    //cache
    UserCache,
  ],
  imports: [DatabaseModule.forFeature([User]), RedisModule],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
