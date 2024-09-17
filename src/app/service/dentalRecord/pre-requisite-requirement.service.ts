import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { PreRequisiteDto } from 'src/app/model/interface/preRequisiteModel/pre-requisite-dto';
import { PreRequisiteModel } from 'src/app/model/interface/preRequisiteModel/pre-requisite-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { XrayTakenDisplayDataRequest } from 'src/app/model/interface/xrayTakenModel/xray-taken-display-data-request';
import { XrayTakenImageDetails } from 'src/app/model/interface/xrayTakenModel/xray-taken-image-details';
import { XrayTakenImageTempRemove } from 'src/app/model/interface/xrayTakenModel/xray-taken-image-temp-remove';
import { XrayTakenPaginationDataRequest } from 'src/app/model/interface/xrayTakenModel/xray-taken-pagination-data-request';
import { XrayTakenPermanentDataRequest } from 'src/app/model/interface/xrayTakenModel/xray-taken-permanent-data-request';
import { XrayTakenTempImageRequest } from 'src/app/model/interface/xrayTakenModel/xray-taken-temp-image-request';
import { XrayTakenTempImageResponse } from 'src/app/model/interface/xrayTakenModel/xray-taken-temp-image-response';

const baseUrl = 'http://localhost:9090/api/v1/preRequisite';
// const baseUrl = 'http://localhost:8086/api/v1/preRequisite';

@Injectable({
  providedIn: 'root',
})
export class PreRequisiteRequirementService {
  constructor(private http: HttpClient) {}

  public getXrayTakenPagination(
    paginationData: XrayTakenPaginationDataRequest
  ): Observable<XrayTakenImageDetails[]> {
    console.log(
      'url = ' + `${baseUrl}/details` + this.convertToHttpParams(paginationData)
    );
    return this.http
      .get<XrayTakenImageDetails[]>(`${baseUrl}/images/details`, {
        params: this.convertToHttpParams(paginationData),
      })
      .pipe(retry(3));
  }

  public getXrayTakenDisplay(
    displayDataRequest: XrayTakenDisplayDataRequest
  ): Observable<XrayTakenImageDetails> {
    console.log(
      'url = ' +
        `${baseUrl}/display` +
        this.convertToHttpParams(displayDataRequest)
    );
    return this.http
      .get<XrayTakenImageDetails>(`${baseUrl}/images/display`, {
        params: this.convertToHttpParams(displayDataRequest),
      })
      .pipe(retry(3));
  }

  public getXrayTakenTempImages(
    tempImages: XrayTakenTempImageRequest
  ): Observable<XrayTakenTempImageResponse[]> {
    console.log(
      'url = ' + `${baseUrl}/temp` + this.convertToHttpParams(tempImages)
    );
    return this.http
      .get<XrayTakenTempImageResponse[]>(`${baseUrl}/images/temp`, {
        params: this.convertToHttpParams(tempImages),
      })
      .pipe(retry(3));
  }

  public getPreRequisite(
    getPreRequisite: PreRequisiteDto
  ): Observable<PreRequisiteModel> {
    console.log(
      'url = ' + `${baseUrl}` + this.convertToHttpParams(getPreRequisite)
    );
    return this.http
      .get<PreRequisiteModel>(`${baseUrl}`, {
        params: this.convertToHttpParams(getPreRequisite),
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

  public uploadTempXrayImages(
    formData: FormData
  ): Observable<HttpEvent<CustomHttpResponse>> {
    return this.http.post<CustomHttpResponse>(`${baseUrl}/images`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  public createPreRequisite(
    preRequisiteModel: PreRequisiteModel
  ): Observable<CustomHttpResponse> {
    return this.http
      .post<CustomHttpResponse>(`${baseUrl}`, preRequisiteModel)
      .pipe(retry(3));
  }

  public updateXrayTakenImageToPermanent(
    xrayTakenPermanentDataRequest: XrayTakenPermanentDataRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(
        `${baseUrl}/images`,
        xrayTakenPermanentDataRequest
      )
      .pipe(retry(3));
  }

  public updateXrayTakenImageDisplay(
    xrayTakenPermanentDataRequest: XrayTakenPermanentDataRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .put<CustomHttpResponse>(
        `${baseUrl}/images/display`,
        xrayTakenPermanentDataRequest
      )
      .pipe(retry(3));
  }

  public deleteXrayTakenData(
    xrayTakenPermanentDataRequest: XrayTakenPermanentDataRequest
  ): Observable<CustomHttpResponse> {
    return this.http
      .delete<CustomHttpResponse>(`${baseUrl}/images`, {
        params: this.convertToHttpParams(xrayTakenPermanentDataRequest),
      })
      .pipe(retry(3));
  }

  public deleteXrayTakenTempData(
    removeTempImage: XrayTakenImageTempRemove
  ): Observable<CustomHttpResponse> {
    return this.http
      .delete<CustomHttpResponse>(`${baseUrl}/images/temp`, {
        params: this.convertToHttpParams(removeTempImage),
      })
      .pipe(retry(3));
  }
}
