export interface MailOptions {
  cc?: string;
  fromEmail?: string;
  fromName?: string;
}

export interface MailObj {
  email: string;
  subject?: string;
  from?: string;
  htmlOrTemplateId: string;
  templateData?: any;
  options?: MailOptions;
  attachments?: any[];

  //Todo - remove these after changes in other services have been made.
  subjectOrTemplateId?: string;
  htmlOrTemplate: any;
}

export interface SingleMail extends MailObj {}

export interface ISingleMailMultipleRecipient extends MailObj {
  emails: string[];
  subject?: string;
  htmlOrTemplateId: string;
  templateData?: any;
  options?: MailOptions;
  attachments?: any[];
}

export interface IMultipleMailMultipleRecipient {
  data: MailObj[];
}

export interface ICreateMailingList {
  name: string;
}
