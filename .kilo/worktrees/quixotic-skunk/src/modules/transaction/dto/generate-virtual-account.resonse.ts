import { Expose } from 'class-transformer';

export class GenerateVirtualAccountResponse {
  @Expose()
  account_number: string;

  @Expose()
  account_name: string;

  @Expose()
  email: string;

  @Expose()
  phone_number: string;

  @Expose()
  bvn: string;

  @Expose()
  ssoId: string;

  @Expose()
  currency: string;

  @Expose()
  provider: string;

  @Expose()
  trace_ref: string;

  @Expose()
  expires_at: Date;

  @Expose()
  issuing_bank: string;

  @Expose()
  meta: any;
}
