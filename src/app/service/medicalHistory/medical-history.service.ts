import { Observable, catchError, of, retry } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveProfiles } from 'src/app/model/interface/shared/active-profiles';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { MedicalModel } from 'src/app/model/interface/medicalHistoryModel/medical-model';
import { MedicalQuestionsModel } from 'src/app/model/interface/medicalHistoryModel/medical-questions-model';
import { DeleteProfileOrMedical } from 'src/app/model/interface/profileModel/delete-profile';

const baseUrl = 'http://localhost:9090/api/v1/medical';
// const baseUrl = 'http://localhost:8008/api/v1/medical';

@Injectable({
  providedIn: 'root',
})
export class MedicalHistoryService {
  constructor(private http: HttpClient) {}

  public getActivePatients(): Observable<ActiveProfiles[]> {
    return this.http.get<ActiveProfiles[]>(`${baseUrl}/activePatients`);
  }

  public getMedicalModel(number: number): Observable<MedicalModel> {
    return this.http.get<MedicalModel>(`${baseUrl}/${number}`).pipe(
      retry(3),
      catchError((error: any) => {
        return of();
      })
    );
  }

  public createMedicalQuestionsModel(
    medicalQuestionsModel: MedicalQuestionsModel
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${baseUrl}`, medicalQuestionsModel)
      .pipe(retry(3));
  }

  public updateMedicalQuestionsModel(
    medicalQuestionsModel: MedicalQuestionsModel
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${baseUrl}`, medicalQuestionsModel)
      .pipe(retry(3));
  }

  public deleteUpdateMedicalModel(
    deleteProfile: DeleteProfileOrMedical
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${baseUrl}/delete`, deleteProfile)
      .pipe(retry(3));
  }
}
