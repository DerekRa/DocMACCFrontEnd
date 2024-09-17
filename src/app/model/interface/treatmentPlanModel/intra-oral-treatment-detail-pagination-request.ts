export interface IntraOralTreatmentDetailPaginationRequest {
    profileId: number;
    createdBy: number;
    dateOfProcedure: string;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    orderBy: string;
    findItem: string;
}
