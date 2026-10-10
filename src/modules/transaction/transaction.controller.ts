import { Controller } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("transaction")
@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
}
