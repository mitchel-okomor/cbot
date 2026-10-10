import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyOTP {
  @ApiProperty({
    example: '123456',
    description: 'This is the code gotten from the auth app',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toString())
  @IsString()
  code: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9rb21vcm1pdGNoZWxAZ21haWwuY29tIiwiaWQiOiI2NmM3YWZmNGQwYTZiMmM5YjZhYjdjNTYiLCJjb2RlIjoiNjk4MiIsImlhdCI6MTcyNDQzNzEzMywiZXhwIjoxNzI1MDQxOTMzfQ.zG0aeWPv2bpgL8jeRSjAGSIASdS47BGHAKoMHSXSats',
    description: 'The is the otp token',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
