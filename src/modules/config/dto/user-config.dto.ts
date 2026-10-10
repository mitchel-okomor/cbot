import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsObject, IsOptional, IsString, Min, Max, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { TIMEFRAME, EXCHANGE_PROVIDER } from "src/enums";

export class TradingConfigDTO {
  @ApiProperty({
    example: true,
    description: "Enable automated trading",
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  autoTrade?: boolean;

  @ApiProperty({
    example: EXCHANGE_PROVIDER.BINANCE,
    description: "Preferred exchange",
    enum: EXCHANGE_PROVIDER,
    required: false,
  })
  @IsOptional()
  @IsEnum(EXCHANGE_PROVIDER)
  preferredExchange?: EXCHANGE_PROVIDER;

  @ApiProperty({
    example: 200,
    description: "Base position size in USDT",
    required: false,
    minimum: 10,
    maximum: 100000,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(10)
  @Max(100000)
  basePositionSize?: number;

  @ApiProperty({
    example: 20,
    description: "Take profit percentage",
    required: false,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  targetProfit?: number;

  @ApiProperty({
    example: 20,
    description: "Stop loss percentage",
    required: false,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  stopLoss?: number;

  @ApiProperty({
    example: 3,
    description: "Max DCA levels",
    required: false,
    minimum: 0,
    maximum: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(10)
  maxDcaLevels?: number;

  @ApiProperty({
    example: 5,
    description: "DCA drop percentage spacing",
    required: false,
    minimum: 0.5,
    maximum: 50,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0.5)
  @Max(50)
  dcaSpacing?: number;

  @ApiProperty({
    example: 50000,
    description: "Minimum 24h volume filter",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minVolume?: number;

  @ApiProperty({
    example: 500000,
    description: "Maximum 24h volume filter",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxVolume?: number;

  @ApiProperty({
    example: 10,
    description: "Drop threshold percentage for entry",
    required: false,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  dropThreshold?: number;

  @ApiProperty({
    example: 15,
    description: "Maximum active trades",
    required: false,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  maxActiveTrades?: number;
}

export class NotificationConfigDTO {
  @ApiProperty({
    example: true,
    description: "Enable email notifications",
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  emailEnabled?: boolean;

  @ApiProperty({
    example: true,
    description: "Enable push notifications",
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  pushEnabled?: boolean;

  @ApiProperty({
    example: true,
    description: "Enable Telegram notifications",
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  telegramEnabled?: boolean;

  @ApiProperty({
    example: ["TRADE_ENTRY", "TRADE_EXIT", "DCA_EXECUTED"],
    description: "Events to notify for",
    required: false,
  })
  @IsOptional()
  @IsObject()
  events?: string[];
}

export class RiskConfigDTO {
  @ApiProperty({
    example: 50000,
    description: "Maximum total exposure in USDT",
    required: false,
    minimum: 1000,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1000)
  maxTotalExposure?: number;

  @ApiProperty({
    example: 0.1,
    description: "Max position size as percentage of portfolio",
    required: false,
    minimum: 0.01,
    maximum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0.01)
  @Max(1)
  maxPositionPercent?: number;

  @ApiProperty({
    example: 3,
    description: "Max daily loss percentage",
    required: false,
    minimum: 0.5,
    maximum: 50,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0.5)
  @Max(50)
  maxDailyLossPercent?: number;
}

export class UpdateUserConfigDTO {
  @ApiProperty({
    description: "Trading configuration",
    type: TradingConfigDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TradingConfigDTO)
  trading?: TradingConfigDTO;

  @ApiProperty({
    description: "Notification configuration",
    type: NotificationConfigDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationConfigDTO)
  notifications?: NotificationConfigDTO;

  @ApiProperty({
    description: "Risk configuration",
    type: RiskConfigDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RiskConfigDTO)
  risk?: RiskConfigDTO;
}

export class GetConfigDTO {
  @ApiProperty({
    example: "trading",
    description: "Config section to retrieve",
    required: false,
    enum: ["trading", "notifications", "risk", "all"],
  })
  @IsOptional()
  @IsString()
  @IsEnum(["trading", "notifications", "risk", "all"])
  section?: "trading" | "notifications" | "risk" | "all";
}