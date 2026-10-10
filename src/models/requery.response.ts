import { REQUERY_STATUS } from "src/enums/payment.enum";

export default interface RequeryResponse {
  reference: string;
  status: REQUERY_STATUS;
  providerResponse?: any;
}
