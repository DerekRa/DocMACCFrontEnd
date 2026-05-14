import { Observable, retry } from 'rxjs';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { CertificationGetRequest } from 'src/app/model/interface/treatmentPlanModel/certification-get-request';
import { CertificationRequest } from 'src/app/model/interface/treatmentPlanModel/certification-request';
import { CertificationResponse } from 'src/app/model/interface/treatmentPlanModel/certification-response';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppServicesConstants } from '../constants/app-services.constants';

@Injectable({
  providedIn: 'root',
})
export class DentalCertificateService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:${environment.port}${AppServicesConstants.CERTIFICATION_API_URL}`;
  }
  public createCertification(
    certificationRequest: CertificationRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${this.baseUrl}`, certificationRequest)
      .pipe(retry(3));
  }
  public getCertification(
    certificationRequest: CertificationGetRequest,
  ): Observable<CertificationResponse> {
    return this.http
      .get<CertificationResponse>(`${this.baseUrl}`, {
        params: this.convertToHttpParams(certificationRequest),
      })
      .pipe(retry(3));
  }
  public updateCertification(
    certificationRequest: CertificationRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${this.baseUrl}`, certificationRequest)
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
