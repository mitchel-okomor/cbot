import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { RedisService } from "../cache/redis.service";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user/users.service";
import { IAuthenticatedReq } from "src/interfaces";
import { CommonUtil } from "src/utils";

@Injectable()
export class SoftVerifyTokenMiddleware implements NestMiddleware {
  private jwtSecretKey: string;

  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(RedisService) private readonly redisService: RedisService,

    private readonly configService: ConfigService
  ) {
    this.jwtSecretKey = configService.getOrThrow("JWT_SECRET");
  }

  async use(req: IAuthenticatedReq, res: Response, next: NextFunction) {
    try {
      if (!req.headers.get("authorization")) {
        return next();
      }

      const [signature, token] = req.headers.get("authorization").split(" ");

      if (signature.toLowerCase() !== "bearer") return next();
      if (!token) return next();

      const decoded: any = await CommonUtil.verifyToken(
        token,
        this.jwtSecretKey
      );
      const user = await this.userService.getUserById(decoded.id);

      if (!user) return next();

      req.user = user;

      return next();
    } catch (error) {
      console.error("SoftVerifyToken :: user error \n %o", error);
      return next();
    }
  }
}
