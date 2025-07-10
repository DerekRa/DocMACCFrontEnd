import { PaymentDataRequest } from './payment-data-request';

export interface PaymentUpdateDataRequest extends PaymentDataRequest {
  paymentTransactionId: number;
  reasonChange: string;
}
