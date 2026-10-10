import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';

export enum NOTIFICATION_CHANNEL {
  IN_APP = 'IN_APP',
  PUSH = 'PUSH',
  EMAIL = 'EMAIL',
  TELEGRAM = 'TELEGRAM',
}

export enum NOTIFICATION_EVENT {
  TRADE_ENTRY = 'TRADE_ENTRY',
  TRADE_EXIT = 'TRADE_EXIT',
  DCA_EXECUTED = 'DCA_EXECUTED',
  PRICE_DROP = 'PRICE_DROP',
  WATCHLIST_TRIGGER = 'WATCHLIST_TRIGGER',
  STOP_LOSS = 'STOP_LOSS',
  TAKE_PROFIT = 'TAKE_PROFIT',
  DAILY_SUMMARY = 'DAILY_SUMMARY',
  WEEKLY_REPORT = 'WEEKLY_REPORT',
}

@Entity('notification_settings')
export class NotificationSetting extends AbstractEntity<NotificationSetting> {
  @ManyToOne(() => User, (user) => user.notificationSettings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: NOTIFICATION_EVENT,
    name: 'event',
  })
  event: NOTIFICATION_EVENT;

  @Column({
    type: 'enum',
    enum: NOTIFICATION_CHANNEL,
    name: 'channel',
  })
  channel: NOTIFICATION_CHANNEL;

  @Column({ name: 'is_enabled', default: true })
  isEnabled: boolean;

  @Column({ name: 'push_token', nullable: true })
  pushToken: string;

  @Column({ name: 'telegram_chat_id', nullable: true })
  telegramChatId: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'metadata', type: 'jsonb', nullable: true })
  metadata: {
    minimumProfit?: number;
    maximumDrawdown?: number;
    symbols?: string[];
  };
}
