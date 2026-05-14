import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
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
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel();
    const urlPathName = window.location.pathname;
    const paramsURL = urlPathName.split('/');

    this.action = paramsURL[6];
    this.setCategoryValue();
    this.onGetTableData();
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
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  private onGetTableData() {
    const pageNo = this.pageNoDisplay - 1;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const bracketPaginationRequest: BracketPaginationRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      category: this.category,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const bracketPaginationRequestLength: BracketPaginationRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      category: this.category,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };

    this.orthodonticExaminationService
      .getBracketPrescriptionWireTypesPagination(bracketPaginationRequest)
      .subscribe((response: BracketResponse[]) => {
        this.bracketHistoryData = response;
      });

    this.orthodonticExaminationService
      .getBracketPrescriptionWireTypesPagination(bracketPaginationRequestLength)
      .subscribe((response: BracketResponse[]) => {
        this.paginationTotalItems = response.length;
      });
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
    this.itemNameSearch = event.target.value;
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
    this.sortBy = 'values';
    this.onGetTableData();
  }

  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
}
