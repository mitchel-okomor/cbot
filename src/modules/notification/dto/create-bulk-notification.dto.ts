import { NOTIFICATION_TYPE, User } from "src/database/entities";

export class CreateNotificationDTO {
  title: string;
  message: string;
  type: NOTIFICATION_TYPE;
  user: User;
  action: string;
}

export class CreateBulkNotificationDTO {
  data: CreateNotificationDTO[];
}
