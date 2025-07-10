import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { AmountDataPaginationRequest } from 'src/app/model/interface/billModel/intraOralBill/amount-data-pagination-request';
import { AmountPaymentResponse } from 'src/app/model/interface/billModel/intraOralBill/amount-payment-response';
import { BillBreakdown } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdown';
import { BillBreakdownResponse } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdown-response';
import { BillBreakdwonRequest } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdwon-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { IntraoralBillService } from 'src/app/service/billRecord/intraoral-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-amount-paid-history',
  templateUrl: './amount-paid-history.component.html',
  styleUrls: ['./amount-paid-history.component.scss'],
})
export class AmountPaidHistoryComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.dateOfProcedure = this.route.snapshot.params['dateofProcedure'];
    this.procedureNumber = this.route.snapshot.params['procedureNumber'];
    this.onGetProfileModel();
    this.onGetBreakdownData();

    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    console.log('::::::::');
    console.log(this.userProfile);
  }
  constructor(
    private profileModelService: ProfileModelService,
    private intraoralBillService: IntraoralBillService,
    private route: ActivatedRoute,
    private readonly keycloak: KeycloakService
  ) {}
  public id: any;
  public profileModel: ProfileModel | undefined;
  public billBreakdown: BillBreakdownResponse | any = {};
  public breakdown: BillBreakdown | any = {};
  public amountPaymentHistory: AmountPaymentResponse[] = [];
  public dateOfProcedure: string = '';
  public procedureNumber: string = '';
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
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
      () =>
        console.log(
          'Done getting single profile using amount charged history component..'
        )
    );
  }
  private onGetBreakdownData() {
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
          console.log('this.billBreakdown = ' + this.billBreakdown);
          console.log(
            'this.billBreakdown = ' + this.billBreakdown.billBreakdowns
          );
          console.log(this.billBreakdown.billBreakdowns);
          const getProcedure = Number(this.procedureNumber) - 1;
          console.log('getProcedure :' + getProcedure);
          for (let i = 0; i < this.billBreakdown.billBreakdowns.length; i++) {
            if (i == getProcedure) {
              this.breakdown = this.billBreakdown.billBreakdowns[i];
              console.log('this.breakdown ');
              console.log(this.breakdown);
            }
          }
          this.onGetTableData();
        },
        (error: any) => console.log(error),
        () => console.log('Done getting intraoral bill breakdown..')
      );
  }
  private onGetTableData() {
    const pageNo = this.pageNoDisplay - 1;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const amountDataPaginationRequest: AmountDataPaginationRequest = {
      profileId: this.id,
      dateOfProcedure: this.dateOfProcedure,
      category: this.breakdown.category,
      procedureDone: this.breakdown.procedureDone,
      toothNumber: this.breakdown.toothNumber,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const amountDataPaginationLengthRequest: AmountDataPaginationRequest = {
      profileId: this.id,
      dateOfProcedure: this.dateOfProcedure,
      category: this.breakdown.category,
      procedureDone: this.breakdown.procedureDone,
      toothNumber: this.breakdown.toothNumber,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    this.intraoralBillService
      .getAmountPaymentHistory(amountDataPaginationRequest)
      .subscribe(
        (response: AmountPaymentResponse[]) => {
          console.log('response');
          console.log(response);
          this.amountPaymentHistory = response;
        },
        (error: any) => {
          console.log(error);
        },
        () =>
          console.log('Done getting intraoral bill amount charged history..')
      );

    this.intraoralBillService
      .getAmountPaymentHistory(amountDataPaginationLengthRequest)
      .subscribe(
        (response: AmountPaymentResponse[]) => {
          console.log('response for paginationTotalItems');
          console.log(response);
          console.log(response.length);
          this.paginationTotalItems = response.length;
        },
        (error: any) => {
          console.log(error);
        },
        () =>
          console.log('Done getting intraoral bill amount charged history..')
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
      this.sortBy = 'note';
    } else if (event.target.innerText.replace(/\s/g, '') == 'In-Charge') {
      this.sortBy = 'createdByName';
    }
    this.onGetTableData();
  }
  public onChangePayment(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'paymentAmount';
    this.onGetTableData();
  }
  public onChangeNote(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'note';
    this.onGetTableData();
  }
  public onChangeCreatedDate(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'createdDate';
    this.onGetTableData();
  }
  public onChangeCreatedByName(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'createdByName';
    this.onGetTableData();
  }
  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
}
