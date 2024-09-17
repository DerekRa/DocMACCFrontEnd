import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToothHistoryPaginationRequest } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-history-pagination-request';
import { ToothHistoryPaginationResponse } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/tooth-history-pagination-response';
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
    private router: Router,
    private route: ActivatedRoute,
    public alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.teethNumbering = this.route.snapshot.params['teethNumbering'];
    this.action = this.route.snapshot.params['action'];
    console.log('this.action = ' + this.action);
    this.recentHistory =
      this.route.snapshot.params['action'] == 'recent'
        ? 'Recent'
        : this.recentHistory;
    this.onGetTableData();
    this.onGetProfileModel();
  }
  public id: any;
  public teethNumbering: any;
  public action: any;
  public recentHistory: string = '';
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;
  public paginationTotalItems: number | any;
  public teethHistoryData: ToothHistoryPaginationResponse[] = [];
  public profileModel: ProfileModel | undefined;
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

    this.intraoralExaminationService
      .getToothHistoryPagination(paginationData)
      .subscribe(
        (response: ToothHistoryPaginationResponse[]) => {
          console.log('response');
          console.log(response);
          this.teethHistoryData = response;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting teethHistoryData..')
      );

    this.intraoralExaminationService
      .getToothHistoryPagination(paginationDataTotalLength)
      .subscribe(
        (response: ToothHistoryPaginationResponse[]) => {
          console.log('response for paginationTotalItems');
          console.log(response);
          this.paginationTotalItems = response.length;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting teethHistoryData..')
      );
  }
  private onGetProfileModel(): void {
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
    console.log('date was changed..');
    this.itemNameSearch = event.target.value;
    console.log('date:' + this.itemNameSearch);
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
