import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrthodonticExaminationPagination } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/orthodontic-examination-pagination';
import { OrthodonticExaminationResponse } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/orthodontic-examination-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { OrthodonticExaminationService } from 'src/app/service/dentalRecord/orthodontic-examination.service';

@Component({
  selector: 'app-braces-history',
  templateUrl: './braces-history.component.html',
  styleUrls: ['./braces-history.component.scss'],
})
export class BracesHistoryComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.teethNumbering = this.route.snapshot.params['teethNumbering'];
    this.onGetProfileModel();
    this.onGetTableData();
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
  }
  constructor(
    private profileModelService: ProfileModelService,
    private orthodonticExaminationService: OrthodonticExaminationService,
    private route: ActivatedRoute
  ) {}
  public id: any;
  public teethNumbering: any;
  public action: any;
  public profileModel: ProfileModel | undefined;
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public paginationTotalItems: number | any;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;
  public bracesHistoryData: OrthodonticExaminationResponse[] = [];
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
    const bracesPaginationRequest: OrthodonticExaminationPagination = {
      profileId: this.id,
      createdBy: 10, // to change soon
      toothNumber: this.teethNumbering,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const bracesPaginationLength: OrthodonticExaminationPagination = {
      profileId: this.id,
      createdBy: 10, // to change soon
      toothNumber: this.teethNumbering,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };

    this.orthodonticExaminationService
      .getOrthodonticExaminationPagination(bracesPaginationRequest)
      .subscribe(
        (response: OrthodonticExaminationResponse[]) => {
          console.log('response');
          console.log(response);
          this.bracesHistoryData = response;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );

    this.orthodonticExaminationService
      .getOrthodonticExaminationPagination(bracesPaginationLength)
      .subscribe(
        (response: OrthodonticExaminationResponse[]) => {
          console.log('response for paginationTotalItems');
          console.log(response);
          console.log(response.length);
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
    } else if (event.target.innerText.replace(/\s/g, '') == 'BracketHeight') {
      this.sortBy = 'bracketHeight';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Note') {
      this.sortBy = 'note';
    }
    this.onGetTableData();
  }
  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
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
  public onChangeNote(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'note';
    this.onGetTableData();
  }
  public onChangeSearchAll(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'searchAllColumns';
    this.onGetTableData();
  }
}
