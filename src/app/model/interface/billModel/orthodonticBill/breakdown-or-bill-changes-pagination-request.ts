import { DataPaginationRequest } from './data-pagination-request';

export interface BreakdownOrBillChangesPaginationRequest
  extends DataPaginationRequest {
  billId: number;
}
