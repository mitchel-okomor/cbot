export interface IPushNotificationProvider {
  createNotification(notification: any);

  cancelNotification(identifier: any);
}
