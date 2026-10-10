export class CreateProvidusVirtualAccount {
  bvn: string;
  account_name: string;

  constructor(bvn: string, account_name: string) {
    this.bvn = bvn;
    this.account_name = account_name;
  }
}

export class CreateProvidusVirtualAccountResponse {
  account_number: string;
  account_name: string;
  bvn: string;
  requestSuccessful: boolean;
  responseMessage: string;
  responseCode: string; //TODO - get the list of possible responseCodes
}

export class CreateProvidusDynamicVirtualAccountResponse {
  account_number: string;
  account_name: string;
  requestSuccessful: boolean;
  responseMessage: string;
  responseCode: string;
  initiationTranRef: string;
}

export class UpdateProvidusVirtualAccountName {
  account_number: string;
  account_name: string;

  constructor(account_number: string, account_name: string) {
    this.account_number = account_number;
    this.account_name = account_name;
  }
}

export class UpdateProvidusVirtualAccountNameResponse {
  requestSuccessful: boolean;
  responseMessage: string;
  responseCode: string; //TODO - get the list of possible responseCodes
}

export class VerifyTransactionResponse {
  sessionId: string;
  initiationTranRef: string;
  accountNumber: string;
  tranRemarks: string;
  transactionAmount: number;
  settledAmount: number;
  feeAmount: number;
  vatAmount: number;
  currency: string;
  channelId: string;
  tranDateTime: string;

  settlementId: string;
  sourceBankName: string;
  sourceAccountName: string;
  sourceAccountNumber: string;
}

export class BlacklistVirtualAccountResponse {
  requestSuccessful: boolean;
  responseMessage: string;
  responseCode: string; //TODO - get the list of possible responseCodes
}

export class ProvidusSettlementNotificationPayload {
  sessionId: string;
  accountNumber: string;
  tranRemarks: string;
  transactionAmount: string;
  settledAmount: string;
  feeAmount: string;
  vatAmount: string;
  currency: string;
  initiationTranRef: string;
  settlementId: string;
  sourceAccountNumber: string;
  sourceAccountName: string;
  sourceBankName: string;
  channelId: string;
  tranDateTime: string;
}
