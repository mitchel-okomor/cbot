import { Injectable, Logger } from '@nestjs/common';
import { GenericProviderFactory } from '../../factory/provider-factory';
import { IOneSignalPush } from '../../../interfaces/notification/push/onesignal/onesignal.interface';

@Injectable()
export class PushNotificationService {
  private readonly logger = new Logger(PushNotificationService.name);
  constructor(
    private readonly genericProviderFactory: GenericProviderFactory,
  ) {}

  async createPushNotification(payload: IOneSignalPush) {
    const pushNotificationProvider =
      this.genericProviderFactory.resolvePushNotificationProvider();

    if (payload?.include_player_ids?.length < 1) return;

    return pushNotificationProvider.createNotification(payload);
  }
}
