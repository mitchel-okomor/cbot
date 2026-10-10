import { Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { DeepPartial, Equal, In } from "typeorm";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User } from "../../database/entities";
import { CommonUtil } from "src/utils";
import { IAuthUser, ILoggedInUser } from "src/models/login-response-model";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async saveUser(user: DeepPartial<User>) {
    return await this.userRepository.save(this.userRepository.create(user));
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        email: Equal(email),
      });

      return user;
    } catch (error) {
      this.logger.error(
        "UserService :: getUserByEmail error %o",
        CommonUtil.getError(error)
      );
      return null;
    }
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneCache({
        phoneNumber: Equal(phoneNumber),
      });

      return user;
    } catch (error) {
      this.logger.error(
        "TaskService :: fetchUsers error %o",
        CommonUtil.getError(error)
      );
      return null;
    }
  }

  async fetchUsersByIds(ids: string[]): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    return user;
  }

  async updateUserProfile(
    user: User,
    updateUserDTO: UpdateUserDTO
  ): Promise<User> {
    await this.userRepository.update(
      { id: Equal(user.id) },
      { ...updateUserDTO }
    );

    return this.getUserById(user.id);
  }

  async getCachedUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneCache({ id: Equal(id) });

    return user;
  }

  async getUsersByIds(ids: string[]): Promise<User[]> {
    const users = await this.userRepository.find({ where: { id: In(ids) } });

    return users;
  }

  async getAuthUserByEmail(email: string): Promise<IAuthUser> {
    const users = await this.userRepository.getAuthUserByEmail(email);

    return users;
  }

  async getAuthUserById(id: string): Promise<ILoggedInUser> {
    const user = await this.userRepository.getAuthUserById(id);

    const mappedUser: ILoggedInUser = {
      id: user.id,
      createdAt: user.createdAt,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: (user as any).gender,
      dob: (user as any).dob,
      bio: (user as any).bio,
      address: (user as any).address,
      emailVerifiedAt: user.emailVerifiedAt,
      playerId: (user as any).playerId,
      imageUrl: user.imageUrl,
      skipTour: (user as any).skipTour,
      isActive: user.isActive,
    };

    return mappedUser;
  }
}
