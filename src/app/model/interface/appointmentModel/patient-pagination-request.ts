export interface PatientPaginationRequest {
    profileId: number;
    category: string;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    orderBy: string;
    findItem: string;
}
