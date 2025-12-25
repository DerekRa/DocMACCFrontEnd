export interface AmountPaymentRequest {
  profileId: number;
  dateOfProcedure: string;
  paymentAmount: string;
  note: string;
  category: string;
  procedureDone: string;
  toothNumbers: string;
  createdById: string;
  createdByName: string;
}
