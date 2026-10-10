import { NOTIFICATION_TYPE } from "src/enums";
import { User } from "../database/entities";

export interface LocationAdministrativeLevels {
  level3long: string;
  level3short: string;
  level2long: string;
  level2short: string;
  level1long: string;
  level1short: string;
  neighborhood: string;
}
export interface Location {
  name: string;
  address: string;
  city: string;
  country: string;
  countryCode: string;
  coordinates?: [number, number];
  type?: string;
  state?: string;
  streetNumber?: string;
  streetName?: string;
  zip?: string;
  administrativeLevels?: [];
}

export interface IPaginatedRes<T = any> {
  data: T[];
  pagination: {
    total: number;
    perPage: number;
    pageSize: number;
    pageNumber: number;
  };
  meta?: Record<string, any>;
}

export interface IAuthenticatedReq extends Request {
  user: User;
}

export interface ITokenResponse {
  status: string;
  message: string;
  data: {
    currentBalance: number;
    reference: string;
    prevBalance: number;
    debitAmount: number;
  };
}

export interface IOtpEMAIL {
  email: string;
  code: number;
  name?: string;
}

export interface INewAdminEMAIL {
  email: string;
  password: string;
  name?: string;
}

export interface IForgotPasswordEMAIL {
  email: string;
  url: string;
  name?: string;
}

export interface IGenericPushPayload {
  userId: string;
  sender: string;
  action: string;
  message?: string;
  type: NOTIFICATION_TYPE;
}

export interface IEmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface IApplicationConfirmationEMAIL {
  email: string;
  fullName: string;
  programTitle: string;
  programDescription: string;
  paymentLink: string;
}

export interface IEnrolmentEMAIL {
  email: string;
  fullName: string;
  programTitle: string;
  programDescription: string;
  logoLink: string;
  paymentLink: string;
}

export interface IPaymentConfirmationEMAIL {
  email: string;
  fullName: string;
  programTitle: string;
  programDescription: string;
  dashboardLink: string;
  amountPaid: string;
  paymentReference: string;
  paymentDate: string;
}

export interface IPaymentReceiptEMAIL {
  email: string;
  fullName: string;
  phoneNumber: string;

  receiptNumber: string;

  programTitle: string;
  programDuration: string;

  amountPaid: string;
  currency: string;

  paymentMethod: string;
  transactionId: string;

  paymentDate: string;

  paymentStatus: string;

  receiptDownloadLink: string;
}
