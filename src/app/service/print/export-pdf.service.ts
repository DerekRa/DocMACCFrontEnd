import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// const baseUrl = 'http://localhost:9090/api/v1/exportFile';
// const baseUrl = 'http://localhost:8007/api/v1/exportFile';
@Injectable({
  providedIn: 'root',
})
export class ExportPdfService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `http://${environment.localhost}:9090/api/v1/exportFile`;
  }
  public getExportPDFProfile(number: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/exportPDFPatientProfile/${number}`, {
      responseType: 'blob',
    });
  }
  public getExportPDFCertificate(
    profileId: number,
    dateOfProcedure: string,
    createdByName: string,
    createdById: string
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/exportPDFCertificate/${profileId}/${dateOfProcedure}/${createdByName}/${createdById}`,
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
      `${this.baseUrl}/exportPDFPrescription/${profileId}/${dateOfProcedure}`,
      {
        responseType: 'blob',
      }
    );
  }
  public getExportPDFIntraOralBillIndividual(
    profileId: number,
    dateOfProcedure: string,
    category: string,
    procedureDone: string,
    toothNumber: number
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/exportPDFIntraOralBill/${profileId}/${dateOfProcedure}/${category}/${procedureDone}/${toothNumber}`,
      {
        responseType: 'blob',
      }
    );
  }
  public getExportPDFIntraOralBillGroup(
    profileId: number,
    dateOfProcedure: string
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/exportPDFIntraOralBill/${profileId}/${dateOfProcedure}`,
      {
        responseType: 'blob',
      }
    );
  }
}
