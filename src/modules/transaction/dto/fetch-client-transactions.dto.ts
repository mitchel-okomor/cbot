import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PageDTO } from "src/dto";
import { PAYMENT_STATUS } from "src/enums/payment.enum";

export class FetchClientTransactionsDTO extends PageDTO {
  @ApiProperty({
    type: "String",
    description: "This is the status of the transaction",
    example: PAYMENT_STATUS.SUCCESS,
    required: false,
  })
  @IsString()
  @IsEnum(PAYMENT_STATUS)
  @IsOptional()
  @IsNotEmpty()
  status: PAYMENT_STATUS;
}
