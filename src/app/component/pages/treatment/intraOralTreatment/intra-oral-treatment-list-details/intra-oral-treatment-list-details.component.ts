import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { IntraOralTreatmentDetailPaginationRequest } from 'src/app/model/interface/treatmentPlanModel/intra-oral-treatment-detail-pagination-request';
import { IntraoralTreatmentPlanDetailResponse } from 'src/app/model/interface/treatmentPlanModel/intraoral-treatment-plan-detail-response';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { TreatmentPlanService } from 'src/app/service/treatmentPlan/treatment-plan.service';

@Component({
  selector: 'app-intra-oral-treatment-list-details',
  templateUrl: './intra-oral-treatment-list-details.component.html',
  styleUrls: ['./intra-oral-treatment-list-details.component.scss'],
})
export class IntraOralTreatmentListDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.dateOfProcedure = this.route.snapshot.params['dateofProcedure'];
    this.onGetProfileModel();
    this.onGetTableData();
  }

  constructor(
    private profileModelService: ProfileModelService,
    private treatmentPlanService: TreatmentPlanService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public id: any;
  public profileModel: ProfileModel | undefined;
  public intraOralTreatmentPlanData: IntraoralTreatmentPlanDetailResponse[] =
    [];
  public dateOfProcedure: string = '';
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
    const intraOralTreatmentDetailPagination: IntraOralTreatmentDetailPaginationRequest =
      {
        profileId: this.id,
        createdBy: 10, // to change soon
        dateOfProcedure: this.dateOfProcedure,
        pageNo: pageNo,
        pageSize: this.paginationSize,
        sortBy: this.sortBy,
        orderBy: this.orderBy,
        findItem: itemSearch,
      };
    const intraOralTreatmentDetailPaginationLength: IntraOralTreatmentDetailPaginationRequest =
      {
        profileId: this.id,
        createdBy: 10, // to change soon
        dateOfProcedure: this.dateOfProcedure,
        pageNo: 0,
        pageSize: 10000,
        sortBy: this.sortBy,
        orderBy: this.orderBy,
        findItem: itemSearch,
      };
    this.treatmentPlanService
      .getIntraOralTreatmentDetailListPagination(
        intraOralTreatmentDetailPagination,
      )
      .subscribe((response: IntraoralTreatmentPlanDetailResponse[]) => {
        this.intraOralTreatmentPlanData = response;
      });

    this.treatmentPlanService
      .getIntraOralTreatmentDetailListPagination(
        intraOralTreatmentDetailPaginationLength,
      )
      .subscribe((response: IntraoralTreatmentPlanDetailResponse[]) => {
        this.paginationTotalItems = response.length;
      });
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
    if (event.target.innerText.replace(/\s/g, '') == 'Category') {
      this.sortBy = 'category';
    } else if (event.target.innerText.replace(/\s/g, '') == 'ProcedureDone') {
      this.sortBy = 'procedureDone';
    } else if (event.target.innerText.replace(/\s/g, '') == 'ToothNumber') {
      this.sortBy = 'toothNumber';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Note') {
      this.sortBy = 'note';
    } else if (event.target.innerText.replace(/\s/g, '') == 'ToothSurface') {
      console.log('toothSurface');
      this.sortBy = 'toothSurface';
    }
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

  public onChangeToothNumber(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'toothNumber';
    this.onGetTableData();
  }

  public onChangeToothSurface(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'toothSurface';
    this.onGetTableData();
  }

  public onChangeNote(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'note';
    this.onGetTableData();
  }

  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
}
