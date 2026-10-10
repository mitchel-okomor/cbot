import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ALERT_TYPE, ALERT_SEVERITY } from "../../../database/entities/alert.entity";

export class CreateAlertDTO {
  @ApiProperty({
    example: "BTCUSDT",
    description: "Trading symbol",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @ApiProperty({
    example: ALERT_TYPE.PRICE_DROP,
    description: "Alert type",
    enum: ALERT_TYPE,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  type: ALERT_TYPE;

  @ApiProperty({
    example: "Price dropped 10% in 24h",
    description: "Alert message",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    example: ALERT_SEVERITY.WARNING,
    description: "Alert severity",
    enum: ALERT_SEVERITY,
    required: false,
  })
  @IsOptional()
  @IsString()
  severity?: ALERT_SEVERITY;

  @ApiProperty({
    example: { price: 45000, drop: 10 },
    description: "Additional metadata",
    required: false,
  })
  @IsOptional()
  metadata?: Record<string, any>;
}

export class MarkAlertReadDTO {
  @ApiProperty({
    example: "alert-id",
    description: "Alert ID to mark as read",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
