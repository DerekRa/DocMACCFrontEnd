export interface AmountChargedRequest {
  profileId: number;
  dateOfProcedure: string;
  chargedAmount: string;
  discount: string;
  note: string;
  category: string;
  procedureDone: string;
  toothNumber: number;
  createdById: string;
  createdByName: string;
}
