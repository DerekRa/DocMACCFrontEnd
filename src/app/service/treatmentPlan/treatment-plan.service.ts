import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { IntraOralTreatmentDetailPaginationRequest } from 'src/app/model/interface/treatmentPlanModel/intra-oral-treatment-detail-pagination-request';
import { IntraOralTreatmentPaginationRequest } from 'src/app/model/interface/treatmentPlanModel/intra-oral-treatment-pagination-request';
import { IntraoralTreatmentPlanDetailResponse } from 'src/app/model/interface/treatmentPlanModel/intraoral-treatment-plan-detail-response';
import { IntraoralTreatmentPlanGroupResponse } from 'src/app/model/interface/treatmentPlanModel/intraoral-treatment-plan-group-response';
import { OrthodonticTreatmentPaginationRequest } from 'src/app/model/interface/treatmentPlanModel/orthodontic-treatment-pagination-request';
import { OrthodonticTreatmentResponse } from 'src/app/model/interface/treatmentPlanModel/orthodontic-treatment-response';
import { environment } from 'src/environments/environment';

// const baseUrl = 'http://localhost:9090/api/v1/treatmentPlan';
// const baseUrl = 'http://localhost:8088/api/v1/treatmentPlan';
@Injectable({
  providedIn: 'root',
})
export class TreatmentPlanService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:9090/api/v1/treatmentPlan`;
  }

  public getIntraOralTreatmentListPagination(
    intraOralTreatmentPaginationRequest: IntraOralTreatmentPaginationRequest,
  ): Observable<IntraoralTreatmentPlanGroupResponse[]> {
    return this.http
      .get<IntraoralTreatmentPlanGroupResponse[]>(
        `${this.baseUrl}/intraOral/group`,
        {
          params: this.convertToHttpParams(intraOralTreatmentPaginationRequest),
        },
      )
      .pipe(retry(3));
  }
  public getIntraOralTreatmentDetailListPagination(
    intraOralTreatmentDetailPaginationRequest: IntraOralTreatmentDetailPaginationRequest,
  ): Observable<IntraoralTreatmentPlanDetailResponse[]> {
    return this.http
      .get<IntraoralTreatmentPlanDetailResponse[]>(
        `${this.baseUrl}/intraOral/detail`,
        {
          params: this.convertToHttpParams(
            intraOralTreatmentDetailPaginationRequest,
          ),
        },
      )
      .pipe(retry(3));
  }
  public getOrthodonticTreatmentListPagination(
    orthodonticTreatmentDetailPaginationRequest: OrthodonticTreatmentPaginationRequest,
  ): Observable<OrthodonticTreatmentResponse[]> {
    return this.http
      .get<OrthodonticTreatmentResponse[]>(`${this.baseUrl}/orthodontic`, {
        params: this.convertToHttpParams(
          orthodonticTreatmentDetailPaginationRequest,
        ),
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
