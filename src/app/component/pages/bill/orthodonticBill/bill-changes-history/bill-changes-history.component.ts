import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakdownOrBillChangesPaginationRequest } from 'src/app/model/interface/billModel/orthodonticBill/breakdown-or-bill-changes-pagination-request';
import { OrthodonticBillChangesDataResponse } from 'src/app/model/interface/billModel/orthodonticBill/orthodontic-bill-changes-data-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { OrthodonticBillService } from 'src/app/service/billRecord/orthodontic-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-bill-changes-history',
  templateUrl: './bill-changes-history.component.html',
  styleUrls: ['./bill-changes-history.component.scss'],
})
export class BillChangesHistoryComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router
  ) {}
  public id: any;
  public billId: any;
  public profileModel: ProfileModel | undefined;
  public dateOfBill: any = '';
  public orthodonticData: OrthodonticBillChangesDataResponse[] | any;
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public paginationTotalItems: number | any;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;
  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe(
      (response) => {
        this.profileModel = response;
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('Done getting single profile..')
    );
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
    this.orthodonticBillService.getBillChangesHistory(dataPagination).subscribe(
      (response: OrthodonticBillChangesDataResponse[]) => {
        console.log('response');
        console.log(response);
        this.orthodonticData = response;
      },
      (error: any) => {
        console.log('the error is log::' + error);
        this.orthodonticData = [];
      },
      () => console.log('Done getting bill changes history..')
    );
    this.orthodonticBillService
      .getBillChangesHistory(dataPaginationLength)
      .subscribe(
        (response: OrthodonticBillChangesDataResponse[]) => {
          console.log('response for paginationTotalItems');
          console.log(response);
          console.log(response.length);
          this.paginationTotalItems = response.length;
        },
        (error: any) => {
          console.log('error logs::' + error);
          this.paginationTotalItems = 0;
        },
        () => console.log('Done getting bill changes history length..')
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
    if (event.target.innerText.replace(/\s/g, '') == 'BillName') {
      this.sortBy = 'billName';
    } else if (event.target.innerText.replace(/\s/g, '') == 'TotalBill') {
      this.sortBy = 'totalBill';
    } else if (event.target.innerText.replace(/\s/g, '') == 'DateOfChange') {
      this.sortBy = 'createdDate';
    } else if (event.target.innerText.replace(/\s/g, '') == 'ReasonOfChange') {
      this.sortBy = 'reasonChanged';
    } else if (event.target.innerText.replace(/\s/g, '') == 'PersonInCharge') {
      this.sortBy = 'createdByName';
    }
    this.onGetTableData();
  }
  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
  public onChangeBillName(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'billName';
    this.onGetTableData();
  }
  public onChangeTotalBill(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'totalBill';
    this.onGetTableData();
  }
  public onChangeDate(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'createdDate';
    this.onGetTableData();
  }
  public onChangeReason(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'reasonChanged';
    this.onGetTableData();
  }
  public onChangePersonInCharge(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'createdByName';
    this.onGetTableData();
  }
}
