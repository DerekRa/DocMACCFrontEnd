import { AdditionalChargeDataRequest } from './additional-charge-data-request';

export interface AdditionalChargeUpdateDataRequest
  extends AdditionalChargeDataRequest {
  chargeTransactionId: number;
  reasonChange: string;
}
