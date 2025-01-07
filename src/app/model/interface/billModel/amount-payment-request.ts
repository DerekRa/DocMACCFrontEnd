export interface AmountPaymentRequest {
  profileId: number;
  dateOfProcedure: string;
  paymentAmount: string;
  note: string;
  category: string;
  procedureDone: string;
  toothNumber: number;
  createdById: string;
  createdByName: string;
}
