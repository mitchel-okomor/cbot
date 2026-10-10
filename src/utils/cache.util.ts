import { Logger } from "@nestjs/common";

export class CacheUtil {
  private readonly logger = new Logger(CacheUtil.name);

  private static readonly service = "product-pointers";

  static readonly ONE_HOUR = 60 * 60;
  static readonly ONE_DAY = 60 * 60 * 24;
  static readonly TEN_MINUTES = 60 * 10;
  static readonly ONE_MINUTE = 60 * 1;
  static readonly THIRTY_MINUTES = 60 * 30;
  static readonly FIVE_MINUTES = 60 * 5;

  static getCacheKey(key: string): string {
    return `cbot_${process.env.APP_ENV || "unknown"}_${
      CacheUtil.service
    }_${key?.trim()}`;
  }

  static getProviderFailureCountToday(provider: string) {
    const dateToLocalString = new Date()
      .toLocaleDateString()
      .replaceAll("/", "_");
    return `${provider}_total_failure_count_today_${dateToLocalString}`;
  }
}
