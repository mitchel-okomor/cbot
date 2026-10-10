import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExchangeApiKey, User } from "src/database/entities";
import { EXCHANGE_PROVIDER } from "src/enums";
import { Not, Repository } from "typeorm";
import { ExchangeFactory } from "../factory/exchange.factory";
import { EncryptionService } from "src/interceptors";

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);
  private providerCache: Map<string, any> = new Map();

  constructor(
    @InjectRepository(ExchangeApiKey)
    private exchangeApiKeyRepository: Repository<ExchangeApiKey>,
    private exchangeFactory: ExchangeFactory,
    private encryptionService: EncryptionService,
  ) {}

  async addApiKey(
    user: User,
    data: {
      provider: EXCHANGE_PROVIDER;
      apiKey: string;
      apiSecret: string;
      apiPassphrase?: string;
      isPrimary?: boolean;
      permissions?: any;
    },
  ): Promise<ExchangeApiKey> {
    try {
      // Validate credentials
      const isValid = await this.exchangeFactory.validateCredentials(
        data.provider,
        data.apiKey,
        data.apiSecret,
        data.apiPassphrase,
      );

      if (!isValid) {
        throw new Error("Invalid API credentials");
      }

      // Check if already exists
      const existing = await this.exchangeApiKeyRepository.findOne({
        where: {
          user: { id: user.id },
          provider: data.provider,
        },
      });

      if (existing) {
        throw new Error(`API key for ${data.provider} already exists`);
      }

      // Encrypt sensitive data
      const encryptedSecret = this.encryptionService.encrypt(data.apiSecret);
      const encryptedPassphrase = data.apiPassphrase
        ? this.encryptionService.encrypt(data.apiPassphrase)
        : null;

      const apiKey = this.exchangeApiKeyRepository.create({
        user,
        userId: user.id,
        provider: data.provider,
        apiKey: data.apiKey,
        apiSecret: encryptedSecret,
        apiPassphrase: encryptedPassphrase,
        isPrimary: data.isPrimary || false,
        permissions: data.permissions || { trade: true, read: true },
      });

      if (data.isPrimary) {
        // Set all other keys for this user as non-primary
        await this.exchangeApiKeyRepository.update(
          { user: { id: user.id }, provider: data.provider },
          { isPrimary: false },
        );
      }

      await this.exchangeApiKeyRepository.save(apiKey);

      // Update user's preferred exchange
      if (data.isPrimary) {
        await this.updateUserPreferredExchange(user, data.provider);
      }

      return apiKey;
    } catch (error: any) {
      this.logger.error(`Add API key error: ${error.message}`);
      throw error;
    }
  }

  async getPrimaryExchange(user: User): Promise<ExchangeApiKey | null> {
    const apiKey = await this.exchangeApiKeyRepository.findOne({
      where: {
        user: { id: user.id },
        isPrimary: true,
        isActive: true,
      },
    });

    return apiKey || null;
  }

  async getExchangeProvider(user: User): Promise<any> {
    const primaryKey = await this.getPrimaryExchange(user);

    if (!primaryKey) {
      throw new Error("No primary exchange configured");
    }

    const cacheKey = `${user.id}-${primaryKey.provider}`;

    if (this.providerCache.has(cacheKey)) {
      return this.providerCache.get(cacheKey);
    }

    const provider = this.exchangeFactory.createProviderFromApiKey(primaryKey);
    this.providerCache.set(cacheKey, provider);

    return provider;
  }

  async getAllExchangeProviders(user: User): Promise<any[]> {
    const apiKeys = await this.exchangeApiKeyRepository.find({
      where: {
        user: { id: user.id },
        isActive: true,
      },
    });

    return apiKeys.map((key) => {
      const provider = this.exchangeFactory.createProviderFromApiKey(key);
      return { provider, apiKey: key };
    });
  }

  async setPrimaryExchange(
    user: User,
    provider: EXCHANGE_PROVIDER,
  ): Promise<void> {
    await this.exchangeApiKeyRepository.update(
      { user: { id: user.id }, provider },
      { isPrimary: true },
    );

    await this.exchangeApiKeyRepository.update(
      { user: { id: user.id }, provider: Not(provider) },
      { isPrimary: false },
    );

    // Clear cache
    this.providerCache.delete(`${user.id}-${provider}`);
    await this.updateUserPreferredExchange(user, provider);
  }

  async removeApiKey(user: User, provider: EXCHANGE_PROVIDER): Promise<void> {
    await this.exchangeApiKeyRepository.delete({
      user: { id: user.id },
      provider,
    });

    // Clear cache
    this.providerCache.delete(`${user.id}-${provider}`);
  }

  private async updateUserPreferredExchange(
    user: User,
    provider: EXCHANGE_PROVIDER,
  ): Promise<void> {
    // Update user entity with preferred exchange
    //   await user.save();
  }

  async getApiKeys(user: User): Promise<ExchangeApiKey[]> {
    return this.exchangeApiKeyRepository.find({
      where: { user: { id: user.id }, isActive: true },
    });
  }

  // Price and trading methods
  async getPrice(user: User, symbol: string): Promise<number> {
    const provider = await this.getExchangeProvider(user);
    return provider.getPrice(symbol);
  }

  async get24hStats(user: User, symbol: string): Promise<any> {
    const provider = await this.getExchangeProvider(user);
    return provider.get24hStats(symbol);
  }

  async placeOrder(
    user: User,
    params: {
      symbol: string;
      side: "BUY" | "SELL";
      type: "MARKET" | "LIMIT";
      quantity: number;
      price?: number;
    },
  ): Promise<any> {
    const provider = await this.getExchangeProvider(user);
    return provider.placeOrder(params);
  }

  async getBalance(user: User, asset?: string): Promise<any> {
    const provider = await this.getExchangeProvider(user);
    return provider.getBalance(asset);
  }

  async getTopLosers(
    user: User,
    params: {
      minVolume: number;
      maxVolume: number;
      dropThreshold: number;
      limit: number;
    },
  ): Promise<any[]> {
    const provider = await this.getExchangeProvider(user);
    return provider.getTopLosers(params);
  }
}
