import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { ActiveProfiles } from 'src/app/model/interface/shared/active-profiles';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { IntraoralExamination } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/intraoral-examination';
import { ConditionProcedureModelRequest } from 'src/app/model/interface/dentalChartModel/intraoralExaminationSaveUpdateModel/condition-procedure-model-request';
import { ToothNumbersDentalChart } from 'src/app/model/interface/dentalChartModel/intraoralExaminationSaveUpdateModel/tooth-numbers-dental-chart';
import { ToothHistoryPaginationRequest } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-history-pagination-request';
import { ToothHistoryPaginationResponse } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-history-pagination-response';
import { DentalChartDesignResponse } from 'src/app/model/interface/dentalChartModel/dental-chart-design-response';

const baseUrl = 'http://localhost:9090/api/v1/intraOral';
// const baseUrl = 'http://localhost:8085/api/v1/intraOral';
@Injectable({
  providedIn: 'root',
})
export class IntraoralExaminationService {
  constructor(private http: HttpClient) {}

  public getActivePatients(): Observable<ActiveProfiles[]> {
    return this.http.get<ActiveProfiles[]>(`${baseUrl}/patientsWithRecords`);
  }
  public getIntraOralDisplay(
    profileId: number,
    kindsOfTeeth: string,
    teethArea: string,
    teethPositionStatus: string,
    sorting: string
  ): Observable<DentalChartDesignResponse[]> {
    return this.http
      .get<DentalChartDesignResponse[]>(
        `${baseUrl}/images/${profileId}/${kindsOfTeeth}/${teethArea}/${teethPositionStatus}/${sorting}`
      )
      .pipe(retry(3));
  }
  public getToothNumbersDisplay(
    profileId: number,
    kindsOfTeeth: string,
    teethArea: string,
    teethPositionStatus: string,
    sorting: string
  ): Observable<ToothNumbersDentalChart[]> {
    return this.http
      .get<ToothNumbersDentalChart[]>(
        `${baseUrl}/toothNumbers/${profileId}/${kindsOfTeeth}/${teethArea}/${teethPositionStatus}/${sorting}`
      )
      .pipe(retry(3));
  }
  public getIntraOralExamination(
    formData: FormData
  ): Observable<DentalChartDesignResponse[]> {
    return this.http
      .get<DentalChartDesignResponse[]>(`${baseUrl}/${formData}`)
      .pipe(retry(3));
  }
  public getImage(imageName: string): string {
    // return this.http.get<any>(`${baseUrl}/images/${imageName}`);
    return baseUrl + `/images/${imageName}`;
  }
  public getIntraOralExaminationByNumber(
    profileId: number,
    teethNumbering: number,
    dateOfProcedure: string
  ): Observable<IntraoralExamination> {
    return this.http
      .get<IntraoralExamination>(
        `${baseUrl}/${profileId}/${teethNumbering}/${dateOfProcedure}`
      )
      .pipe(retry(3));
  }
  public getRecentIntraOralExaminationByNumber(
    profileId: number,
    teethNumbering: number
  ): Observable<IntraoralExamination> {
    return this.http
      .get<IntraoralExamination>(`${baseUrl}/${profileId}/${teethNumbering}`)
      .pipe(retry(3));
  }
  public createIntraOralExaminationModel(
    conditionProcedureModelRequest: ConditionProcedureModelRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${baseUrl}`, conditionProcedureModelRequest)
      .pipe(retry(3));
  }
  public getToothHistoryPagination(
    paginationData: ToothHistoryPaginationRequest
  ): Observable<ToothHistoryPaginationResponse[]> {
    console.log(
      'url = ' + `${baseUrl}/history` + this.convertToHttpParams(paginationData)
    );
    return this.http
      .get<ToothHistoryPaginationResponse[]>(`${baseUrl}/history`, {
        params: this.convertToHttpParams(paginationData),
      })
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
