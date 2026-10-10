import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';

@Entity('devices')
export class Device extends AbstractEntity<Device> {
  @ManyToOne(() => User, (user) => user.devices)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'device_token' })
  deviceToken: string;

  @Column({ name: 'device_type' })
  deviceType: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
