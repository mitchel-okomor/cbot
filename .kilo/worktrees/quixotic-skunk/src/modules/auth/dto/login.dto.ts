import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {
  @ApiProperty({
    example: "johndoe@pp.com",
    description: "Email address of the user",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase())
  email?: string;

  @ApiProperty({
    example: "Password@1",
    description: "User valid phone number",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ResendVerificationDTO {
  @ApiProperty({
    example: "mitchel.okomor@gmail.com",
    description: "Email address of the user",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;
}
