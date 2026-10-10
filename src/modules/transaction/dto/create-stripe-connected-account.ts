import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStripeConnectedAccountDto {
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  account: string;
}
