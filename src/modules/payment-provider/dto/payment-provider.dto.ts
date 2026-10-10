import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from "class-validator";
import { Type } from "class-transformer";
import { PAYMENT_PROVIDER, PAYMENT_MODE, PAYMENT_CHANNEL } from "src/enums";

export class ConfigurePaymentProviderDTO {
  @ApiProperty({
    example: PAYMENT_PROVIDER.STRIPE,
    description: "Payment provider to configure",
    enum: PAYMENT_PROVIDER,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(PAYMENT_PROVIDER)
  provider: PAYMENT_PROVIDER;

  @ApiProperty({
    example: true,
    description: "Enable this provider",
    required: false,
    default: true,
  })
  @IsOptional()
  enabled?: boolean;

  @ApiProperty({
    example: "sk_test_...",
    description: "API secret key",
    required: false,
  })
  @IsOptional()
  @IsString()
  secretKey?: string;

  @ApiProperty({
    example: "pk_test_...",
    description: "API public key",
    required: false,
  })
  @IsOptional()
  @IsString()
  publicKey?: string;

  @ApiProperty({
    example: "whsec_...",
    description: "Webhook secret",
    required: false,
  })
  @IsOptional()
  @IsString()
  webhookSecret?: string;

  @ApiProperty({
    example: { currency: "USD", minAmount: 100 },
    description: "Provider-specific configuration",
    required: false,
  })
  @IsOptional()
  config?: Record<string, any>;
}

export class GeneratePaymentLinkDTO {
  @ApiProperty({
    example: 5000,
    description: "Amount in smallest currency unit (e.g., cents for USD)",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  amount: number;

  @ApiProperty({
    example: "USD",
    description: "Currency code",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({
    example: "order-12345",
    description: "Client reference for this payment",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  client_reference: string;

  @ApiProperty({
    example: "https://example.com/callback",
    description: "Callback URL after payment",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  call_back_url: string;

  @ApiProperty({
    example: PAYMENT_PROVIDER.STRIPE,
    description: "Payment provider to use",
    enum: PAYMENT_PROVIDER,
    required: false,
  })
  @IsOptional()
  @IsEnum(PAYMENT_PROVIDER)
  provider?: PAYMENT_PROVIDER;

  @ApiProperty({
    example: PAYMENT_MODE.PAYMENT,
    description: "Payment mode",
    enum: PAYMENT_MODE,
    required: false,
    default: PAYMENT_MODE.PAYMENT,
  })
  @IsOptional()
  @IsEnum(PAYMENT_MODE)
  mode?: PAYMENT_MODE;

  @ApiProperty({
    example: PAYMENT_CHANNEL.PAYMENT_LINK,
    description: "Payment channel",
    enum: PAYMENT_CHANNEL,
    required: false,
    default: PAYMENT_CHANNEL.PAYMENT_LINK,
  })
  @IsOptional()
  @IsEnum(PAYMENT_CHANNEL)
  channel?: PAYMENT_CHANNEL;

  @ApiProperty({
    example: "+2348012345678",
    description: "Customer phone number",
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({
    example: { orderId: "order-12345", items: ["item1", "item2"] },
    description: "Additional metadata",
    required: false,
  })
  @IsOptional()
  meta?: Record<string, any>;
}

export class QueryPaymentProvidersDTO {
  @ApiProperty({
    example: true,
    description: "Filter by enabled status",
    required: false,
  })
  @IsOptional()
  enabled?: boolean;
}