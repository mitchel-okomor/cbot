import { Body, Controller, Inject, Patch, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO, ResendVerificationDTO } from "./dto/login.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseModel } from "src/models/response-model";
import { RegisterUserDTO } from "./dto/register.dto";
import { VerifyOTP } from "./dto/verifyOTP-dto";
import { ForgotPasswordDTO } from "./dto/forgotPassword-dto";
import { ResetPasswordDTO } from "./dto/resetPassword-dto";
import { UpdatePasswordDTO } from "../user/dto/security-settings.dto";
import { IAuthenticatedReq } from "src/interfaces";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() payload: LoginDTO) {
    const response = await this.authService.login(payload);
    return ResponseModel.success("login successful", response);
  }

  @Post("/signup")
  async signUp(@Body() payload: RegisterUserDTO) {
    const response = await this.authService.register(payload);
    return ResponseModel.success("successful", response);
  }

  @Post("/verify-account")
  async verifyAccount(@Body() payload: VerifyOTP) {
    const response = await this.authService.verifyAccount(payload);
    return ResponseModel.success("successful", response);
  }

  @Post("/resend-verification")
  async resendVerification(@Body() payload: ResendVerificationDTO) {
    const response = await this.authService.resendVerification(payload);
    return ResponseModel.success("successful", response);
  }

  @Post("/password/forgot")
  async forgotPassword(@Body() payload: ForgotPasswordDTO) {
    const response = await this.authService.forgotPassword(payload);
    return ResponseModel.success("successful", response);
  }

  @Post("/password/reset")
  async resetPassword(@Body() payload: ResetPasswordDTO) {
    const response = await this.authService.resetPassword(payload);
    return ResponseModel.success("successful", response);
  }

  @ApiBearerAuth()
  @Patch("/update-password")
  async updatePassword(
    @Body() updatePasswordDTO: UpdatePasswordDTO,
    @Req() req: IAuthenticatedReq
  ) {
    await this.authService.updatePassword(req.user, updatePasswordDTO);
    return ResponseModel.success("Password updated successfully");
  }
}
