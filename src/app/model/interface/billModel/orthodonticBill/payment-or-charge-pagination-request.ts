import { DataPaginationRequest } from './data-pagination-request';

export interface PaymentOrChargePaginationRequest
  extends DataPaginationRequest {
  transactionId: number;
}
