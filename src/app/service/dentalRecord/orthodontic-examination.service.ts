import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { ActiveProfiles } from 'src/app/model/interface/shared/active-profiles';
import { OrthodonticExamination } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/orthodontic-examination';
import { OrthodonticExaminationLatest } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/orthodontic-examination-latest';
import { OrthodonticExaminationResponse } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/orthodontic-examination-response';
import { OrthodonticExaminationPagination } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/orthodontic-examination-pagination';
import { BracketRequest } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-request';
import { BracketLatestRequest } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-latest-request';
import { BracketResponse } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-response';
import { BracketPaginationRequest } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-pagination-request';
import { environment } from 'src/environments/environment';

// const baseUrl = 'http://localhost:9090/api/v1/orthodontic';
// const baseUrl = 'http://localhost:8087/api/v1/orthodontic';
@Injectable({
  providedIn: 'root',
})
export class OrthodonticExaminationService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `http://${environment.localhost}:9090/api/v1/orthodontic`;
  }
  public getActivePatients(): Observable<ActiveProfiles[]> {
    return this.http.get<ActiveProfiles[]>(
      `${this.baseUrl}/patientsWithRecords`
    );
  }
  public createBracketPrescriptionWireTypes(
    bracketRequest: BracketRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${this.baseUrl}/bracket`, bracketRequest)
      .pipe(retry(3));
  }
  public getBracketPrescriptionWireTypesLatest(
    bracketLatestRequest: BracketLatestRequest
  ): Observable<BracketResponse> {
    return this.http
      .get<BracketResponse>(`${this.baseUrl}/bracket/latest`, {
        params: this.convertToHttpParams(bracketLatestRequest),
      })
      .pipe(retry(3));
  }
  public getBracketPrescriptionWireTypesPagination(
    bracketPaginationRequest: BracketPaginationRequest
  ): Observable<BracketResponse[]> {
    return this.http
      .get<BracketResponse[]>(`${this.baseUrl}/bracket`, {
        params: this.convertToHttpParams(bracketPaginationRequest),
      })
      .pipe(retry(3));
  }
  public createOrthodonticExamination(
    orthodonticExamination: OrthodonticExamination
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${this.baseUrl}/braces`,
        orthodonticExamination
      )
      .pipe(retry(3));
  }
  public getOrthodonticExaminationLatest(
    orthodonticExaminationLatest: OrthodonticExaminationLatest
  ): Observable<OrthodonticExaminationResponse> {
    return this.http
      .get<OrthodonticExaminationResponse>(
        `${this.baseUrl}/braces/latest-date`,
        {
          params: this.convertToHttpParams(orthodonticExaminationLatest),
        }
      )
      .pipe(retry(3));
  }
  public getOrthodonticExaminationPagination(
    orthodonticExaminationPagination: OrthodonticExaminationPagination
  ): Observable<OrthodonticExaminationResponse[]> {
    return this.http
      .get<OrthodonticExaminationResponse[]>(`${this.baseUrl}/braces`, {
        params: this.convertToHttpParams(orthodonticExaminationPagination),
      })
      .pipe(retry(3));
  }
  public getOrthodonticExaminationPaginationLatest(
    orthodonticExaminationPagination: OrthodonticExaminationPagination
  ): Observable<OrthodonticExaminationResponse[]> {
    return this.http
      .get<OrthodonticExaminationResponse[]>(
        `${this.baseUrl}/braces/latest-process`,
        {
          params: this.convertToHttpParams(orthodonticExaminationPagination),
        }
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
