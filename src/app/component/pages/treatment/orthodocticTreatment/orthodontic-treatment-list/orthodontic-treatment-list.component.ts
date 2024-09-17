import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { OrthodonticTreatmentPaginationRequest } from 'src/app/model/interface/treatmentPlanModel/orthodontic-treatment-pagination-request';
import { OrthodonticTreatmentResponse } from 'src/app/model/interface/treatmentPlanModel/orthodontic-treatment-response';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { TreatmentPlanService } from 'src/app/service/treatmentPlan/treatment-plan.service';

@Component({
  selector: 'app-orthodontic-treatment-list',
  templateUrl: './orthodontic-treatment-list.component.html',
  styleUrls: ['./orthodontic-treatment-list.component.scss'],
})
export class OrthodonticTreatmentListComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel();
    this.onGetTableData();
  }
  constructor(
    private profileModelService: ProfileModelService,
    private treatmentPlanService: TreatmentPlanService,
    private route: ActivatedRoute
  ) {}

  public id: any;
  public profileModel: ProfileModel | undefined;
  public orthodonticTreatmentPlanData: OrthodonticTreatmentResponse[] = [];
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
    const orthodonticTreatmentPagination: OrthodonticTreatmentPaginationRequest =
      {
        profileId: this.id,
        createdBy: 10, // to change soon
        pageNo: pageNo,
        pageSize: this.paginationSize,
        sortBy: this.sortBy,
        orderBy: this.orderBy,
        findItem: itemSearch,
      };
    const orthodonticTreatmentPaginationLength: OrthodonticTreatmentPaginationRequest =
      {
        profileId: this.id,
        createdBy: 10, // to change soon
        pageNo: 0,
        pageSize: 10000,
        sortBy: this.sortBy,
        orderBy: this.orderBy,
        findItem: itemSearch,
      };
    this.treatmentPlanService
      .getOrthodonticTreatmentListPagination(orthodonticTreatmentPagination)
      .subscribe(
        (response: OrthodonticTreatmentResponse[]) => {
          console.log('response');
          console.log(response);
          this.orthodonticTreatmentPlanData = response;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting orthodontic treatment..')
      );

    this.treatmentPlanService
      .getOrthodonticTreatmentListPagination(
        orthodonticTreatmentPaginationLength
      )
      .subscribe(
        (response: OrthodonticTreatmentResponse[]) => {
          console.log('response for paginationTotalItems');
          console.log(response);
          console.log(response.length);
          this.paginationTotalItems = response.length;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting orthodontic treatment..')
      );

    console.log('paginationSize = ' + this.paginationSize);
    console.log('pageNoDisplay = ' + this.pageNoDisplay);
    console.log('paginationTotalItems = ' + this.paginationTotalItems);
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
    if (event.target.innerText.replace(/\s/g, '') == 'BracketHeight') {
      this.sortBy = 'bracketHeight';
    } else if (event.target.innerText.replace(/\s/g, '') == 'WireType') {
      this.sortBy = 'wireType';
    } else if (event.target.innerText.replace(/\s/g, '') == 'DateOfProcedure') {
      this.sortBy = 'dateOfProcedure';
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
  public onChangeBracketHeight(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'bracketHeight';
    this.onGetTableData();
  }
  public onChangeWireType(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'wireType';
    this.onGetTableData();
  }
  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
}
