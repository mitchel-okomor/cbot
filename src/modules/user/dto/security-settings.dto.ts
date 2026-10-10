import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SetTransactionPinDTO {
  @ApiProperty({
    example: '1234',
    description: 'Four digit user pin',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  @IsNumberString()
  pin: string;
}

export class UpdateTransactionPinDTO {
  @ApiProperty({
    example: '1234',
    description: `Four digit current user's pin`,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  @IsNumberString()
  currentPin: string;

  @ApiProperty({
    example: '1234',
    description: `Four digit new pin`,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  @IsNumberString()
  newPin: string;
}

export class UpdatePasswordDTO {
  @ApiProperty({
    example: '0ldP@assw0rd',
    description: `User's current password.`,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({
    example: 'n3wP@ssw0rd',
    description: `User's new password.`,
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  newPassword: string;
}
