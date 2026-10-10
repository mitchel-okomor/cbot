import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export interface IConfigData {
  public_key?: string;
  secret_key?: string;
  api_key?: string;
  redirect_url?: string;
}

export class IConfigData implements IConfigData {
  public_key?: string;
  secret_key?: string;
  api_key?: string;
  redirect_url?: string;
}

export class GeneratePaymentLinkDto {
  @IsNotEmpty()
  @Min(1)
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(3)
  currency: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  client_reference?: string;

  @IsOptional()
  @IsString()
  call_back_url?: string;

  @IsOptional()
  meta?: Record<string, any>;

  config_data?: IConfigData = null;
}
