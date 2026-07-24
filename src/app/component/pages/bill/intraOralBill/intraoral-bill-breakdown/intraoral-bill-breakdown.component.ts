import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillBreakdownResponse } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdown-response';
import { BillBreakdwonRequest } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdwon-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { IntraoralBillService } from 'src/app/service/billRecord/intraoral-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { GlobalLoadingService } from 'src/app/service/loading/global-loading.service';
import { ExportPdfService } from 'src/app/service/print/export-pdf.service';

@Component({
  selector: 'app-intraoral-bill-breakdown',
  templateUrl: './intraoral-bill-breakdown.component.html',
  styleUrls: ['./intraoral-bill-breakdown.component.scss'],
})
export class IntraoralBillBreakdownComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.dateOfProcedure = this.route.snapshot.params['dateofProcedure'];
    const urlPathName = window.location.pathname;
    const paramsURL = urlPathName.split('/');
    if (paramsURL[1] == 'dental-records') {
      this.pageLocation = 'Treatment';
    } else if (paramsURL[1] == 'bill-records') {
      this.pageLocation = 'Bill';
    }
    this.onGetProfileModel();
    this.onGetTableData();
  }
  constructor(
    private profileModelService: ProfileModelService,
    private intraoralBillService: IntraoralBillService,
    private exportPdfService: ExportPdfService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: GlobalLoadingService,
  ) {}

  public id: any;
  public profileModel: ProfileModel | undefined;
  public billBreakdown: BillBreakdownResponse | any = {};
  public pageLocation: string = '';
  public dateOfProcedure: string = '';
  public percentDone: number = 0;

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  private onGetTableData() {
    const billBreakdwonRequest: BillBreakdwonRequest = {
      profileId: this.id,
      dateOfProcedure: this.dateOfProcedure,
    };
    this.intraoralBillService
      .getBillTotalBreakdown(billBreakdwonRequest)
      .subscribe((response: BillBreakdownResponse) => {
        this.billBreakdown = response;
      });
  }

  public viewAmountProcedure(procedureNumber: number) {
    const procedureParam = procedureNumber + 1;
    if (this.dateOfProcedure !== undefined) {
      this.router.navigate([
        'bill-records/intraoral/patients/' +
          this.id +
          '/' +
          this.dateOfProcedure +
          '/amount-procedure/' +
          procedureParam,
      ]);
    }
  }

  public viewPaymentProcedure(procedureNumber: number) {
    const procedureParam = procedureNumber + 1;
    if (this.dateOfProcedure !== undefined) {
      this.router.navigate([
        'bill-records/intraoral/patients/' +
          this.id +
          '/' +
          this.dateOfProcedure +
          '/payment-procedure/' +
          procedureParam,
      ]);
    }
  }

  public viewAmountChargedHistory(procedureNumber: number) {
    const procedureParam = procedureNumber + 1;
    if (this.dateOfProcedure !== undefined) {
      this.router.navigate([
        'bill-records/intraoral/patients/' +
          this.id +
          '/' +
          this.dateOfProcedure +
          '/amount-charged-history/' +
          procedureParam,
      ]);
    }
  }

  public viewAmountPaidHistory(procedureNumber: number) {
    const procedureParam = procedureNumber + 1;
    if (this.dateOfProcedure !== undefined) {
      this.router.navigate([
        'bill-records/intraoral/patients/' +
          this.id +
          '/' +
          this.dateOfProcedure +
          '/amount-paid-history/' +
          procedureParam,
      ]);
    }
  }

  public printPDFBillBreakdown(id: any) {
    this.loadingService.loadingOn();
    this.percentDone = 0;

    this.exportPdfService
      .getExportPDFIntraOralBillGroup(id, this.dateOfProcedure)
      .subscribe({
        next: (response: any) => {
          if (
            response.type === HttpEventType.DownloadProgress &&
            typeof response.total === 'number' &&
            response.total > 0
          ) {
            this.percentDone = Math.round(
              (100 * response.loaded) / response.total,
            );
            this.loadingService.setProgress(this.percentDone);
          }

          if (response.type === HttpEventType.Response && response.body) {
            this.percentDone = 100;
            this.loadingService.setProgress(100);
            this.loadingService.loadingOff();

            const file = new Blob([response.body], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = fileURL;
            a.target = '_blank';
            a.download = this.profileModel?.name?.lastName
              ? this.profileModel?.name?.lastName +
                this.profileModel?.name?.firstName +
                this.profileModel?.name?.middleName +
                '_IntraOral_Bills' +
                '.pdf'
              : 'blankpage.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(fileURL);
          }
        },
        error: () => {
          this.percentDone = 0;
          this.loadingService.loadingOff();
        },
      });
  }

  public printPDFBillIndividual(id: any, breakdown: any) {
    this.loadingService.loadingOn();
    this.percentDone = 0;

    this.exportPdfService
      .getExportPDFIntraOralBillIndividual(
        id,
        this.dateOfProcedure,
        breakdown.category,
        breakdown.procedureDone,
        breakdown.toothNumbers,
      )
      .subscribe({
        next: (response: any) => {
          if (
            response.type === HttpEventType.DownloadProgress &&
            typeof response.total === 'number' &&
            response.total > 0
          ) {
            this.percentDone = Math.round(
              (100 * response.loaded) / response.total,
            );
            this.loadingService.setProgress(this.percentDone);
          }

          if (response.type === HttpEventType.Response && response.body) {
            this.percentDone = 100;
            this.loadingService.setProgress(100);
            this.loadingService.loadingOff();

            const file = new Blob([response.body], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = fileURL;
            a.target = '_blank';
            a.download = this.profileModel?.name?.lastName
              ? this.profileModel?.name?.lastName +
                this.profileModel?.name?.firstName +
                this.profileModel?.name?.middleName +
                '_Bill' +
                '.pdf'
              : 'blankpage.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(fileURL);
          }
        },
        error: () => {
          this.percentDone = 0;
          this.loadingService.loadingOff();
        },
      });
  }
}
