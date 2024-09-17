import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BracketPaginationRequest } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-pagination-request';
import { BracketResponse } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { OrthodonticExaminationService } from 'src/app/service/dentalRecord/orthodontic-examination.service';

@Component({
  selector: 'app-bracket-history',
  templateUrl: './bracket-history.component.html',
  styleUrls: ['./bracket-history.component.scss'],
})
export class BracketHistoryComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel();
    const urlPathName = window.location.pathname;
    const paramsURL = urlPathName.split('/');
    console.log(paramsURL[0]);
    console.log(paramsURL[1]);
    console.log(paramsURL[2]);
    console.log(paramsURL[3]);
    console.log(paramsURL[4]);
    console.log(paramsURL[5]);
    console.log(paramsURL[6]);
    this.action = paramsURL[6];
    console.log('urlPathName = ' + urlPathName);
    this.setCategoryValue();
    this.onGetTableData();
  }
  constructor(
    private profileModelService: ProfileModelService,
    private orthodonticExaminationService: OrthodonticExaminationService,
    private route: ActivatedRoute
  ) {}
  public id: any;
  public action: any;
  public categoryTitle: any;
  public category: any;
  public profileModel: ProfileModel | undefined;
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public paginationTotalItems: number | any;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;
  public bracketHistoryData: BracketResponse[] = [];
  public bracketPrescription: BracketResponse | undefined;
  public maxillaryWireType: BracketResponse | undefined;
  public mandibularWireType: BracketResponse | undefined;
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
    const bracketPaginationRequest: BracketPaginationRequest = {
      profileId: this.id,
      createdBy: 10, // to change soon
      category: this.category,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const bracketPaginationRequestLength: BracketPaginationRequest = {
      profileId: this.id,
      createdBy: 10, // to change soon
      category: this.category,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };

    this.orthodonticExaminationService
      .getBracketPrescriptionWireTypesPagination(bracketPaginationRequest)
      .subscribe(
        (response: BracketResponse[]) => {
          console.log('response');
          console.log(response);
          this.bracketHistoryData = response;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );

    this.orthodonticExaminationService
      .getBracketPrescriptionWireTypesPagination(bracketPaginationRequestLength)
      .subscribe(
        (response: BracketResponse[]) => {
          console.log('response for paginationTotalItems');
          console.log(response);
          this.paginationTotalItems = response.length;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );

    console.log('paginationSize = ' + this.paginationSize);
    console.log('pageNoDisplay = ' + this.pageNoDisplay);
    console.log('paginationTotalItems = ' + this.paginationTotalItems);
  }
  public onChangeShowPage(event: any) {
    this.paginationSize = event.target.value;
    this.onGetTableData();
  }
  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'DateOfProcedure') {
      this.sortBy = 'createdDate';
    } else if (event.target.innerText.replace(/\s/g, '') == this.category) {
      this.sortBy = 'values';
    }
    this.onGetTableData();
  }
  public onChangeDateOfProcedure(event: any) {
    console.log('date was changed..');
    this.itemNameSearch = event.target.value;
    console.log('date:' + this.itemNameSearch);
    this.sortBy = 'createdDate';
    this.onGetTableData();
  }
  private setCategoryValue() {
    if (this.action == 'bracket-prescription-history') {
      this.categoryTitle = 'Bracket Prescription';
      this.category = 'BracketPrescription';
    }
    if (this.action == 'maxillary-wire-type-history') {
      this.categoryTitle = 'Maxillary (Wire Type)';
      this.category = 'MaxillaryWireType';
    }
    if (this.action == 'mandibular-wire-type-history') {
      this.categoryTitle = 'Mandibular (Wire Type)';
      this.category = 'MandibularWireType';
    }
  }
  public onChangeBracket(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'values';
    this.onGetTableData();
  }
  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
}
