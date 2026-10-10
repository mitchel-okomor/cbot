import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TIMEFRAME } from "src/enums";

export class GetAnalyticsDTO {
  @ApiProperty({
    example: "BTCUSDT",
    description: "Filter by symbol",
    required: false,
  })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiProperty({
    example: TIMEFRAME.ONE_DAY,
    description: "Timeframe for chart data",
    enum: TIMEFRAME,
    required: false,
  })
  @IsOptional()
  @IsEnum(TIMEFRAME)
  timeframe?: TIMEFRAME;

  @ApiProperty({
    example: 30,
    description: "Number of days for historical data",
    required: false,
    default: 30,
  })
  @IsOptional()
  days?: number;
}

export class GetRiskDTO {
  @ApiProperty({
    example: "BTCUSDT",
    description: "Symbol to get risk for",
    required: false,
  })
  @IsOptional()
  @IsString()
  symbol?: string;
}