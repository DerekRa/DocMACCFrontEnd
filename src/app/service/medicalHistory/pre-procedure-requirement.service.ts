import { Observable, retry } from 'rxjs';

import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageDetails } from 'src/app/model/interface/preProcedureModel/image-details';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';

const baseUrl = 'http://localhost:9090/api/v1/preprocedure/images';
// const baseUrl = 'http://localhost:8006/api/v1/preprocedure/images';

@Injectable({
  providedIn: 'root',
})
export class PreProcedureRequirementService {
  constructor(private http: HttpClient) {}

  public getPreProcedureRequirementPerPage(
    item_name: string,
    location: string,
    createdBy: number,
    pageNo: number,
    pageSize: number,
    sortBy: string,
    orderBy: string,
    findItem: string
  ): Observable<ImageDetails[]> {
    console.log(
      'url = ' +
        `${baseUrl}/details/${item_name}/${location}/${createdBy}/${pageNo}/${pageSize}/${sortBy}/${orderBy}/${findItem}`
    );
    return this.http
      .get<ImageDetails[]>(
        `${baseUrl}/details/${item_name}/${location}/${createdBy}/${pageNo}/${pageSize}/${sortBy}/${orderBy}/${findItem}`
      )
      .pipe(retry(3));
  }
  public getPreProcedureDisplay(
    item_name: string,
    location: string,
    updatedBy: number
  ): Observable<ImageDetails[]> {
    return this.http
      .get<ImageDetails[]>(
        `${baseUrl}/details/${item_name}/${location}/${updatedBy}`
      )
      .pipe(retry(3));
  }
  public uploadImages(formData: FormData): Observable<any> {
    return this.http.post<CustomHttpResponse>(`${baseUrl}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
  public updateImages(formData: FormData): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${baseUrl}`, formData)
      .pipe(retry(3));
  }
  public updateDisplayImage(
    formData: FormData
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(`${baseUrl}/display`, formData)
      .pipe(retry(3));
  }
  public deletePreProcedureRequirement(
    itemName: string,
    location: string,
    nameHashType: string
  ): Observable<CustomHttpResponse> {
    return this.http
      .delete<CustomHttpResponse>(
        `${baseUrl}/` + itemName + `/` + location + `/` + nameHashType
      )
      .pipe(retry(3));
  }
}
