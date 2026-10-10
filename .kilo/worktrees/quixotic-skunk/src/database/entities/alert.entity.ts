import { Column, Entity, ManyToOne, JoinColumn, Index } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./user.entity";
import { Trade } from "./trade.entity";

export enum ALERT_TYPE {
  PRICE_DROP = "PRICE_DROP",
  DCA = "DCA",
  EXIT = "EXIT",
  WATCHLIST = "WATCHLIST",
}

export enum ALERT_SEVERITY {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
}

@Entity("alerts")
export class Alert extends AbstractEntity<Alert> {
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id" })
  userId: string;

  @Column()
  symbol: string;

  @Column({ name: "type", type: "enum", enum: ALERT_TYPE })
  type: ALERT_TYPE;

  @Column({ type: "text" })
  message: string;

  @Column({
    name: "severity",
    type: "enum",
    enum: ALERT_SEVERITY,
    default: ALERT_SEVERITY.INFO,
  })
  severity: ALERT_SEVERITY;

  @Column({ name: "is_read", default: false })
  isRead: boolean;

  @Column({ name: "is_sent", default: false })
  isSent: boolean;

  @ManyToOne(() => Trade, (trade) => trade.alerts, { nullable: true })
  @JoinColumn({ name: "trade_id" })
  trade: Trade;

  @Column({ name: "metadata", type: "jsonb", nullable: true })
  metadata: Record<string, any>;
}
