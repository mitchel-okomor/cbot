import { Expose } from 'class-transformer';

export class GeneratePaymentLinkSerializerDTO {
  @Expose()
  amount: number;

  @Expose()
  client_reference: string;

  @Expose()
  reference: string;

  @Expose()
  currency: string;

  @Expose()
  status: string;

  @Expose()
  payment_link;
}
