export interface OrthodonticTreatmentPaginationRequest {
  profileId: number;
  createdBy: number;
  pageNo: number;
  pageSize: number;
  sortBy: string;
  orderBy: string;
  findItem: string;
}
