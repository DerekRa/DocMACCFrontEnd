import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, of, retry } from 'rxjs';
import { ProfileModelList } from 'src/app/model/interface/profileModel/profile-model-list';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { DeleteProfileOrMedical } from 'src/app/model/interface/profileModel/delete-profile';
import { Name } from 'src/app/model/interface/profileModel/name';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';

const baseUrl = 'http://localhost:9090/api/v1/profile';
// const baseUrl = 'http://localhost:8009/api/v1/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileModelService {
  constructor(private http: HttpClient) {}

  public getProfileModelList(): Observable<ProfileModelList> {
    return this.http.get<ProfileModelList>(`${baseUrl}`);
  }

  public getProfileModelListPerPage(
    pageNo: number,
    pageSize: number,
    sortBy: string,
    orderBy: string
  ): Observable<HttpResponse<ProfileModelList>> {
    return this.http.get<ProfileModelList>(
      `${baseUrl}/pagingAndSorting/${pageNo}/${pageSize}/${sortBy}/${orderBy}`,
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  public getFullNameListPerPage(
    pageNo: number,
    pageSize: number,
    sortBy: string,
    orderBy: string,
    lastName: string
  ): Observable<HttpResponse<Name[]>> {
    return this.http
      .get<Name[]>(
        `${baseUrl}/pagingAndSorting/names/${pageNo}/${pageSize}/${sortBy}/${orderBy}/${lastName}`,
        {
          observe: 'response',
          withCredentials: true,
        }
      )
      .pipe(retry(2));
  }

  public getProfileModel(number: number): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${baseUrl}/${number}`).pipe(
      retry(3),
      catchError((error: any) => {
        return of();
      })
    );
  }

  public getImageURL(): string {
    return baseUrl + '/picture/';
  }

  public createProfileModel(
    profileModel: ProfileModel
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${baseUrl}`, profileModel)
      .pipe(retry(3));
  }

  public uploadPicture(formData: FormData): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${baseUrl}/picture`, formData)
      .pipe(retry(3));
  }

  public updateProfileModel(
    profileModel: ProfileModel
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${baseUrl}`, profileModel)
      .pipe(retry(3));
  }

  public deleteProfileModel(
    deleteProfile: DeleteProfileOrMedical
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${baseUrl}/delete`, deleteProfile)
      .pipe(retry(3));
  }
}
