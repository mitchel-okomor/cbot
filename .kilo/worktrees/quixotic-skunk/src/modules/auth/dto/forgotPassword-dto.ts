import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: "john@gmail.com",
    description: "Email address of the user",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
