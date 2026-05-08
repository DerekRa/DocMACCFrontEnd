import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { AdditionalChargeDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/additional-charge-data-request';
import { AdditionalChargeHistoryResponse } from 'src/app/model/interface/billModel/orthodonticBill/additional-charge-history-response';
import { AdditionalChargeUpdateDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/additional-charge-update-data-request';
import { BillDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/bill-data-request';
import { BillPaginationRequest } from 'src/app/model/interface/billModel/orthodonticBill/bill-pagination-request';
import { BreakdownOrBillChangesPaginationRequest } from 'src/app/model/interface/billModel/orthodonticBill/breakdown-or-bill-changes-pagination-request';
import { BreakdownResponse } from 'src/app/model/interface/billModel/orthodonticBill/breakdown-response';
import { OrthodonticBillChangesDataResponse } from 'src/app/model/interface/billModel/orthodonticBill/orthodontic-bill-changes-data-response';
import { OrthodonticBillDataResponse } from 'src/app/model/interface/billModel/orthodonticBill/orthodontic-bill-data-response';
import { PaymentDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/payment-data-request';
import { PaymentHistoryResponse } from 'src/app/model/interface/billModel/orthodonticBill/payment-history-response';
import { PaymentOrChargePaginationRequest } from 'src/app/model/interface/billModel/orthodonticBill/payment-or-charge-pagination-request';
import { PaymentUpdateDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/payment-update-data-request';
import { UpdateBillDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/update-bill-data-request';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { environment } from 'src/environments/environment';
import { AppServicesConstants } from '../constants/app-services.constants';

@Injectable({
  providedIn: 'root',
})
export class OrthodonticBillService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:${environment.port}${AppServicesConstants.ORTHODONTIC_BILL_API_URL}`;
  }
  public getPatientsWithRecords(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/patientsWithRecords`);
  }
  public getBillHistory(
    dataPaginationRequest: BillPaginationRequest,
  ): Observable<OrthodonticBillDataResponse[]> {
    return this.http
      .get<OrthodonticBillDataResponse[]>(`${this.baseUrl}`, {
        params: this.convertToHttpParams(dataPaginationRequest),
      })
      .pipe(retry(3));
  }
  public getBillBreakdown(
    dataPaginationRequest: BreakdownOrBillChangesPaginationRequest,
  ): Observable<BreakdownResponse[]> {
    return this.http
      .get<BreakdownResponse[]>(`${this.baseUrl}/breakdown`, {
        params: this.convertToHttpParams(dataPaginationRequest),
      })
      .pipe(retry(3));
  }
  public getBill(
    profileId: number,
    billId: number,
  ): Observable<OrthodonticBillDataResponse> {
    return this.http
      .get<OrthodonticBillDataResponse>(
        `${this.baseUrl}/${profileId}/${billId}`,
      )
      .pipe(retry(3));
  }
  public getPayment(transactionId: number): Observable<PaymentHistoryResponse> {
    return this.http
      .get<PaymentHistoryResponse>(
        `${this.baseUrl}/breakdown/payment/history/${transactionId}`,
      )
      .pipe(retry(3));
  }
  public getAdditionalCharge(
    transactionId: number,
  ): Observable<AdditionalChargeHistoryResponse> {
    return this.http
      .get<AdditionalChargeHistoryResponse>(
        `${this.baseUrl}/breakdown/additionalCharge/history/${transactionId}`,
      )
      .pipe(retry(3));
  }
  public getBillChangesHistory(
    dataPaginationRequest: BreakdownOrBillChangesPaginationRequest,
  ): Observable<OrthodonticBillChangesDataResponse[]> {
    return this.http
      .get<OrthodonticBillChangesDataResponse[]>(`${this.baseUrl}/history`, {
        params: this.convertToHttpParams(dataPaginationRequest),
      })
      .pipe(retry(3));
  }
  public getPaymentHistory(
    dataPaginationRequest: PaymentOrChargePaginationRequest,
  ): Observable<PaymentHistoryResponse[]> {
    return this.http
      .get<PaymentHistoryResponse[]>(
        `${this.baseUrl}/breakdown/payment/history`,
        {
          params: this.convertToHttpParams(dataPaginationRequest),
        },
      )
      .pipe(retry(3));
  }
  public getAdditionalChargeHistory(
    dataPaginationRequest: PaymentOrChargePaginationRequest,
  ): Observable<AdditionalChargeHistoryResponse[]> {
    return this.http
      .get<AdditionalChargeHistoryResponse[]>(
        `${this.baseUrl}/breakdown/additionalCharge/history`,
        {
          params: this.convertToHttpParams(dataPaginationRequest),
        },
      )
      .pipe(retry(3));
  }
  public createBill(
    billDataRequest: BillDataRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${this.baseUrl}`, billDataRequest)
      .pipe(retry(3));
  }
  public createNewBill(
    billDataRequest: UpdateBillDataRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${this.baseUrl}/update`, billDataRequest)
      .pipe(retry(3));
  }
  public createAdditionalCharge(
    billDataRequest: AdditionalChargeDataRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${this.baseUrl}/breakdown/additionalCharge`,
        billDataRequest,
      )
      .pipe(retry(3));
  }
  public createNewAdditionalCharge(
    billDataRequest: AdditionalChargeUpdateDataRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${this.baseUrl}/breakdown/additionalCharge/update`,
        billDataRequest,
      )
      .pipe(retry(3));
  }
  public createPayment(
    billDataRequest: PaymentDataRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${this.baseUrl}/breakdown/payment`,
        billDataRequest,
      )
      .pipe(retry(3));
  }
  public createNewPayment(
    billDataRequest: PaymentUpdateDataRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${this.baseUrl}/breakdown/payment/update`,
        billDataRequest,
      )
      .pipe(retry(3));
  }
  convertToHttpParams(request: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach(function (key) {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }
}
