import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity('backtest_results')
export class BacktestResult extends AbstractEntity<BacktestResult> {
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'config', type: 'jsonb' })
  config: Record<string, any>;

  @Column({ name: 'results', type: 'jsonb' })
  results: Record<string, any>;

  @Column({ name: 'metrics', type: 'jsonb' })
  metrics: Record<string, any>;
}
