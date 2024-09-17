import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:9090/api/v1/exportFile';
// const baseUrl = 'http://localhost:8007/api/v1/exportFile';
@Injectable({
  providedIn: 'root',
})
export class ExportPdfService {
  constructor(private http: HttpClient) {}
  public getExportPDFProfile(number: number): Observable<any> {
    return this.http.get(`${baseUrl}/exportPDFPatientProfile/${number}`, {
      responseType: 'blob',
    });
  }
  public getExportPDFCertificate(
    profileId: number,
    dateOfProcedure: string,
    createdBy: number
  ): Observable<any> {
    return this.http.get(
      `${baseUrl}/exportPDFCertificate/${profileId}/${dateOfProcedure}/${createdBy}`,
      {
        responseType: 'blob',
      }
    );
  }
  public getExportPDFPrescription(
    profileId: number,
    dateOfProcedure: string
  ): Observable<any> {
    return this.http.get(
      `${baseUrl}/exportPDFPrescription/${profileId}/${dateOfProcedure}`,
      {
        responseType: 'blob',
      }
    );
  }
}
