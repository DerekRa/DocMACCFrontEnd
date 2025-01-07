import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, retry, throwError } from 'rxjs';
import { AmountChargedRequest } from 'src/app/model/interface/billModel/amount-charged-request';
import { AmountChargedResponse } from 'src/app/model/interface/billModel/amount-charged-response';
import { AmountData } from 'src/app/model/interface/billModel/amount-data';
import { AmountDataPaginationRequest } from 'src/app/model/interface/billModel/amount-data-pagination-request';
import { AmountPaymentRequest } from 'src/app/model/interface/billModel/amount-payment-request';
import { AmountPaymentResponse } from 'src/app/model/interface/billModel/amount-payment-response';
import { BillBreakdown } from 'src/app/model/interface/billModel/bill-breakdown';
import { BillBreakdownResponse } from 'src/app/model/interface/billModel/bill-breakdown-response';
import { BillBreakdwonRequest } from 'src/app/model/interface/billModel/bill-breakdwon-request';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';

const baseUrl = 'http://localhost:9090/api/v1/bill';
@Injectable({
  providedIn: 'root',
})
export class IntraoralBillService {
  constructor(private http: HttpClient) {}

  public getBillTotalBreakdown(
    billBreakdwonRequest: BillBreakdwonRequest
  ): Observable<BillBreakdownResponse> {
    return this.http
      .get<BillBreakdownResponse>(`${baseUrl}/totalBreakdown`, {
        params: this.convertToHttpParams(billBreakdwonRequest),
      })
      .pipe(
        catchError((error) => EMPTY),
        retry(3)
      );
  }
  public getdBillBreakdown(
    amountDataRequest: AmountData
  ): Observable<BillBreakdown> {
    return this.http
      .get<BillBreakdown>(`${baseUrl}/breakdown`, {
        params: this.convertToHttpParams(amountDataRequest),
      })
      .pipe(
        catchError((error) => EMPTY),
        retry(3)
      );
  }
  public getAmountChargedHistory(
    amountDataPaginationRequest: AmountDataPaginationRequest
  ): Observable<AmountChargedResponse[]> {
    return this.http
      .get<AmountChargedResponse[]>(`${baseUrl}/amountCharged`, {
        params: this.convertToHttpParams(amountDataPaginationRequest),
      })
      .pipe(retry(3));
  }
  public getAmountPaymentHistory(
    amountDataPaginationRequest: AmountDataPaginationRequest
  ): Observable<AmountPaymentResponse[]> {
    return this.http
      .get<AmountPaymentResponse[]>(`${baseUrl}/amountPayment`, {
        params: this.convertToHttpParams(amountDataPaginationRequest),
      })
      .pipe(retry(3));
  }
  public createAmountCharged(
    amountChargedRequest: AmountChargedRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${baseUrl}/amountCharged`,
        amountChargedRequest
      )
      .pipe(retry(3));
  }
  public createAmountPayment(
    amountPaymentRequest: AmountPaymentRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${baseUrl}/amountPayment`,
        amountPaymentRequest
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
