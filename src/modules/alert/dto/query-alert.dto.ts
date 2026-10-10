import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { PageDTO } from "src/dto/common";
import { ALERT_TYPE, ALERT_SEVERITY } from "src/enums/common.enum";

export class QueryAlertDTO extends PageDTO {
  @ApiProperty({
    example: true,
    description: "Filter by read status",
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiProperty({
    example: "BTCUSDT",
    description: "Filter by symbol",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiProperty({
    example: ALERT_TYPE.PRICE_DROP,
    description: "Filter by alert type",
    enum: ALERT_TYPE,
    required: false,
  })
  @IsOptional()
  @IsEnum(ALERT_TYPE)
  type?: ALERT_TYPE;

  @ApiProperty({
    example: ALERT_SEVERITY.CRITICAL,
    description: "Filter by severity",
    enum: ALERT_SEVERITY,
    required: false,
  })
  @IsOptional()
  @IsEnum(ALERT_SEVERITY)
  severity?: ALERT_SEVERITY;
}