import { Injectable, Logger } from "@nestjs/common";
import { AbstractProvider } from "../abstract.provider";
import { IPushNotificationProvider } from "../../../interfaces/notification/push/IPushProvider.interface";
import { IOneSignalPush } from "../../../interfaces/notification/push/onesignal/onesignal.interface";
import {
  // ProviderCredentialFactory,
  ProviderCredentialValidator,
} from "../../../interfaces/providers/provider-config.interface";
import * as OneSignal from "onesignal-node";

@Injectable()
export class OneSignalProvider
  extends AbstractProvider
  implements IPushNotificationProvider
{
  private client: any;
  private readonly logger = new Logger(OneSignalProvider.name);
  private readonly appId: string;
  private readonly apiKey: string;

  constructor() {
    super();

    this.appId = process.env.ONE_SIGNAL_APP_ID;
    this.apiKey = process.env.ONE_SIGNAL_API_KEY;
    this.client = new OneSignal.Client(this.appId, this.apiKey);
  }

  createNotification = async (payload: IOneSignalPush) => {
    try {
      this.logger.log("createNotification payload", payload);

      const response = await this.client.createNotification(payload);

      this.logger.log("createNotification response", response);
    } catch (error) {
      Logger.error(error);
    }
  };

  cancelNotification = async (notificationId) => {
    try {
      await this.client.cancelNotification(notificationId);
    } catch (error) {
      Logger.error(error);
    }
  };

  instantiateProvider() {
    this.client = new OneSignal.Client(this.appId, this.apiKey);
    return this;
  }

  getConfigurationRequirement(): ProviderCredentialValidator {
    return {
      apiKey: true,
      privateOrSecretKey: true,
    };
  }
}
