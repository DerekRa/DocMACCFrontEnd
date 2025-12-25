export interface AmountDataPaginationRequest {
  profileId: number;
  dateOfProcedure: string;
  category: string;
  procedureDone: string;
  toothNumbers: string;
  pageNo: number;
  pageSize: number;
  sortBy: string;
  orderBy: string;
  findItem: string;
}
