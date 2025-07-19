export interface BracketPaginationRequest {
  profileId: number;
  createdByName: string;
  createdById: string;
  category: string;
  pageNo: number;
  pageSize: number;
  sortBy: string;
  orderBy: string;
  findItem: string;
}
