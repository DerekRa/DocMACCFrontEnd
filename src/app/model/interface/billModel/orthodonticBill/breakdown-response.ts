export interface BreakdownResponse {
  id: number;
  totalBill: number;
  additionalChargeAmount: number;
  paymentAmount: number;
  paymentNote: string;
  transactionType: string;
  totalAmountPaid: number;
  balance: number;
  createdDate: Date;
  createdDateTime: Date; //LocalDateTime
}
