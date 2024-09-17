export interface BracketPaginationRequest {
    profileId: number;
    createdBy: number;
    category: string;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    orderBy: string;
    findItem: string;
}
