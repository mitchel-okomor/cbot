import { Column, Entity, Index } from "typeorm";
import { AbstractEntity } from "..";

@Entity()
export class TransactionErrorLog extends AbstractEntity<TransactionErrorLog> {
  @Index()
  @Column("decimal", { precision: 12, scale: 2, nullable: true })
  amount: number;

  @Index()
  @Column({ nullable: true, name: "tnx_id" })
  tnxId: string;

  @Index()
  @Column({ unique: true })
  reference: string;

  @Index()
  @Column({ nullable: true })
  reason: string;

  @Column({ default: 0 })
  retries: number;

  @Column({ type: "text", nullable: true })
  data?: string;

  @Column({ type: "text", nullable: true })
  error?: string;

  @Column({ type: "text", nullable: true })
  processor?: string;
}
