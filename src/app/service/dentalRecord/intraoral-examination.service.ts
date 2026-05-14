import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { DentalChartDesignResponse } from 'src/app/model/interface/dentalChartModel/dental-chart-design-response';
import { IntraoralExamination } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/intraoral-examination';
import { ToothConditionHistoryPaginationResponse } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-condition-history-pagination-response';
import { ToothHistoryPaginationRequest } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-history-pagination-request';
import { ToothProcedureHistoryPaginationResponse } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-procedure-history-pagination-response';
import { ConditionProcedureModelRequest } from 'src/app/model/interface/dentalChartModel/intraoralExaminationSaveUpdateModel/condition-procedure-model-request';
import { ToothNumbersDentalChart } from 'src/app/model/interface/dentalChartModel/intraoralExaminationSaveUpdateModel/tooth-numbers-dental-chart';
import { ActiveProfiles } from 'src/app/model/interface/shared/active-profiles';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { environment } from 'src/environments/environment';
import { AppServicesConstants } from '../constants/app-services.constants';

@Injectable({
  providedIn: 'root',
})
export class IntraoralExaminationService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:${environment.port}${AppServicesConstants.INTRAORAL_EXAMINATION_API_URL}`;
  }

  public getActivePatients(): Observable<ActiveProfiles[]> {
    return this.http.get<ActiveProfiles[]>(
      `${this.baseUrl}/patientsWithRecords`,
    );
  }
  public getIntraOralDisplay(
    profileId: number,
    kindsOfTeeth: string,
    teethArea: string,
    teethPositionStatus: string,
    sorting: string,
    historyTracking: boolean = false,
    datePick: string,
  ): Observable<DentalChartDesignResponse[]> {
    return this.http
      .get<
        DentalChartDesignResponse[]
      >(`${this.baseUrl}/images/${profileId}/${kindsOfTeeth}/${teethArea}/${teethPositionStatus}/${datePick}/${historyTracking}/${sorting}`)
      .pipe(retry(3));
  }
  public getToothNumbersDisplay(
    profileId: number,
    kindsOfTeeth: string,
    teethArea: string,
    teethPositionStatus: string,
    sorting: string,
  ): Observable<ToothNumbersDentalChart[]> {
    return this.http
      .get<
        ToothNumbersDentalChart[]
      >(`${this.baseUrl}/toothNumbers/${profileId}/${kindsOfTeeth}/${teethArea}/${teethPositionStatus}/${sorting}`)
      .pipe(retry(3));
  }
  public getIntraOralExamination(
    formData: FormData,
  ): Observable<DentalChartDesignResponse[]> {
    return this.http
      .get<DentalChartDesignResponse[]>(`${this.baseUrl}/${formData}`)
      .pipe(retry(3));
  }
  public getImage(imageName: string): string {
    return this.baseUrl + `/images/${imageName}`;
  }
  public getIntraOralExaminationByNumber(
    profileId: number,
    teethNumbering: number,
    dateOfProcedure: string,
  ): Observable<IntraoralExamination> {
    return this.http
      .get<IntraoralExamination>(
        `${this.baseUrl}/${profileId}/${teethNumbering}/${dateOfProcedure}`,
      )
      .pipe(retry(3));
  }
  public getRecentIntraOralExaminationByNumber(
    profileId: number,
    teethNumbering: number,
  ): Observable<IntraoralExamination> {
    return this.http
      .get<IntraoralExamination>(
        `${this.baseUrl}/${profileId}/${teethNumbering}`,
      )
      .pipe(retry(3));
  }
  public createIntraOralExaminationModel(
    conditionProcedureModelRequest: ConditionProcedureModelRequest,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(
        `${this.baseUrl}`,
        conditionProcedureModelRequest,
      )
      .pipe(retry(3));
  }
  public getToothProcedureHistoryPagination(
    paginationData: ToothHistoryPaginationRequest,
  ): Observable<ToothProcedureHistoryPaginationResponse[]> {
    console.log(
      'url = ' +
        `${this.baseUrl}/history/teethProcedure` +
        this.convertToHttpParams(paginationData),
    );
    return this.http
      .get<ToothProcedureHistoryPaginationResponse[]>(
        `${this.baseUrl}/history/teethProcedure`,
        {
          params: this.convertToHttpParams(paginationData),
        },
      )
      .pipe(retry(3));
  }
  public getToothConditionHistoryPagination(
    paginationData: ToothHistoryPaginationRequest,
  ): Observable<ToothConditionHistoryPaginationResponse[]> {
    console.log(
      'url = ' +
        `${this.baseUrl}/history/teethCondition` +
        this.convertToHttpParams(paginationData),
    );
    return this.http
      .get<ToothConditionHistoryPaginationResponse[]>(
        `${this.baseUrl}/history/teethCondition`,
        {
          params: this.convertToHttpParams(paginationData),
        },
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
