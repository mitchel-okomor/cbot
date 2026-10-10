import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ROLE } from 'src/enums';

export class UpdateUserDTO {
  @ApiProperty({
    example:
      'https://ibloov-api-storage.nyc3.digitaloceanspaces.com/artists/original/tiwa.jpg',
    description: 'Url of the uploaded user image',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    example: 'John Doe',
    description: "User's full name",
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @ApiProperty({
    example: 'John Doe',
    description: "User's full name",
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: '22 jump street',
    description: 'The address of the user',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'd47a8fb6-94df-43c7-8479-0e61bef90777',
    description: 'This is the player id of the user',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  playerId?: string;

  @ApiProperty({
    example: 'Developer',
    description: 'This is the position of the user',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  position?: string;

  @ApiProperty({
    example: '2023-01-11T13:53:04.057Z',
    description: "User's date of birth in ISO format",
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  dob?: Date;

  @ApiProperty({
    example: true,
    description: 'Read status of the notification',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  skipTour?: boolean;

  password?: string;

  emailVerifiedAt?: Date;

  isSuggested?: boolean;

  role?: ROLE;
}
