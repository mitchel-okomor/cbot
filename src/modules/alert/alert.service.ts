import { Injectable, Logger } from "@nestjs/common";
import { AlertRepository } from "./repository/alert.repository";
import { Alert } from "../../database/entities";
import { CommonUtil } from "src/utils";
import { Equal, In, DeepPartial } from "typeorm";
import { User } from "src/database/entities";
import { ALERT_TYPE, ALERT_SEVERITY } from "src/enums/common.enum";

@Injectable()
export class AlertService {
  private readonly logger = new Logger(AlertService.name);

  constructor(private readonly alertRepository: AlertRepository) {}

  async getAlerts(user: User, query?: { isRead?: boolean; symbol?: string; type?: ALERT_TYPE; severity?: ALERT_SEVERITY }): Promise<Alert[]> {
    try {
      const where: any = { userId: Equal(user.id) };
      if (query?.isRead !== undefined) {
        where.isRead = Equal(query.isRead);
      }
      if (query?.symbol) {
        where.symbol = Equal(query.symbol.toUpperCase());
      }
      if (query?.type) {
        where.type = Equal(query.type);
      }
      if (query?.severity) {
        where.severity = Equal(query.severity);
      }
      return await this.alertRepository.find({ where, order: { createdAt: "DESC" } });
    } catch (error) {
      this.logger.error(
        "AlertService :: getAlerts error %o",
        CommonUtil.getError(error)
      );
      return [];
    }
  }

  async markAsRead(user: User, id: string): Promise<void> {
    try {
      await this.alertRepository.update({ id: Equal(id), userId: Equal(user.id) }, { isRead: true });
    } catch (error) {
      this.logger.error(
        "AlertService :: markAsRead error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async markAllAsRead(user: User): Promise<void> {
    try {
      await this.alertRepository.update({ userId: Equal(user.id), isRead: Equal(false) }, { isRead: true });
    } catch (error) {
      this.logger.error(
        "AlertService :: markAllAsRead error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }

  async createAlert(user: User, data: { symbol: string; type: ALERT_TYPE; message: string; severity?: ALERT_SEVERITY; metadata?: Record<string, any> }): Promise<Alert> {
    try {
      const alert = this.alertRepository.manager.create(Alert, {
        userId: user.id,
        symbol: data.symbol.toUpperCase(),
        type: data.type,
        message: data.message,
        severity: data.severity || ALERT_SEVERITY.INFO,
        metadata: data.metadata,
        isRead: false,
        isSent: false,
      });
      const saved = await this.alertRepository.manager.save(alert) as Alert;
      return saved;
    } catch (error) {
      this.logger.error(
        "AlertService :: createAlert error %o",
        CommonUtil.getError(error)
      );
      throw error;
    }
  }
}
