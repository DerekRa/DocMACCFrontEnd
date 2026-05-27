import { Observable, retry } from 'rxjs';
import { ImageDetails } from 'src/app/model/interface/preProcedureModel/image-details';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppServicesConstants } from '../constants/app-services.constants';

@Injectable({
  providedIn: 'root',
})
export class PreProcedureRequirementService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:${environment.port}${AppServicesConstants.PRE_PROCEDURE_API_URL}`;
  }

  // Backend (getAllImagesDataList)
  public getPreProcedureRequirementPerPage(
    item_name: string,
    location: string,
    profileId: number,
    pageNo: number,
    pageSize: number,
    sortBy: string,
    orderBy: string,
    findItem: string,
  ): Observable<ImageDetails[]> {
    return this.http
      .get<
        ImageDetails[]
      >(`${this.baseUrl}/details/${item_name}/${location}/${profileId}/${pageNo}/${pageSize}/${sortBy}/${orderBy}/${findItem}`)
      .pipe(retry(3));
  }
  // Backend (getDisplayImages)
  public getPreProcedureDisplay(
    item_name: string,
    location: string,
    profileId: number,
  ): Observable<ImageDetails[]> {
    return this.http
      .get<
        ImageDetails[]
      >(`${this.baseUrl}/details/${item_name}/${location}/${profileId}`)
      .pipe(retry(3));
  }
  // Backend (uploadFile)
  public uploadImages(formData: FormData): Observable<any> {
    return this.http.post<CustomHttpResponse>(`${this.baseUrl}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
  // Backend (updateFiles)
  public updateImages(formData: FormData): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${this.baseUrl}`, formData)
      .pipe(retry(3));
  }
  // Backend (updateImageDisplay)
  public updateDisplayImage(
    formData: FormData,
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${this.baseUrl}/display`, formData)
      .pipe(retry(3));
  }
  // Backend (deleteFile)
  public deletePreProcedureRequirement(
    itemName: string,
    location: string,
    nameHashType: string,
    updatedByName: string,
    updatedById: string,
  ): Observable<CustomHttpResponse> {
    return this.http
      .delete<CustomHttpResponse>(
        `${this.baseUrl}/` +
          itemName +
          `/` +
          location +
          `/` +
          nameHashType +
          `/` +
          updatedByName +
          `/` +
          updatedById,
      )
      .pipe(retry(3));
  }
}
