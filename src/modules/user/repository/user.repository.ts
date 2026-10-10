import { Injectable, Logger } from "@nestjs/common";
import { AbstractCacheableRepository } from "../../../database";
import { DataSource } from "typeorm";
import { User } from "../../../database/entities";
import { UserCache } from "../../../cache";
import { IAuthUser } from "src/models/login-response-model";

@Injectable()
export class UserRepository extends AbstractCacheableRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    protected dataSource: DataSource,
    private readonly userCache: UserCache
  ) {
    super(dataSource, User, userCache);
  }

  async getAuthUserByEmail(email: string): Promise<IAuthUser> {
    return (await this.dataSource
      .createQueryBuilder(User, "user")
      .leftJoinAndMapMany(
        "user.staff",
        "staff",
        "staff",
        "staff.user = user.id AND staff.isActive = true"
      )
      .leftJoinAndMapOne(
        "staff.branch",
        "branch",
        "branch",
        "staff.branch = branch.id"
      )
      .where("user.email = :email", { email })
      .getOne()) as any;
  }

  async getAuthUserById(id: string): Promise<IAuthUser> {
    return (await this.dataSource
      .createQueryBuilder(User, "user")
      .leftJoinAndMapMany(
        "user.staff",
        "staff",
        "staff",
        "staff.user = user.id AND staff.isActive = true"
      )
      .leftJoinAndMapOne(
        "staff.branch",
        "branch",
        "branch",
        "staff.branch = branch.id"
      )
      .where("user.id = :id", { id })
      .getOne()) as any;
  }
}
