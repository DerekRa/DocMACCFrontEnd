import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppServicesConstants } from '../constants/app-services.constants';

@Injectable({
  providedIn: 'root',
})
export class ExportPdfService {
  private baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.localhost}:${environment.port}${AppServicesConstants.EXPORT_PDF_API_URL}`;
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
    createdById: string,
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/exportPDFCertificate/${profileId}/${dateOfProcedure}/${createdByName}/${createdById}`,
      {
        responseType: 'blob',
      },
    );
  }
  public getExportPDFPrescription(
    profileId: number,
    dateOfProcedure: string,
    careOfMouth: string,
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/exportPDFPrescription/${profileId}/${dateOfProcedure}/${careOfMouth}`,
      {
        responseType: 'blob',
      },
    );
  }
  public getExportPDFIntraOralBillIndividual(
    profileId: number,
    dateOfProcedure: string,
    category: string,
    procedureDone: string,
    toothNumbers: string,
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/exportPDFIntraOralBill/${profileId}/${dateOfProcedure}/${category}/${procedureDone}/${toothNumbers}`,
      {
        responseType: 'blob',
      },
    );
  }
  public getExportPDFIntraOralBillGroup(
    profileId: number,
    dateOfProcedure: string,
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/exportPDFIntraOralBill/${profileId}/${dateOfProcedure}`,
      {
        responseType: 'blob',
      },
    );
  }
  public getExportPDFOrthodonticBillBreakdown(
    profileId: number,
    billId: number,
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/exportPDFOrthodonticBill/${profileId}/${billId}`,
      {
        responseType: 'blob',
      },
    );
  }
}
