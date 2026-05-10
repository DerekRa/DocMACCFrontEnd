import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdditionalChargeHistoryResponse } from 'src/app/model/interface/billModel/orthodonticBill/additional-charge-history-response';
import { PaymentOrChargePaginationRequest } from 'src/app/model/interface/billModel/orthodonticBill/payment-or-charge-pagination-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { OrthodonticBillService } from 'src/app/service/billRecord/orthodontic-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-additional-charge-history',
  templateUrl: './additional-charge-history.component.html',
  styleUrls: ['./additional-charge-history.component.scss'],
})
export class AdditionalChargeHistoryComponent implements OnInit {
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
  public orthodonticData: AdditionalChargeHistoryResponse[] | any;
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

    this.orthodonticBillService
      .getAdditionalChargeHistory(dataPagination)
      .subscribe(
        (response: AdditionalChargeHistoryResponse[]) => {
          this.orthodonticData = response;
        },
        (error: any) => {
          this.orthodonticData = [];
        },
      );
    this.orthodonticBillService
      .getAdditionalChargeHistory(dataPaginationLength)
      .subscribe(
        (response: AdditionalChargeHistoryResponse[]) => {
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
    if (event.target.innerText.replace(/\s/g, '') == 'Charged') {
      this.sortBy = 'additionalChargeAmount';
    } else if (event.target.innerText.replace(/\s/g, '') == 'DateOfChange') {
      this.sortBy = 'createdDate';
    } else if (event.target.innerText.replace(/\s/g, '') == 'ReasonOfChange') {
      this.sortBy = 'chargeReasonChange';
    } else if (event.target.innerText.replace(/\s/g, '') == 'PersonInCharge') {
      this.sortBy = 'createdByName';
    }
    this.onGetTableData();
  }

  public onChangeCharged(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'additionalChargeAmount';
    this.onGetTableData();
  }

  public onChangeDate(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'createdDate';
    this.onGetTableData();
  }

  public onChangeReason(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'chargeReasonChange';
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
