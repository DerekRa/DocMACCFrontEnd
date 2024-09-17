export interface PrescriptionPaginationRequest {
  profileId: number;
  dateOfProcedure: string;
  pageNo: number;
  pageSize: number;
  sortBy: string;
  orderBy: string;
  findItem: string;
}
