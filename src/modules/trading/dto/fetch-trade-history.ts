import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNotEmpty, IsEnum } from "class-validator";
import { PageDTO } from "src/dto/common/page.dto";
import { TRADE_STATUS } from "src/enums";

export class FetchTradesDTO extends PageDTO {
  @ApiProperty({
    example: TRADE_STATUS.ACTIVE,
    description: "This is the trade status",
    type: String,
    required: false,
    enum: TRADE_STATUS,
  })
  @IsOptional()
  @IsEnum(TRADE_STATUS)
  @IsNotEmpty()
  status: TRADE_STATUS;
}
