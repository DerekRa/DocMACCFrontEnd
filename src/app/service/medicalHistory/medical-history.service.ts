import { Observable, catchError, of, retry } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveProfiles } from 'src/app/model/interface/shared/active-profiles';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { MedicalModel } from 'src/app/model/interface/medicalHistoryModel/medical-model';
import { MedicalQuestionsModel } from 'src/app/model/interface/medicalHistoryModel/medical-questions-model';
import { DeleteProfileOrMedical } from 'src/app/model/interface/profileModel/delete-profile';
import { environment } from 'src/environments/environment';

// const baseUrl = 'http://localhost:9090/api/v1/medical';
// const baseUrl = 'http://localhost:8008/api/v1/medical';

@Injectable({
  providedIn: 'root',
})
export class MedicalHistoryService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:9090/api/v1/medical`;
  }

  public getActivePatients(): Observable<ActiveProfiles[]> {
    return this.http.get<ActiveProfiles[]>(`${this.baseUrl}/activePatients`);
  }

  public getMedicalModel(number: number): Observable<MedicalModel> {
    return this.http.get<MedicalModel>(`${this.baseUrl}/${number}`).pipe(
      retry(3),
      catchError((error: any) => {
        return of();
      }),
    );
  }

  public createMedicalQuestionsModel(
    medicalQuestionsModel: MedicalQuestionsModel,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${this.baseUrl}`, medicalQuestionsModel)
      .pipe(retry(3));
  }

  public updateMedicalQuestionsModel(
    medicalQuestionsModel: MedicalQuestionsModel,
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${this.baseUrl}`, medicalQuestionsModel)
      .pipe(retry(3));
  }

  public deleteUpdateMedicalModel(
    deleteProfile: DeleteProfileOrMedical,
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${this.baseUrl}/delete`, deleteProfile)
      .pipe(retry(3));
  }
}
