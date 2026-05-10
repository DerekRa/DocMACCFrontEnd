import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentHistoryResponse } from 'src/app/model/interface/billModel/orthodonticBill/payment-history-response';
import { PaymentOrChargePaginationRequest } from 'src/app/model/interface/billModel/orthodonticBill/payment-or-charge-pagination-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { OrthodonticBillService } from 'src/app/service/billRecord/orthodontic-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.billId = this.route.snapshot.params['billId'];
    this.dateOfBill = this.route.snapshot.params['dateOfBill'];
    this.transactionId = this.route.snapshot.params['transactionId'];
    this.onGetProfileModel();
    this.onGetTableData();
  }

  constructor(
    private profileModelService: ProfileModelService,
    private orthodonticBillService: OrthodonticBillService,
    private route: ActivatedRoute,
  ) {}

  public id: any;
  public billId: any;
  public transactionId: any;
  public profileModel: ProfileModel | undefined;
  public dateOfBill: any = '';
  public orthodonticData: PaymentHistoryResponse[] | any;
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public paginationTotalItems: number | any;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  private onGetTableData() {
    const pageNo = this.pageNoDisplay - 1;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const dataPagination: PaymentOrChargePaginationRequest = {
      transactionId: this.transactionId,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const dataPaginationLength: PaymentOrChargePaginationRequest = {
      transactionId: this.transactionId,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };

    this.orthodonticBillService.getPaymentHistory(dataPagination).subscribe(
      (response: PaymentHistoryResponse[]) => {
        this.orthodonticData = response;
      },
      (error: any) => {
        this.orthodonticData = [];
      },
    );

    this.orthodonticBillService
      .getPaymentHistory(dataPaginationLength)
      .subscribe(
        (response: PaymentHistoryResponse[]) => {
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

  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'Payment') {
      this.sortBy = 'paymentAmount';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Note') {
      this.sortBy = 'paymentNote';
    } else if (event.target.innerText.replace(/\s/g, '') == 'DateOfChange') {
      this.sortBy = 'createdDate';
    } else if (event.target.innerText.replace(/\s/g, '') == 'ReasonOfChange') {
      this.sortBy = 'paymentReasonChange';
    } else if (event.target.innerText.replace(/\s/g, '') == 'PersonInCharge') {
      this.sortBy = 'createdByName';
    }
    this.onGetTableData();
  }

  public onChangePayment(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'paymentAmount';
    this.onGetTableData();
  }

  public onChangeNote(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'paymentNote';
    this.onGetTableData();
  }

  public onChangeDate(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'createdDate';
    this.onGetTableData();
  }

  public onChangeReason(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'paymentReasonChange';
    this.onGetTableData();
  }

  public onChangePersonInCharge(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'createdByName';
    this.onGetTableData();
  }

  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
}
