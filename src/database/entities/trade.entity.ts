import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';
import { Alert } from './alert.entity';
import { CONVICTION_LEVEL, EXCHANGE_PROVIDER, TRADE_STATUS } from 'src/enums';

@Entity('trades')
export class Trade extends AbstractEntity<Trade> {
  @ManyToOne(() => User, (user) => user.trades)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  symbol: string;

  @Column({ name: 'entry_price', type: 'decimal', precision: 20, scale: 8 })
  entryPrice: number;

  @Column({ name: 'current_price', type: 'decimal', precision: 20, scale: 8, nullable: true })
  currentPrice: number;

  @Column({ name: 'dca_level', default: 0 })
  dcaLevel: number;

  @Column({ name: 'total_invested', type: 'decimal', precision: 20, scale: 8 })
  totalInvested: number;

  @Column({ name: 'quantity', type: 'decimal', precision: 20, scale: 8 })
  quantity: number;

  @Column({ name: 'status', default: 'active' })
  status: TRADE_STATUS;

  @Column({ name: 'target_profit', type: 'decimal', precision: 5, scale: 2, default: 20 })
  targetProfit: number;

  @Column({ name: 'stop_loss', type: 'decimal', precision: 5, scale: 2, default: 20 })
  stopLoss: number;

  @Column({ name: 'trailing_stop', type: 'decimal', precision: 5, scale: 2, nullable: true })
  trailingStop: number;

  @Column({ name: 'exchange_provider', type: 'enum', enum: EXCHANGE_PROVIDER })
  exchangeProvider: EXCHANGE_PROVIDER;

  @Column({ name: 'conviction', type: 'varchar', default: 'MEDIUM' })
  conviction: CONVICTION_LEVEL;

  @Column({ name: 'reason', type: 'text', nullable: true })
  reason: string;

  @Column({ name: 'dca_levels', type: 'jsonb', nullable: true })
  dcaLevels: number[];

  @Column({ name: 'exit_reason', nullable: true })
  exitReason: string;

  @Column({ name: 'profit_amount', type: 'decimal', precision: 20, scale: 8, nullable: true })
  profitAmount: number;

  @Column({ name: 'profit_percentage', type: 'decimal', precision: 10, scale: 2, nullable: true })
  profitPercentage: number;

  @Column({ name: 'volume_24h', type: 'decimal', precision: 20, scale: 8, nullable: true })
  volume24h: number;

  @Column({ name: 'drop_percentage', type: 'decimal', precision: 10, scale: 2, nullable: true })
  dropPercentage: number;

  @Column({ name: 'support_level', type: 'decimal', precision: 20, scale: 8, nullable: true })
  supportLevel: number;

  @Column({ name: 'max_hold_days', default: 21 })
  maxHoldDays: number;

  @Column({ name: 'closed_at', nullable: true })
  closedAt: Date;

  @OneToMany(() => Alert, (alert) => alert.trade)
  alerts: Alert[];
}
