import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, retry, throwError } from 'rxjs';
import { AmountChargedRequest } from 'src/app/model/interface/billModel/intraOralBill/amount-charged-request';
import { AmountChargedHistoryResponse } from 'src/app/model/interface/billModel/intraOralBill/amount-charged-history-response';
import { AmountData } from 'src/app/model/interface/billModel/intraOralBill/amount-data';
import { AmountDataPaginationRequest } from 'src/app/model/interface/billModel/intraOralBill/amount-data-pagination-request';
import { AmountPaymentRequest } from 'src/app/model/interface/billModel/intraOralBill/amount-payment-request';
import { AmountPaymentResponse } from 'src/app/model/interface/billModel/intraOralBill/amount-payment-response';
import { BillBreakdown } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdown';
import { BillBreakdownResponse } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdown-response';
import { BillBreakdwonRequest } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdwon-request';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { environment } from 'src/environments/environment';
import { AmountChargedResponse } from 'src/app/model/interface/billModel/intraOralBill/amount-charged-response';
import { AmountDataRequest } from 'src/app/model/interface/billModel/intraOralBill/amount-data-request';

@Injectable({
  providedIn: 'root',
})
export class IntraoralBillService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:9090/api/v1/intraOralBill`;
  }

  public getBillTotalBreakdown(
    billBreakdwonRequest: BillBreakdwonRequest,
  ): Observable<BillBreakdownResponse> {
    return this.http
      .get<BillBreakdownResponse>(`${this.baseUrl}/totalBreakdown`, {
        params: this.convertToHttpParams(billBreakdwonRequest),
      })
      .pipe(
        catchError((error) => EMPTY),
        retry(3),
      );
  }
  public getdBillBreakdown(
    amountDataRequest: AmountData,
  ): Observable<BillBreakdown> {
    return this.http
      .get<BillBreakdown>(`${this.baseUrl}/breakdown`, {
        params: this.convertToHttpParams(amountDataRequest),
      })
      .pipe(
        catchError((error) => EMPTY),
        retry(3),
      );
  }
  public getAmountCharged(
    amountDataRequest: AmountDataRequest,
  ): Observable<AmountChargedResponse> {
    return this.http
      .get<AmountChargedResponse>(`${this.baseUrl}/amountCharged`, {
        params: this.convertToHttpParams(amountDataRequest),
      })
      .pipe(retry(3));
  }
  public getAmountChargedHistory(
    amountDataPaginationRequest: AmountDataPaginationRequest,
  ): Observable<AmountChargedHistoryResponse[]> {
    return this.http
      .get<AmountChargedHistoryResponse[]>(
        `${this.baseUrl}/amountCharged/history`,
        {
          params: this.convertToHttpParams(amountDataPaginationRequest),
        },
      )
      .pipe(retry(3));
  }
  public getAmountPaymentHistory(
    amountDataPaginationRequest: AmountDataPaginationRequest,
  ): Observable<AmountPaymentResponse[]> {
    return this.http
      .get<AmountPaymentResponse[]>(`${this.baseUrl}/amountPayment`, {
        params: this.convertToHttpParams(amountDataPaginationRequest),
      })
      .pipe(retry(3));
  }
  public createAmountCharged(
    amountChargedRequest: AmountChargedRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${this.baseUrl}/amountCharged`,
        amountChargedRequest,
      )
      .pipe(retry(3));
  }
  public createAmountPayment(
    amountPaymentRequest: AmountPaymentRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${this.baseUrl}/amountPayment`,
        amountPaymentRequest,
      )
      .pipe(retry(3));
  }

  public convertToHttpParams(request: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach(function (key) {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }
}
