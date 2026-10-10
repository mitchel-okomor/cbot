import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
// import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResetPasswordDTO {
  @ApiProperty({
    example: "hello@!#23",
    description: "User's new password",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  // @ApiProperty({
  //   example: "1234",
  //   description:
  //     "The otp code that was sent to the user's email when a forgot password request was initiated",
  //   type: String,
  //   required: true,
  // })
  // @IsNotEmpty()
  // @IsNumber()
  // @Type(() => Number)
  // code: number;

  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9rb21vcm1pdGNoZWxAZ21haWwuY29tIiwiaWQiOiI2NmM3YWZmNGQwYTZiMmM5YjZhYjdjNTYiLCJjb2RlIjoiNjk4MiIsImlhdCI6MTcyNDQzNzEzMywiZXhwIjoxNzI1MDQxOTMzfQ.zG0aeWPv2bpgL8jeRSjAGSIASdS47BGHAKoMHSXSats",
    description: "The is the otp token",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
