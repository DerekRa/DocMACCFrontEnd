export interface ToothHistoryPaginationRequest {
    profileId: number;
    teethNumbering: number;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    orderBy: string;
    findItem: string;
}
