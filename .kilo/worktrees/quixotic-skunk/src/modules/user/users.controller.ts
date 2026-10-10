import { Body, Controller, Get, Patch, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./users.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { FetchUserResponse } from "./dto/user-response.dto";
import { ResponseModel } from "../../models/response-model";
import { Serialize } from "../../interceptors";
import { IAuthenticatedReq } from "src/interfaces";
@Controller("user")
@ApiTags("User")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "Update user profile",
    type: "",
  })
  @Patch("/profile")
  async updateUserProfile(
    @Req() req: IAuthenticatedReq,
    @Body() updateUserDTO: UpdateUserDTO
  ) {
    const response = await this.usersService.updateUserProfile(
      req.user,
      updateUserDTO
    );
    return ResponseModel.success("Request successful", response);
  }

  @Serialize(FetchUserResponse)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "Fetch user profile",
    type: "",
  })
  @Get("/profile")
  async getUserProfile(@Req() req: IAuthenticatedReq) {
    const response = await this.usersService.getUserById(req.user.id);
    return ResponseModel.success("Request successful", response);
  }
}
