import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillPaginationRequest } from 'src/app/model/interface/billModel/orthodonticBill/bill-pagination-request';
import { DataPaginationRequest } from 'src/app/model/interface/billModel/orthodonticBill/data-pagination-request';
import { OrthodonticBillDataResponse } from 'src/app/model/interface/billModel/orthodonticBill/orthodontic-bill-data-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { OrthodonticBillService } from 'src/app/service/billRecord/orthodontic-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-bill-history',
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.scss'],
})
export class BillHistoryComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel();
    this.onGetTableData();
  }

  constructor(
    private profileModelService: ProfileModelService,
    private orthodonticBillService: OrthodonticBillService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public id: any;
  public profileModel: ProfileModel | undefined;
  public orthodonticData: OrthodonticBillDataResponse[] | any;
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
    const dataPagination: BillPaginationRequest = {
      profileId: this.id,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const dataPaginationLength: BillPaginationRequest = {
      profileId: this.id,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };

    this.orthodonticBillService.getBillHistory(dataPagination).subscribe(
      (response: OrthodonticBillDataResponse[]) => {
        this.orthodonticData = response;
      },
      (error: any) => {
        this.orthodonticData = [];
      },
    );

    this.orthodonticBillService.getBillHistory(dataPaginationLength).subscribe(
      (response: OrthodonticBillDataResponse[]) => {
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
    if (event.target.innerText.replace(/\s/g, '') == 'Date') {
      this.sortBy = 'createdDate';
    } else if (event.target.innerText.replace(/\s/g, '') == 'BillName') {
      this.sortBy = 'billName';
    } else if (event.target.innerText.replace(/\s/g, '') == 'TotalBill') {
      this.sortBy = 'totalBill';
    } else if (event.target.innerText.replace(/\s/g, '') == 'TotalBalance') {
      this.sortBy = 'totalBalance';
    }
    this.onGetTableData();
  }

  public onChangeDate(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'createdDate';
    this.onGetTableData();
  }

  public onChangeBillName(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'billName';
    this.onGetTableData();
  }

  public onChangeTotalBill(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'totalBill';
    this.onGetTableData();
  }
  public onChangeTotalBalance(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'totalBalance';
    this.onGetTableData();
  }

  public viewOrthodonticBreakdown(billId: number, dateOfBill: string) {
    this.router.navigate([
      'bill-records/orthodontic/patients/',
      this.id,
      billId,
      dateOfBill,
    ]);
  }

  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
}
