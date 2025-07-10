export interface UpdateBillDataRequest {
  billId: number;
  billName: string;
  totalBill: number;
  reasonChanged: string;
  createdByName: string;
  createdById: string;
}
