import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import {
  PAYMENT_CHANNEL,
  PAYMENT_PROVIDER,
  PAYMENT_STATUS,
} from "src/enums/payment.enum";

export class CreateTransactionDto {
  @IsNotEmpty()
  reference: string;

  @IsNotEmpty()
  client_reference: string;

  @IsNotEmpty()
  @IsOptional()
  identifier?: string;

  @IsOptional()
  phone_number?: string;

  @IsNotEmpty()
  request: string;

  @IsNotEmpty()
  response?: string;

  @IsEnum(PAYMENT_STATUS)
  @IsNotEmpty()
  status: PAYMENT_STATUS;

  @IsEnum(PAYMENT_CHANNEL)
  @IsNotEmpty()
  payment_mode: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsEnum(PAYMENT_PROVIDER)
  @IsOptional()
  processor: string;

  @IsOptional()
  meta?: string;

  paymentRef?: string;

  payment_link?: string;
}
