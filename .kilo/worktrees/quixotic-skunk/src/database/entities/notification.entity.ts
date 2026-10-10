import { Column, Entity, ManyToOne, JoinColumn, Index } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./user.entity";

export enum NOTIFICATION_TYPE {
  UNKNOWN = "UNKNOWN",
  REMINDER = "REMINDER",
  ALERT = "ALERT",
  LOW_STOCK = "LOW_STOCK",
}

@Entity("notifications")
export class Notification extends AbstractEntity<Notification> {
  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id" })
  userId: string;

  @Column({
    type: "enum",
    enum: NOTIFICATION_TYPE,
    default: NOTIFICATION_TYPE.UNKNOWN,
  })
  type: NOTIFICATION_TYPE;

  @Column({ name: "is_read", default: false })
  isRead: boolean;

  @Column({ type: "text", nullable: true })
  message: string;

  @Column({ type: "jsonb", nullable: true })
  data: any;
}
