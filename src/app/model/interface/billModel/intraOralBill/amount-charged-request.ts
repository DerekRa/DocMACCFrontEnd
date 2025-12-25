export interface AmountChargedRequest {
  profileId: number;
  dateOfProcedure: string;
  chargedAmount: string;
  discount: string;
  note: string;
  category: string;
  procedureDone: string;
  toothNumbers: string;
  createdById: string;
  createdByName: string;
}
