import {
  IMultipleMailMultipleRecipient,
  ISingleMailMultipleRecipient,
  SingleMail,
} from './common.interface';

export interface IEmailProvider {
  sendOneMail(payload: SingleMail): any;

  sendSingleMailMultipleRecipients(payload: ISingleMailMultipleRecipient): any;

  sendDynamicMailsMultipleRecipients(
    payload: IMultipleMailMultipleRecipient,
  ): Promise<void> | void;
}
