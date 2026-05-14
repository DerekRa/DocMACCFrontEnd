import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XrayTakenImageDetails } from 'src/app/model/interface/xrayTakenModel/xray-taken-image-details';
import { XrayTakenPaginationDataRequest } from 'src/app/model/interface/xrayTakenModel/xray-taken-pagination-data-request';
import { XrayTakenPermanentDataRequest } from 'src/app/model/interface/xrayTakenModel/xray-taken-permanent-data-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { PreRequisiteRequirementService } from 'src/app/service/dentalRecord/pre-requisite-requirement.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-xray-taken',
  templateUrl: './xray-taken.component.html',
  styleUrls: ['./xray-taken.component.scss'],
})
export class XrayTakenComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.dentalChart = this.route.snapshot.params['dentalChart'];
    this.labelName = this.route.snapshot.params['labelName'];
    this.setExamType();
    this.onGetTableData();
    this.onGetProfileModel(this.id);
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  constructor(
    private readonly keycloak: KeycloakService,
    private preRequisiteRequirementService: PreRequisiteRequirementService,
    private profileModelService: ProfileModelService,
    private router: Router,
    private route: ActivatedRoute,
    public alertService: AlertService,
  ) {}

  public id: any;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public dentalChart: any;
  public labelName: any;
  public examType: any;
  public examinationType: any;
  public profileModel: ProfileModel | any;
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;
  public paginationTotalItems: number | any;
  public xrayTakenImageDetails: XrayTakenImageDetails[] = [];
  public xrayTakenImageDetailDelete: XrayTakenImageDetails | undefined;
  public imgLink: any;
  public hashName: any;
  public imgNameOriginal: any;
  public xrayTakenIdDelete: any;

  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

  private setExamType() {
    if (this.dentalChart == 'intraoral-examination') {
      this.examType = 'Intraoral Examination';
    }
    if (this.dentalChart == 'orthodontic-examination') {
      this.examType = 'Orthodontic Examination';
    }
    this.examinationType = this.dentalChart;
  }

  private onGetTableData() {
    const pageNo = this.pageNoDisplay - 1;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const paginationData: XrayTakenPaginationDataRequest = {
      profileId: this.id,
      location: 'permanent',
      examinationType: this.examinationType,
      labelName: this.labelName,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const paginationDataTotalLength: XrayTakenPaginationDataRequest = {
      profileId: this.id,
      location: 'permanent',
      examinationType: this.examinationType,
      labelName: this.labelName,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };

    this.preRequisiteRequirementService
      .getXrayTakenPagination(paginationData)
      .subscribe((response: XrayTakenImageDetails[]) => {
        this.xrayTakenImageDetails = response;
      });

    this.preRequisiteRequirementService
      .getXrayTakenPagination(paginationDataTotalLength)
      .subscribe((response: XrayTakenImageDetails[]) => {
        this.paginationTotalItems = response.length;
      });
  }

  private onGetProfileModel(id: number): void {
    this.profileModelService.getProfileModel(id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  public updateDisplay(xrayTakenId: any) {
    const xrayTakenPermanentDataRequest: XrayTakenPermanentDataRequest = {
      xrayTakenId: xrayTakenId,
      profileId: this.id,
      updatedByName: this.userProfile?.firstName || '',
      updatedById: this.userProfile?.id || '',
      location: 'permanent',
      examinationType: this.dentalChart,
      labelName: this.labelName,
    };
    this.preRequisiteRequirementService
      .updateXrayTakenImageDisplay(xrayTakenPermanentDataRequest)
      .subscribe(
        (response: CustomHttpResponse) => {
          if (response.httpStatus == 'OK') {
            this.alertService.success(response.message, this.options);
          }
        },
        (error: any) => {
          const errorResponse: CustomHttpResponse = error['error'];
          if (errorResponse.httpStatus == 'BAD_REQUEST') {
            this.alertService.error(errorResponse.message, this.options);
          }
        },
      );
  }

  public deletePreProcedureRequirement() {
    if (this.xrayTakenImageDetailDelete?.xrayTakenId != undefined) {
      let xrayTakenPermanentDataRequest: XrayTakenPermanentDataRequest = {
        xrayTakenId: this.xrayTakenImageDetailDelete?.xrayTakenId,
        profileId: this.id,
        updatedByName: this.userProfile?.firstName || '',
        updatedById: this.userProfile?.id || '',
        location: 'permanent',
        examinationType: this.dentalChart,
        labelName: this.labelName,
      };
      this.preRequisiteRequirementService
        .deleteXrayTakenData(xrayTakenPermanentDataRequest)
        .subscribe(
          (response: CustomHttpResponse) => {
            if (response.httpStatus == 'OK') {
              this.options.autoClose = true;
              this.alertService.success(response.message, this.options);
              this.onGetTableData();
              //this.router.navigate(['medical-history/patients']);
              // this.router.navigate(['patients-profile'], { state: { key: response.message } });
            }
          },
          (error: any) => {
            const errorResponse: CustomHttpResponse = error['error'];
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
        );
    }
  }

  public onChangeShowPage(event: any) {
    this.paginationSize = event.target.value;
    this.onGetTableData();
  }

  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'Ramarks') {
      this.sortBy = 'remarks';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Date') {
      this.sortBy = 'createdAt';
    }
    this.onGetTableData();
  }

  public onChangeRemarks(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'remarks';
    this.onGetTableData();
  }

  public onChangeCreatedDate(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'createdDate';
    this.onGetTableData();
  }

  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }

  public updateDeleteItem(xrayTakenImageDetail: XrayTakenImageDetails) {
    this.xrayTakenImageDetailDelete = xrayTakenImageDetail;
  }

  public updateViewItem(
    hashNameType: string,
    originalName: string,
    imgLink: string,
  ) {
    this.hashName = hashNameType;
    this.imgNameOriginal = originalName;
    this.imgLink = imgLink;
  }
}
