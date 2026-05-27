import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry } from 'rxjs';
import { Physician } from 'src/app/model/interface/medicalHistoryModel/physician';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { environment } from 'src/environments/environment';
import { AppServicesConstants } from '../constants/app-services.constants';

@Injectable({
  providedIn: 'root',
})
export class PhysicianHistoryService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:${environment.port}${AppServicesConstants.PHYSICIAN_HISTORY_API_URL}`;
  }
  public getPhysiciansPerPage(
    profileId: number,
    pageNo: number,
    pageSize: number,
    sortBy: string,
    orderBy: string,
    findItem: string,
  ): Observable<Physician[]> {
    return this.http
      .get<
        Physician[]
      >(`${this.baseUrl}/pagingAndSorting/${profileId}/${pageNo}/${pageSize}/${sortBy}/${orderBy}/${findItem}`)
      .pipe(retry(3));
  }
  public getPhysician(id: number, physicianId: number): Observable<Physician> {
    return this.http
      .get<Physician>(`${this.baseUrl}/${physicianId}/${id}`)
      .pipe(
        retry(3),
        catchError((error: any) => {
          return of();
        }),
      );
  }
  public createPhysicianHistory(
    physician: Physician,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${this.baseUrl}`, physician)
      .pipe(retry(3));
  }
  public updatePhysicianHistory(
    physician: Physician,
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${this.baseUrl}`, physician)
      .pipe(retry(3));
  }
  public deletePhysician(physician: Physician): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${this.baseUrl}/delete`, physician)
      .pipe(retry(3));
  }
}
