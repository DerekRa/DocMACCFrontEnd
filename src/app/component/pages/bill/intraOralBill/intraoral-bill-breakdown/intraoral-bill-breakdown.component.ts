import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillBreakdownResponse } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdown-response';
import { BillBreakdwonRequest } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdwon-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { IntraoralBillService } from 'src/app/service/billRecord/intraoral-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
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
    console.log('this.dateOfProcedure = ' + this.dateOfProcedure);
    const urlPathName = window.location.pathname;
    const paramsURL = urlPathName.split('/');
    console.log('paramsURL[1] = ' + paramsURL[1]);
    if (paramsURL[1] == 'dental-records') {
      this.pageLocation = 'Treatment';
    } else if (paramsURL[1] == 'bill-records') {
      this.pageLocation = 'Bill';
    }
    console.log('urlPathName = ' + urlPathName);
    this.onGetProfileModel();
    this.onGetTableData();
  }
  constructor(
    private profileModelService: ProfileModelService,
    private intraoralBillService: IntraoralBillService,
    private exportPdfService: ExportPdfService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  public id: any;
  public profileModel: ProfileModel | undefined;
  public billBreakdown: BillBreakdownResponse | any = {};
  public pageLocation: string = '';
  public dateOfProcedure: string = '';
  public percentDone: number = 0;
  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe(
      (response) => {
        this.profileModel = response;
      },
      (error: any) => {
        console.log(error);
      },
      () =>
        console.log(
          'Done getting single profile using bill intraoral component..'
        )
    );
  }
  private onGetTableData() {
    const billBreakdwonRequest: BillBreakdwonRequest = {
      profileId: this.id,
      dateOfProcedure: this.dateOfProcedure,
    };
    this.intraoralBillService
      .getBillTotalBreakdown(billBreakdwonRequest)
      .subscribe(
        (response: BillBreakdownResponse) => {
          console.log('response');
          console.log(response);
          this.billBreakdown = response;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );
  }
  public viewAmountProcedure(procedureNumber: number) {
    console.log(
      'view amount procedure with date of procedure : ' + this.dateOfProcedure
    );
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
    console.log(
      'view amount procedure with date of procedure : ' + this.dateOfProcedure
    );
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
    console.log(
      'view amount procedure with date of procedure : ' + this.dateOfProcedure
    );
    console.log(procedureNumber);
    const procedureParam = procedureNumber + 1;
    console.log(procedureParam);
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
    console.log(
      'view amount paid with date of procedure : ' + this.dateOfProcedure
    );
    console.log(procedureNumber);
    const procedureParam = procedureNumber + 1;
    console.log(procedureParam);
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
    this.exportPdfService
      .getExportPDFIntraOralBillGroup(id, this.dateOfProcedure)
      .subscribe(
        (response: any) => {
          if (response.type === HttpEventType.DownloadProgress) {
            this.percentDone = Math.round(
              (100 * response.loaded) / response.total
            );
            console.log(`Downloaded ${this.percentDone}%`);
          }
          var file = new Blob([response], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          // if you want to open PDF in new tab
          // window.open(response);
          var a = document.createElement('a');
          a.href = fileURL;
          a.target = '_blank';
          a.download = this.profileModel?.name?.lastName
            ? this.profileModel?.name?.lastName +
              this.profileModel?.name?.firstName +
              this.profileModel?.name?.middleName +
              '_Bills' +
              '.pdf'
            : 'blankpage.pdf';
          document.body.appendChild(a);
          a.click();
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done getting pdf profile..')
      );
  }
  public printPDFBillIndividual(id: any, breakdown: any) {
    console.log('breakdown.procedureDone ===== ' + breakdown.procedureDone);
    console.log(
      'breakdown.procedureDone ===== ' +
        breakdown.procedureDone.replaceAll(' ', '+')
    );
    this.exportPdfService
      .getExportPDFIntraOralBillIndividual(
        id,
        this.dateOfProcedure,
        breakdown.category,
        breakdown.procedureDone,
        breakdown.toothNumbers
      )
      .subscribe(
        (response: any) => {
          if (response.type === HttpEventType.DownloadProgress) {
            this.percentDone = Math.round(
              (100 * response.loaded) / response.total
            );
            console.log(`Downloaded ${this.percentDone}%`);
          }
          var file = new Blob([response], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          // if you want to open PDF in new tab
          // window.open(response);
          var a = document.createElement('a');
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
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done getting pdf profile..')
      );
  }
}
