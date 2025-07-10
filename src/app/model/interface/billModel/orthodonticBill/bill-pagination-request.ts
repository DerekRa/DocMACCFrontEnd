import { DataPaginationRequest } from './data-pagination-request';

export interface BillPaginationRequest extends DataPaginationRequest {
  profileId: number;
}
