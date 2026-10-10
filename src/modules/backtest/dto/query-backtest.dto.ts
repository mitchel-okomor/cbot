import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PageDTO } from "src/dto/common";

export class QueryBacktestDTO extends PageDTO {
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
    example: "My Backtest Run",
    description: "Filter by name",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}