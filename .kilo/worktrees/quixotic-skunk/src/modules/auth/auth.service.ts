import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import { LoginDTO, ResendVerificationDTO } from "./dto/login.dto";
import { ResetPasswordDTO } from "./dto/resetPassword-dto";
import { UserService } from "../user/users.service";
import { ConfigService } from "@nestjs/config";
import { CommonUtil } from "src/utils";
import { RegisterUserDTO } from "./dto/register.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EMAIL_NOTIFICATION_EVENTS } from "src/enums";
import { IForgotPasswordEMAIL, IOtpEMAIL } from "src/interfaces";
import { VerifyOTP } from "./dto/verifyOTP-dto";
import { ForgotPasswordDTO } from "./dto/forgotPassword-dto";
import * as bcrypt from "bcryptjs";
import { UpdatePasswordDTO } from "../user/dto/security-settings.dto";
import { User } from "src/database/entities";

@Injectable()
export class AuthService {
  private readonly jwtExpiresIn: string;
  private readonly jwtSecretKey: string;
  private readonly webUrl: string;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService
  ) {
    this.jwtSecretKey = this.configService.getOrThrow("JWT_SECRET");
    this.jwtExpiresIn = this.configService.getOrThrow("JWT_EXPIRES_IN");
    this.webUrl = this.configService.getOrThrow("WEB_APP_BASE_URL");
  }

  async register(payload: RegisterUserDTO) {
    try {
      const phoneNumberExist = await this.userService.getUserByPhoneNumber(
        payload.phoneNumber
      );

      if (phoneNumberExist) {
        throw new HttpException(
          `Phone Number already exist`,
          HttpStatus.BAD_REQUEST
        );
      }

      const emailExist = await this.userService.getUserByEmail(payload.email);

      if (emailExist) {
        if (!emailExist.emailVerifiedAt) {
          throw new HttpException(
            `Email: ${payload.email} already exist please verify your email`,
            HttpStatus.EXPECTATION_FAILED
          );
        }

        throw new HttpException(
          `Email already exist please login`,
          HttpStatus.BAD_REQUEST
        );
      }

      this.validatePassword(payload.password);

      const user = await this.userService.saveUser(payload);
      const code = CommonUtil.randomInt(4);

      const OTPToken = await CommonUtil.generateToken(
        {
          email: user.email,
          id: user.id,
          code,
        },
        this.jwtExpiresIn,
        this.jwtSecretKey
      );

      const emailData: IOtpEMAIL = {
        email: user.email,
        code,
        name: user.firstName,
      };

      this.eventEmitter.emit(EMAIL_NOTIFICATION_EVENTS.OTP_EMAIL, emailData);

      delete user.password;
      return { user: user, token: OTPToken };
    } catch (error) {
      console.error("authservice :: register error \n %o", error);

      throw error;
    }
  }

  async login(payload: LoginDTO) {
    try {
      this.logger.log("AuthService :: login ", payload);

      const user = await this.userService.getUserByEmail(payload.email);

      if (!user || user?.deletedAt)
        throw new HttpException(
          `User with email: ${payload.email} does not exist`,
          HttpStatus.BAD_REQUEST
        );

      const isValid = await user.isValidPassword(payload.password);

      if (!isValid) {
        throw new HttpException(
          "Incorrect email or password",
          HttpStatus.BAD_REQUEST
        );
      }

      const token = await CommonUtil.generateToken(
        { id: user.id },
        this.jwtExpiresIn,
        this.jwtSecretKey
      );

      delete user.password;

      return { user, token };
    } catch (error) {
      this.logger.error(
        "AuthService :: loginAuth error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async forgotPassword(payload: ForgotPasswordDTO) {
    try {
      const user = await this.userService.getUserByEmail(
        payload.email?.toLowerCase()
      );

      if (!user) {
        throw new HttpException(
          `User with Email ${payload.email} not found`,
          HttpStatus.BAD_REQUEST
        );
      }

      const code = CommonUtil.randomInt(4);

      const OTPToken = await CommonUtil.generateToken(
        {
          email: user.email,
          id: user.id,
          code,
        },
        this.jwtExpiresIn,
        this.jwtSecretKey
      );

      const url = `${this.webUrl}/reset-password?token=${OTPToken}`;

      const emailData: IForgotPasswordEMAIL = {
        email: user.email,
        url,
        name: user.firstName,
      };

      this.eventEmitter.emit(
        EMAIL_NOTIFICATION_EVENTS.FORGOT_PASSWORD_EMAIL,
        emailData
      );
      delete user.password;
      return { user: user, token: OTPToken, code };
    } catch (error) {
      this.logger.error(
        "AuthService :: forgotPassword error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async resetPassword(payload: ResetPasswordDTO) {
    try {
      const data = await CommonUtil.verifyToken(
        payload.token,
        this.jwtSecretKey
      ).catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });

      if (!data)
        throw new HttpException("Invalid Token", HttpStatus.BAD_REQUEST);

      const user = await this.userService.getUserById(data.id);
      if (!user || user.deletedAt)
        throw new HttpException("Invalid User", HttpStatus.BAD_REQUEST);

      const oldPassword = await user.isValidPassword(payload.password);

      if (oldPassword)
        throw new HttpException(
          "Please choose a password that you have not used before",
          HttpStatus.BAD_REQUEST
        );
      const salt = await bcrypt.genSalt();

      return this.userService.updateUserProfile(user as unknown as User, {
        password: await bcrypt.hash(payload.password, salt),
      });
    } catch (error) {
      this.logger.error(
        "AuthService :: reset password error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async refreshToken(userId: any) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user)
        throw new HttpException("User not  found", HttpStatus.NOT_FOUND);
      const token = await CommonUtil.generateToken(
        { id: user.id },
        this.jwtExpiresIn,
        this.jwtSecretKey
      );
      return { user, token };
    } catch (error) {
      this.logger.error(
        "AuthService :: refreshToken error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async verifyAccount(payload: VerifyOTP) {
    try {
      const data = await this.verifyCode(payload);
      const userExist = await this.userService.getUserById(data.id);
      if (!userExist) {
        throw new HttpException("Invalid User", HttpStatus.BAD_REQUEST);
      }

      await this.userService.updateUserProfile(userExist as unknown as User, {
        emailVerifiedAt: new Date(),
      });

      const token = await CommonUtil.generateToken(
        { id: userExist.id },
        this.jwtExpiresIn,
        this.jwtSecretKey
      );

      delete userExist.password;

      return { user: userExist, token };
    } catch (error) {
      this.logger.error(
        "AuthService :: verifyAccount error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async resendVerification(payload: ResendVerificationDTO) {
    try {
      const user = await this.userService.getUserByEmail(payload.email);

      if (!user) {
        throw new HttpException(
          `User with Email ${payload.email} not found`,
          HttpStatus.BAD_REQUEST
        );
      }

      if (user.emailVerifiedAt) {
        throw new HttpException(
          `User already verified`,
          HttpStatus.BAD_REQUEST
        );
      }

      const code = CommonUtil.randomInt(4);

      const OTPToken = await CommonUtil.generateToken(
        {
          email: user.email,
          id: user.id,
          code,
        },
        this.jwtExpiresIn,
        this.jwtSecretKey
      );
      const emailData: IOtpEMAIL = {
        email: user.email,
        code,
        name: user.firstName,
      };

      this.eventEmitter.emit(EMAIL_NOTIFICATION_EVENTS.OTP_EMAIL, emailData);

      delete user.password;
      return { user: user, token: OTPToken, code };
    } catch (error) {
      this.logger.error(
        "AuthService :: resendVerification error %o",
        CommonUtil.getError(error)
      );

      throw error;
    }
  }

  async updatePassword(authUser: User, updatePasswordDTO: UpdatePasswordDTO) {
    const user = await this.userService.getUserById(authUser.id);

    const isValid = await user.isValidPassword(
      updatePasswordDTO.currentPassword
    );

    if (!isValid) {
      throw new BadRequestException("Password is incorrect");
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(updatePasswordDTO.newPassword, salt);
    const updatedUser = await this.userService.updateUserProfile(authUser, {
      password,
    });

    return updatedUser;
  }

  private validatePassword(password: string): void {
    const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!pattern.test(password)) {
      throw new HttpException(
        "Password must be 8-16 characters, contain at least one uppercase letter, one lowercase letter, one digit, one special character, and no spaces.",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async verifyCode(payload: VerifyOTP): Promise<{ id: string }> {
    const data = await CommonUtil.verifyToken(
      payload.token,
      this.jwtSecretKey
    ).catch(async (err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });

    if (!data) {
      throw new HttpException("Invalid Token", HttpStatus.BAD_REQUEST);
    }

    if (data.code.toString() !== payload.code.toString()) {
      throw new HttpException("Code is incorrect", HttpStatus.BAD_REQUEST);
    }

    return data;
  }
}
