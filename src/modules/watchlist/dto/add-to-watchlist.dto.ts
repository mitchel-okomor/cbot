import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class AddToWatchlistDTO {
  @ApiProperty({
    example: "BTCUSDT",
    description: "Trading symbol to watch",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @ApiProperty({
    example: 50000,
    description: "Entry price for the symbol",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  entryPrice?: number;

  @ApiProperty({
    example: 5,
    description: "Drop threshold percentage to trigger alert",
    required: false,
    minimum: 0.1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0.1)
  @Max(100)
  dropThreshold?: number;

  @ApiProperty({
    example: "Monitor for DCA opportunity",
    description: "Optional notes",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}