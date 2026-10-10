import { Transform } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ROLE } from "src/enums";

export class RegisterUserDTO {
  @ApiProperty({
    example: "John",
    description: "User's firstName",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: "Doe",
    description: "User's lastName",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: "john@gmail.com",
    description: "Email address of the user",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @ApiProperty({
    example: "09087678253",
    description: "User valid phone number",
    type: String,
    required: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber: string;

  @ApiProperty({
    example: "Password@1",
    description: "User's password",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: "22l jump street",
    description: "This is the staff address",
    type: String,
    required: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address: string;
}
