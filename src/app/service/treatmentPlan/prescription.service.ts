import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { PrescriptionChoices } from 'src/app/model/interface/prescriptionModel/prescription-choices';
import { PrescriptionPaginationRequest } from 'src/app/model/interface/prescriptionModel/prescription-pagination-request';
import { PrescriptionResponse } from 'src/app/model/interface/prescriptionModel/prescription-response';
import { PrescriptionSaveRequest } from 'src/app/model/interface/prescriptionModel/prescription-save-request';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';

// const baseUrl = 'http://localhost:8083/api/v1/prescription';
const baseUrl = 'http://localhost:9090/api/v1/prescription';
@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {
  constructor(private http: HttpClient) {}
  public getPrescriptionChoices(): Observable<PrescriptionChoices[]> {
    return this.http
      .get<PrescriptionChoices[]>(`${baseUrl}/choices`)
      .pipe(retry(3));
  }
  public getPrescription(
    profileId: string,
    prescribedId: string
  ): Observable<PrescriptionResponse> {
    return this.http
      .get<PrescriptionResponse>(`${baseUrl}/${profileId}/${prescribedId}`)
      .pipe(retry(3));
  }
  public getPrescriptionWithPagination(
    prescriptionPaginationRequest: PrescriptionPaginationRequest
  ): Observable<PrescriptionResponse[]> {
    return this.http
      .get<PrescriptionResponse[]>(`${baseUrl}`, {
        params: this.convertToHttpParams(prescriptionPaginationRequest),
      })
      .pipe(retry(3));
  }
  public createPrescription(
    prescriptionSaveRequest: PrescriptionSaveRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${baseUrl}`, prescriptionSaveRequest)
      .pipe(retry(3));
  }
  public deletePrescription(
    profileId: number,
    prescribedId: number
  ): Observable<CustomHttpResponse> {
    return this.http
      .delete<CustomHttpResponse>(`${baseUrl}/${profileId}/${prescribedId}`)
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
