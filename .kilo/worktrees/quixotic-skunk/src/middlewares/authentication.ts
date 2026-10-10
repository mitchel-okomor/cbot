import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Response } from "express";
import { RedisService } from "../cache/redis.service";
import { ConfigService } from "@nestjs/config";
import { CommonUtil } from "../utils";
import { User } from "../database/entities";
import { UserService } from "../modules/user/users.service";
import { IAuthenticatedReq } from "../interfaces";
import { ILoggedInUser } from "src/models/login-response-model";

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
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
      if (!req["header"]("authorization")) {
        throw new HttpException(
          "Authorization header not found",
          HttpStatus.UNAUTHORIZED
        );
      }

      const [signature, token] = req["header"]("authorization").split(" ");

      if (signature.toLowerCase() !== "bearer") {
        throw new HttpException(
          "Invalid token signature",
          HttpStatus.UNAUTHORIZED
        );
      }

      if (!token) {
        throw new HttpException("Token not found", HttpStatus.BAD_REQUEST);
      }

      const tokenInCache = await this.redisService.getData(token);
      let user: User;

      if (tokenInCache) {
        user = tokenInCache;
      } else {
        const decoded: any = await CommonUtil.verifyToken(
          token,
          this.jwtSecretKey
        );

        user = await this.userService.getUserById(decoded?.id);

        this.redisService.saveData(token, user);
      }

      if (!user)
        throw new HttpException(
          "User from token not found",
          HttpStatus.UNAUTHORIZED
        );

      req.user = user;

      return next();
    } catch (error) {
      console.log("error: ", error);
      throw new HttpException("Invalid Token", HttpStatus.UNAUTHORIZED);
    }
  }
}
