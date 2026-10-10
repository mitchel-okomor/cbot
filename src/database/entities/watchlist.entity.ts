import { Column, Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';

@Entity('watchlist')
@Index(['symbol', 'userId'], { unique: true })
export class Watchlist extends AbstractEntity<Watchlist> {
  @ManyToOne(() => User, (user) => user.watchlist)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  symbol: string;

  @Column({ name: 'entry_price', type: 'decimal', precision: 20, scale: 8, nullable: true })
  entryPrice: number;

  @Column({ name: 'drop_threshold', type: 'decimal', precision: 5, scale: 2, nullable: true })
  dropThreshold: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
