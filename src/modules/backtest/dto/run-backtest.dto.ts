import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, ValidateNested, IsObject, IsNumber, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class BacktestConfigDTO {
  @ApiProperty({
    example: "BTCUSDT",
    description: "Trading symbol",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @ApiProperty({
    example: "1h",
    description: "Timeframe",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  timeframe: string;

  @ApiProperty({
    example: 30,
    description: "Number of days to backtest",
    required: true,
    minimum: 1,
    maximum: 365,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Max(365)
  days: number;

  @ApiProperty({
    example: { stopLoss: 5, takeProfit: 10, dcaLevels: 3 },
    description: "Strategy configuration",
    required: true,
  })
  @IsNotEmpty()
  @IsObject()
  strategy: Record<string, any>;

  @ApiProperty({
    example: 10000,
    description: "Initial capital",
    required: false,
    default: 10000,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  initialCapital?: number;
}

export class RunBacktestDTO {
  @ApiProperty({
    example: "BTCUSDT Backtest - 30 days",
    description: "Name for this backtest run",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Backtest configuration",
    type: BacktestConfigDTO,
    required: true,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BacktestConfigDTO)
  config: BacktestConfigDTO;
}