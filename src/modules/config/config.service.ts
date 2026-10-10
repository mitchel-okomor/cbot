import { Injectable, Logger } from "@nestjs/common";
import { CommonUtil } from "src/utils";
import { User } from "src/database/entities";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly defaultTradingConfig = {
    autoTrade: false,
    preferredExchange: "BINANCE",
    basePositionSize: 200,
    targetProfit: 20,
    stopLoss: 20,
    maxDcaLevels: 3,
    dcaSpacing: 5,
    minVolume: 50000,
    maxVolume: 500000,
    dropThreshold: 10,
    maxActiveTrades: 15,
  };

  private readonly defaultNotificationConfig = {
    emailEnabled: true,
    pushEnabled: true,
    telegramEnabled: false,
    events: ["TRADE_ENTRY", "TRADE_EXIT", "DCA_EXECUTED", "STOP_LOSS_TRIGGERED"],
  };

  private readonly defaultRiskConfig = {
    maxTotalExposure: 50000,
    maxPositionPercent: 0.1,
    maxDailyLossPercent: 3,
  };

  constructor(private readonly nestConfigService: NestConfigService) {}

  async getConfig(user: User, section?: "trading" | "notifications" | "risk" | "all"): Promise<any> {
    try {
      // In a real implementation, you'd fetch from database
      // For now, return defaults
      if (!section || section === "all") {
        return {
          trading: this.defaultTradingConfig,
          notifications: this.defaultNotificationConfig,
          risk: this.defaultRiskConfig,
        };
      }

      switch (section) {
        case "trading":
          return this.defaultTradingConfig;
        case "notifications":
          return this.defaultNotificationConfig;
        case "risk":
          return this.defaultRiskConfig;
        default:
          return this.defaultTradingConfig;
      }
    } catch (error) {
      this.logger.error(
        "ConfigService :: getConfig error %o",
        CommonUtil.getError(error)
      );
      return {};
    }
  }

  async updateConfig(user: User, config: { trading?: any; notifications?: any; risk?: any }): Promise<any> {
    try {
      // In a real implementation, you'd save to database
      // For now, merge with defaults and return
      const mergedConfig = {
        trading: { ...this.defaultTradingConfig, ...config.trading },
        notifications: { ...this.defaultNotificationConfig, ...config.notifications },
        risk: { ...this.defaultRiskConfig, ...config.risk },
      };

      this.logger.log(`Config updated for user ${user.id}`);
      return mergedConfig;
    } catch (error) {
      this.logger.error(
        "ConfigService :: updateConfig error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  getSystemConfig(key: string): string | undefined {
    return this.nestConfigService.get(key);
  }
}
