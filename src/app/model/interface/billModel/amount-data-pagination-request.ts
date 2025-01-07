export interface AmountDataPaginationRequest {
  profileId: number;
  dateOfProcedure: string;
  category: string;
  procedureDone: string;
  toothNumber: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;
  orderBy: string;
  findItem: string;
}
