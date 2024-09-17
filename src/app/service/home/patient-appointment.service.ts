import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { PatientAppointmentResponse } from 'src/app/model/interface/appointmentModel/patient-appointment-response';
import { RegularAppointmentResponse } from 'src/app/model/interface/appointmentModel/regular-appointment-response';
import { PatientPaginationRequest } from 'src/app/model/interface/appointmentModel/patient-pagination-request';
import { WalkInPatientRequest } from 'src/app/model/interface/appointmentModel/walk-in-patient-request';
import { RegularPatientRequest } from 'src/app/model/interface/appointmentModel/regular-patient-request';
import { EventTitleResponse } from 'src/app/model/interface/appointmentModel/event-title-response';
import { WalkInPatientUpdateRequest } from 'src/app/model/interface/appointmentModel/walk-in-patient-update-request';
import { KeycloakService } from 'keycloak-angular';
import { RegularAppointmentRequest } from 'src/app/model/interface/appointmentModel/regular-appointment-request';
import { RegularAppointmentLatestResponse } from 'src/app/model/interface/appointmentModel/regular-appointment-latest-response';

const baseUrl = 'http://localhost:9090/api/v1/appointment';
// const baseUrl = 'http://localhost:8004/api/v1/appointment'; #old / direct endpoint
@Injectable({
  providedIn: 'root',
})
export class PatientAppointmentService {
  constructor(private http: HttpClient) {}

  public getAllPatientAppointment(): Observable<
    HttpResponse<EventTitleResponse[]>
  > {
    return this.http
      .get<EventTitleResponse[]>(`${baseUrl}`, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(retry(3));
  }
  public getSingleAppointment(
    appointmentId: number,
    category: string
  ): Observable<PatientAppointmentResponse> {
    return this.http
      .get<PatientAppointmentResponse>(
        `${baseUrl}/${appointmentId}/${category}`
      )
      .pipe(retry(3));
  }
  public getRegularAppointment(
    regularAppointmentRequest: RegularAppointmentRequest
  ): Observable<RegularAppointmentLatestResponse> {
    return this.http
      .get<RegularAppointmentLatestResponse>(`${baseUrl}/regular`, {
        params: this.convertToHttpParams(regularAppointmentRequest),
      })
      .pipe(retry(3));
  }
  public getRegularAppointmentHistory(
    patientPaginationRequest: PatientPaginationRequest
  ): Observable<RegularAppointmentLatestResponse[]> {
    return this.http
      .get<RegularAppointmentLatestResponse[]>(`${baseUrl}/regular/history`, {
        params: this.convertToHttpParams(patientPaginationRequest),
      })
      .pipe(retry(3));
  }
  public createWalkInAppointment(
    walkInPatientRequest: WalkInPatientRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${baseUrl}/walkin`, walkInPatientRequest)
      .pipe(retry(3));
  }
  public updateWalkInAppointment(
    walkInPatientRequest: WalkInPatientUpdateRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${baseUrl}/walkin`, walkInPatientRequest)
      .pipe(retry(3));
  }
  public removeAppointment(
    appointmentId: string
  ): Observable<CustomHttpResponse> {
    return this.http
      .delete<CustomHttpResponse>(`${baseUrl}/${appointmentId}`)
      .pipe(retry(3));
  }
  public createRegularAppointment(
    regularPatientRequest: RegularPatientRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${baseUrl}/regular`, regularPatientRequest)
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
