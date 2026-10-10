import { Column, Entity } from "typeorm";
import { AbstractEntity } from "..";
import {
  PAYMENT_METHOD,
  PAYMENT_PROVIDER,
  PAYMENT_STATUS,
} from "src/enums/payment.enum";
import { ColumnNumericTransformer } from "src/helpers";

@Entity()
export class Transaction extends AbstractEntity<Transaction> {
  @Column("decimal", {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column("decimal", {
    precision: 12,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  discount: number;

  @Column({ type: "text" })
  currency: string;

  @Column({ unique: true })
  reference: string;

  @Column({ default: null })
  accountNumber: string;

  @Column({ type: "text", nullable: true, default: null })
  request: string;

  @Column({ type: "text", nullable: true })
  response: string;

  @Column({
    type: "enum",
    enum: PAYMENT_STATUS,
  })
  status: PAYMENT_STATUS;

  @Column({
    type: "enum",
    enum: PAYMENT_METHOD,
    name: "payment_method",
  })
  paymentMethod: string;

  @Column({
    type: "enum",
    enum: PAYMENT_PROVIDER,
  })
  processor: string;

  @Column({ type: "text", nullable: true })
  meta: string;
}
