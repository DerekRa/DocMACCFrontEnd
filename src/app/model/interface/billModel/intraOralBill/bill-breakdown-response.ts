import { BillBreakdown } from './bill-breakdown';

export interface BillBreakdownResponse {
  billBreakdowns: BillBreakdown[];
  totalBill: string;
  totalPayment: string;
  totalBalance: string;
}
