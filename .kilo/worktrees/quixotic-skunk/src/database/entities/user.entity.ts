import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,

} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import * as bcrypt from 'bcryptjs';
import { ExchangeApiKey } from './exchange-api-key.entity';
import { NotificationSetting } from './notification-setting.entity';
import { Notification } from './notification.entity';
import { Trade } from './trade.entity';
import { Watchlist } from './watchlist.entity';
import { Device } from './device.entity';
import { ROLE } from 'src/enums';

export enum ONBOARDING_STEP {
  NOT_STARTED = 'NOT_STARTED',
  COMPLETED = 'COMPLETED',
}

@Entity('users')
export class User extends AbstractEntity<User> {
  @Column({ default: null, name: 'first_name' })
  firstName?: string;

  @Column({ default: null, name: 'last_name' })
  lastName?: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @BeforeInsert()
  normalizeEmail() {
    if (this.email) {
      this.email = this.email.trim().toLowerCase();
    }
  }

  @Column({ name: 'phone_number', unique: false, default: null })
  phoneNumber?: string;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role?: ROLE;

  @Column({ default: null, name: 'email_verified_at' })
  emailVerifiedAt?: Date;

  @Column({ default: null, name: 'image_url' })
  imageUrl?: string;

  @Column({ default: null })
  password: string;

  @Column({ default: false, type: Boolean, name: 'is_active' })
  isActive: boolean;

  @Column({ type: Boolean, default: false, name: 'is_locked' })
  isLocked: boolean;

  @Column({
    type: 'varchar',
    default: ONBOARDING_STEP.NOT_STARTED,
  })
  onboardingStep: string;

  @Column({ default: null, name: 'biometric_public_key' })
  publicKey: string;

  @Column({ type: Boolean, default: false, name: 'biometric_enabled' })
  biometricEnabled: boolean;

  @Column({ default: null, name: 'preferred_exchange' })
  preferredExchange: string;

  onboarded: boolean;

  @AfterLoad()
  setOnboarded() {
    this.onboarded = !!this.emailVerifiedAt;
  }

  @OneToMany(() => ExchangeApiKey, (key) => key.user)
  exchangeApiKeys: ExchangeApiKey[];

  @OneToMany(() => NotificationSetting, (setting) => setting.user)
  notificationSettings: NotificationSetting[];

  @OneToMany(() => Trade, (trade) => trade.user)
  trades: Trade[];

  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchlist: Watchlist[];

  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async isValidPassword(password: string): Promise<boolean> {
    try {
      const storedPassword = this.password || '';
      return await bcrypt.compare(password, storedPassword);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
