import { IsNotEmpty, IsString } from "class-validator";

export class RequeryTransferDTO {
  @IsString()
  @IsNotEmpty()
  reference: string;
}

export class RequeryTransactionDTO {
  @IsString()
  @IsNotEmpty()
  reference: string;
}

export class TransactionStatusDTO {
  @IsString()
  @IsNotEmpty()
  status: string;
}
