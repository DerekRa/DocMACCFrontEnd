import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry } from 'rxjs';
import { DeleteProfileOrMedical } from 'src/app/model/interface/profileModel/delete-profile';
import { Name } from 'src/app/model/interface/profileModel/name';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { ProfileModelList } from 'src/app/model/interface/profileModel/profile-model-list';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { environment } from 'src/environments/environment';
import { AppServicesConstants } from '../constants/app-services.constants';

@Injectable({
  providedIn: 'root',
})
export class ProfileModelService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:${environment.port}${AppServicesConstants.PROFILE_API_URL}`;
  }

  public getProfileModelList(): Observable<ProfileModelList> {
    return this.http.get<ProfileModelList>(`${this.baseUrl}`);
  }
  // ** This method is not being used right now **
  public getProfileModelListPerPage(
    pageNo: number,
    pageSize: number,
    sortBy: string,
    orderBy: string,
  ): Observable<HttpResponse<ProfileModelList>> {
    return this.http.get<ProfileModelList>(
      `${this.baseUrl}/pagingAndSorting/${pageNo}/${pageSize}/${sortBy}/${orderBy}`,
      {
        observe: 'response',
        withCredentials: true,
      },
    );
  }
  public getFullNameListPerPage(
    pageNo: number,
    pageSize: number,
    sortBy: string,
    orderBy: string,
    lastName: string,
  ): Observable<HttpResponse<Name[]>> {
    return this.http
      .get<Name[]>(
        `${this.baseUrl}/pagingAndSorting/names/${pageNo}/${pageSize}/${sortBy}/${orderBy}/${lastName}`,
        {
          observe: 'response',
          withCredentials: true,
        },
      )
      .pipe(retry(2));
  }
  public getProfileModel(number: number): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${this.baseUrl}/${number}`).pipe(
      retry(3),
      catchError((error: any) => {
        return of();
      }),
    );
  }
  public getImageURL(): string {
    return this.baseUrl + '/picture/';
  }
  public createProfileModel(
    profileModel: ProfileModel,
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${this.baseUrl}`, profileModel)
      .pipe(retry(3));
  }
  public uploadPicture(formData: FormData): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${this.baseUrl}/picture`, formData)
      .pipe(retry(3));
  }
  public updateProfileModel(
    profileModel: ProfileModel,
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${this.baseUrl}`, profileModel)
      .pipe(retry(3));
  }
  public deleteProfileModel(
    deleteProfile: DeleteProfileOrMedical,
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${this.baseUrl}/delete`, deleteProfile)
      .pipe(retry(3));
  }
}
