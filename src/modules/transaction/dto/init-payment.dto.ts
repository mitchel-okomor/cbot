import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, Min } from "class-validator";
import { PAYMENT_PROVIDER } from "src/enums/payment.enum";

export class InitiatePaymentDto {
  @IsNotEmpty()
  @Min(1)
  amount: any;

  @IsOptional()
  initiator?: any;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  identifier: any;

  @IsOptional()
  phone_number?: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty()
  client_reference?: string;

  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @IsEnum(PAYMENT_PROVIDER)
  processor?: PAYMENT_PROVIDER;

  @IsOptional()
  meta?: Record<string, any>;
}
