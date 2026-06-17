import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakdownOrBillChangesPaginationRequest } from 'src/app/model/interface/billModel/orthodonticBill/breakdown-or-bill-changes-pagination-request';
import { BreakdownResponse } from 'src/app/model/interface/billModel/orthodonticBill/breakdown-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { OrthodonticBillService } from 'src/app/service/billRecord/orthodontic-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { ExportPdfService } from 'src/app/service/print/export-pdf.service';

@Component({
  selector: 'app-bill-breakdown',
  templateUrl: './bill-breakdown.component.html',
  styleUrls: ['./bill-breakdown.component.scss'],
})
export class BillBreakdownComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.billId = this.route.snapshot.params['billId'];
    this.dateOfBill = this.route.snapshot.params['dateOfBill'];
    this.onGetProfileModel();
    this.onGetTableData();
  }

  constructor(
    private profileModelService: ProfileModelService,
    private orthodonticBillService: OrthodonticBillService,
    private exportPdfService: ExportPdfService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public id: any;
  public billId: any;
  public dateOfBill: string = '';
  public profileModel: ProfileModel | undefined;
  public billBreakdown: BreakdownResponse | any = [];
  public pageNoDisplay: number = 1;
  public paginationSize: number = 20;
  public paginationTotalItems: number | any;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;
  public percentDone: number = 0;

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  private onGetTableData() {
    const pageNo = this.pageNoDisplay - 1;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const dataPagination: BreakdownOrBillChangesPaginationRequest = {
      billId: this.billId,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const dataPaginationLength: BreakdownOrBillChangesPaginationRequest = {
      billId: this.billId,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };

    this.orthodonticBillService.getBillBreakdown(dataPagination).subscribe(
      (response: BreakdownResponse[]) => {
        console.log('response', response);
        this.billBreakdown = response;
      },
      (error: any) => {
        this.billBreakdown = [];
      },
    );

    this.orthodonticBillService
      .getBillBreakdown(dataPaginationLength)
      .subscribe(
        (response: BreakdownResponse[]) => {
          this.paginationTotalItems = response.length;
        },
        (error: any) => {
          this.paginationTotalItems = 0;
        },
      );
  }

  public onChangeShowPage(event: any) {
    this.paginationSize = event.target.value;
    this.onGetTableData();
  }

  public onChangeSearchAll(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'searchAllColumns';
    this.onGetTableData();
  }

  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }

  updateBill() {
    if (this.billId !== undefined) {
      // bill-records/orthodontic/patients/:id/:billId/:dateOfBill/update-bill
      this.router.navigate([
        'bill-records/orthodontic/patients/',
        this.id,
        this.billId,
        this.dateOfBill,
        'update-bill',
      ]);
    }
  }

  addAdditionalCharge() {
    if (this.billId !== undefined) {
      this.router.navigate([
        'bill-records/orthodontic/patients/',
        this.id,
        this.billId,
        this.dateOfBill,
        'add-charge',
      ]);
    }
  }

  addPayment() {
    if (this.billId !== undefined) {
      this.router.navigate([
        'bill-records/orthodontic/patients/',
        this.id,
        this.billId,
        this.dateOfBill,
        'payment',
      ]);
    }
  }

  viewPaymentHistory(transactionId: number) {
    this.router.navigate([
      'bill-records/orthodontic/patients/',
      this.id,
      this.billId,
      this.dateOfBill,
      'payment-changes-history',
      transactionId,
    ]);
  }

  viewAdditionalChargeHistory(transactionId: number) {
    this.router.navigate([
      'bill-records/orthodontic/patients/',
      this.id,
      this.billId,
      this.dateOfBill,
      'additional-charge-changes-history',
      transactionId,
    ]);
  }

  updatePayment(transactionId: number) {
    this.router.navigate([
      'bill-records/orthodontic/patients/',
      this.id,
      this.billId,
      this.dateOfBill,
      'update-payment',
      transactionId,
    ]);
  }

  updateAdditionalCharge(transactionId: number) {
    this.router.navigate([
      'bill-records/orthodontic/patients/',
      this.id,
      this.billId,
      this.dateOfBill,
      'update-additional-charge',
      transactionId,
    ]);
  }

  public printPDFBillBreakdown() {
    this.exportPdfService
      .getExportPDFOrthodonticBillBreakdown(this.id, this.billId)
      .subscribe((response: any) => {
        if (response.type === HttpEventType.DownloadProgress) {
          //Percent done of the file download
          this.percentDone = Math.round(
            (100 * response.loaded) / response.total,
          );
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
            '_Orthodontic_Bills' +
            '.pdf'
          : 'blankpage.pdf';
        document.body.appendChild(a);
        a.click();
      });
  }
  printPDFBillIndividual() {}
}
