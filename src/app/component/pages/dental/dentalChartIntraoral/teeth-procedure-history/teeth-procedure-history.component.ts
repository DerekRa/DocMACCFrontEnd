import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToothConditionHistoryPaginationResponse } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-condition-history-pagination-response';
import { ToothHistoryPaginationRequest } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-history-pagination-request';
import { ToothProcedureHistoryPaginationResponse } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-procedure-history-pagination-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { IntraoralExaminationService } from 'src/app/service/dentalRecord/intraoral-examination.service';

@Component({
  selector: 'app-teeth-procedure-history',
  templateUrl: './teeth-procedure-history.component.html',
  styleUrls: ['./teeth-procedure-history.component.scss'],
})
export class TeethProcedureHistoryComponent implements OnInit {
  constructor(
    private intraoralExaminationService: IntraoralExaminationService,
    private profileModelService: ProfileModelService,
    private route: ActivatedRoute,
    public alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.teethNumbering = this.route.snapshot.params['teethNumbering'];
    this.action = this.route.snapshot.params['action'];
    this.teethHistory = this.route.snapshot.params['history'];
    this.recentHistory =
      this.route.snapshot.params['action'] == 'recent'
        ? 'Recent'
        : this.capitalizeFirstLetter(this.route.snapshot.params['history']);
    this.onGetTableData();
    this.onGetProfileModel();
  }

  public id: any;
  public teethNumbering: any;
  public action: any;
  public teethHistory: any;
  public recentHistory: string = '';
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;
  public paginationTotalItems: number | any;
  public teethProcedureHistoryData: ToothProcedureHistoryPaginationResponse[] =
    [];
  public teethConditionHistoryData: ToothConditionHistoryPaginationResponse[] =
    [];
  public profileModel: ProfileModel | undefined;
  private capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private onGetTableData() {
    const pageNo = this.pageNoDisplay - 1;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const orderBy = this.action == 'history' ? this.orderBy : 'latestHistory';
    const sortBy = this.action == 'history' ? this.sortBy : 'latestHistory';
    const paginationSize =
      this.action == 'history' ? this.paginationSize : 10000;
    const paginationData: ToothHistoryPaginationRequest = {
      profileId: this.id,
      teethNumbering: this.teethNumbering,
      pageNo: pageNo,
      pageSize: paginationSize,
      sortBy: sortBy,
      orderBy: orderBy,
      findItem: itemSearch,
    };
    const paginationDataTotalLength: ToothHistoryPaginationRequest = {
      profileId: this.id,
      teethNumbering: this.teethNumbering,
      pageNo: 0,
      pageSize: 10000,
      sortBy: sortBy,
      orderBy: orderBy,
      findItem: itemSearch,
    };

    if (this.teethHistory == 'condition') {
      this.intraoralExaminationService
        .getToothConditionHistoryPagination(paginationData)
        .subscribe((response: ToothConditionHistoryPaginationResponse[]) => {
          this.teethConditionHistoryData = response;
        });

      this.intraoralExaminationService
        .getToothConditionHistoryPagination(paginationDataTotalLength)
        .subscribe((response: ToothConditionHistoryPaginationResponse[]) => {
          this.paginationTotalItems = response.length;
        });
    } else if (this.teethHistory == 'procedure') {
      this.intraoralExaminationService
        .getToothProcedureHistoryPagination(paginationData)
        .subscribe((response: ToothProcedureHistoryPaginationResponse[]) => {
          this.teethProcedureHistoryData = response;
        });

      this.intraoralExaminationService
        .getToothProcedureHistoryPagination(paginationDataTotalLength)
        .subscribe((response: ToothProcedureHistoryPaginationResponse[]) => {
          this.paginationTotalItems = response.length;
        });
    }
  }

  private onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  public onChangeShowPage(event: any) {
    this.paginationSize = event.target.value;
    this.onGetTableData();
  }

  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'Date Of Procedure') {
      this.sortBy = 'dateOfProcedure';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Category') {
      this.sortBy = 'category';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Procedure Done') {
      this.sortBy = 'procedureDone';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Surface') {
      this.sortBy = 'surface';
    }
    this.onGetTableData();
  }

  public onChangeDateOfProcedure(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'dateOfProcedure';
    this.onGetTableData();
  }

  public onChangeCategory(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'category';
    this.onGetTableData();
  }

  public onChangeProcedureDone(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'procedureDone';
    this.onGetTableData();
  }

  public onChangeSurface(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'surface';
    this.onGetTableData();
  }

  public onChangeCondition(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'condition';
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
}
