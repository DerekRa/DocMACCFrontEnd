import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { CertificationGetRequest } from 'src/app/model/interface/treatmentPlanModel/certification-get-request';
import { CertificationRequest } from 'src/app/model/interface/treatmentPlanModel/certification-request';
import { CertificationResponse } from 'src/app/model/interface/treatmentPlanModel/certification-response';

const baseUrl = 'http://localhost:9090/api/v1/certification';
// const baseUrl = 'http://localhost:8089/api/v1/certification';
@Injectable({
  providedIn: 'root',
})
export class DentalCertificateService {
  constructor(private http: HttpClient) {}
  public createCertification(
    certificationRequest: CertificationRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${baseUrl}`, certificationRequest)
      .pipe(retry(3));
  }
  public getCertification(
    certificationRequest: CertificationGetRequest
  ): Observable<CertificationResponse> {
    return this.http
      .get<CertificationResponse>(`${baseUrl}`, {
        params: this.convertToHttpParams(certificationRequest),
      })
      .pipe(retry(3));
  }
  public updateCertification(
    certificationRequest: CertificationRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${baseUrl}`, certificationRequest)
      .pipe(retry(3));
  }
  //   public updateProfileModel(certificationRequest: CertificationRequest): Observable<CustomHttpResponse> {
  //     return this.http.put<CustomHttpResponse>(`${baseUrl}`, certificationRequest).pipe(retry(3));
  // }
  public convertToHttpParams(request: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach(function (key) {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }
}
