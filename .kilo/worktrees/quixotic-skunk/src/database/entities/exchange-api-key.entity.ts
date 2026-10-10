import { Column, Entity, ManyToOne, JoinColumn, Index } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./user.entity";
import { EXCHANGE_PROVIDER } from "src/enums";

@Entity("exchange_api_keys")
@Index(["userId", "provider"], { unique: true })
export class ExchangeApiKey extends AbstractEntity<ExchangeApiKey> {
  @ManyToOne(() => User, (user) => user.exchangeApiKeys)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id" })
  userId: string;

  @Column({
    type: "enum",
    enum: EXCHANGE_PROVIDER,
    name: "provider",
  })
  provider: EXCHANGE_PROVIDER;

  @Column({ name: "api_key" })
  apiKey: string;

  @Column({ name: "api_secret" })
  apiSecret: string;

  @Column({ name: "api_passphrase", nullable: true })
  apiPassphrase: string;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @Column({ name: "is_primary", default: false })
  isPrimary: boolean;

  @Column({
    name: "permissions",
    type: "jsonb",
    default: { trade: true, read: true },
  })
  permissions: {
    trade: boolean;
    read: boolean;
    withdraw: boolean;
  };

  @Column({ name: "last_used_at", nullable: true })
  lastUsedAt: Date;

  @Column({ name: "expires_at", nullable: true })
  expiresAt: Date;

  @Column({ name: "metadata", type: "jsonb", nullable: true })
  metadata: {
    ipRestrictions?: string[];
    maxPositionSize?: number;
    allowedSymbols?: string[];
  };
}
