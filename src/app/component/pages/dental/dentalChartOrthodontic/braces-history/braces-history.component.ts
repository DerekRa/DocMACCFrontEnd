import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
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
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.id = this.route.snapshot.params['id'];
    this.teethNumbering = this.route.snapshot.params['teethNumbering'];
    this.onGetProfileModel();
    this.onGetTableData();
    const urlPathName = window.location.pathname;
    const paramsURL = urlPathName.split('/');

    this.action = paramsURL[6];
  }

  constructor(
    private profileModelService: ProfileModelService,
    private orthodonticExaminationService: OrthodonticExaminationService,
    private route: ActivatedRoute,
    private readonly keycloak: KeycloakService,
  ) {}

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
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
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  private onGetTableData() {
    const pageNo = this.pageNoDisplay - 1;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const bracesPaginationRequest: OrthodonticExaminationPagination = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      toothNumber: this.teethNumbering,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const bracesPaginationLength: OrthodonticExaminationPagination = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      toothNumber: this.teethNumbering,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const urlPathName = window.location.pathname;
    const paramsURL = urlPathName.split('/');
    this.action = paramsURL[6];

    if (this.action == 'orthodontic-recent') {
      this.orthodonticExaminationService
        .getOrthodonticExaminationPaginationLatest(bracesPaginationRequest)
        .subscribe((response: OrthodonticExaminationResponse[]) => {
          this.bracesHistoryData = response;
        });

      this.orthodonticExaminationService
        .getOrthodonticExaminationPaginationLatest(bracesPaginationLength)
        .subscribe((response: OrthodonticExaminationResponse[]) => {
          this.paginationTotalItems = response.length;
        });
    } else {
      this.orthodonticExaminationService
        .getOrthodonticExaminationPagination(bracesPaginationRequest)
        .subscribe((response: OrthodonticExaminationResponse[]) => {
          this.bracesHistoryData = response;
        });

      this.orthodonticExaminationService
        .getOrthodonticExaminationPagination(bracesPaginationLength)
        .subscribe((response: OrthodonticExaminationResponse[]) => {
          this.paginationTotalItems = response.length;
        });
    }
  }

  public onChangeShowPage(event: any) {
    this.paginationSize = event.target.value;
    this.onGetTableData();
  }

  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'DateOfProcedure') {
      this.sortBy = 'dateOfProcedure';
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
    this.itemNameSearch = event.target.value;
    this.sortBy = 'dateOfProcedure';
    this.onGetTableData();
  }

  public onChangeBracketHeight(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'bracketHeight';
    this.onGetTableData();
  }

  public onChangeNote(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'note';
    this.onGetTableData();
  }

  public onChangeSearchAll(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'searchAllColumns';
    this.onGetTableData();
  }
}
