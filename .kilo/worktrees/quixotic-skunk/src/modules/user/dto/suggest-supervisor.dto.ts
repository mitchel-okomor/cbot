import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class SuggestSupervisorDTO {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'Email address of the user',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  firstName?: string;

  lastName?: string;
}
