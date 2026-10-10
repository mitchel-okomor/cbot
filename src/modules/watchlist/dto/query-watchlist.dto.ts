import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { PageDTO } from "src/dto/common";

export class QueryWatchlistDTO extends PageDTO {
  @ApiProperty({
    example: true,
    description: "Filter by active status",
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: "BTCUSDT",
    description: "Filter by symbol",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  symbol?: string;
}