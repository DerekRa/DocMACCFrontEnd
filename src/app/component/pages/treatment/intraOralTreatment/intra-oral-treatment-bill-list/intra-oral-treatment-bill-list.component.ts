import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { IntraOralTreatmentPaginationRequest } from 'src/app/model/interface/treatmentPlanModel/intra-oral-treatment-pagination-request';
import { IntraoralTreatmentPlanGroupResponse } from 'src/app/model/interface/treatmentPlanModel/intraoral-treatment-plan-group-response';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { TreatmentPlanService } from 'src/app/service/treatmentPlan/treatment-plan.service';

@Component({
  selector: 'app-intra-oral-treatment-bill-list',
  templateUrl: './intra-oral-treatment-bill-list.component.html',
  styleUrls: ['./intra-oral-treatment-bill-list.component.scss'],
})
export class IntraOralTreatmentBillListComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.id = this.route.snapshot.params['id'];
    const urlPathName = window.location.pathname;
    const paramsURL = urlPathName.split('/');
    if (paramsURL[1] == 'dental-records') {
      this.pageLocation = 'Treatment';
    } else if (paramsURL[1] == 'bill-records') {
      this.pageLocation = 'Bill';
    }
    this.onGetProfileModel();
    this.onGetTableData();
  }

  constructor(
    private profileModelService: ProfileModelService,
    private treatmentPlanService: TreatmentPlanService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly keycloak: KeycloakService,
  ) {}

  public id: any;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public profileModel: ProfileModel | undefined;
  public intraOralTreatmentPlanData: IntraoralTreatmentPlanGroupResponse[] = [];
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public paginationTotalItems: number | any;
  public pageLocation: string = '';
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
    const intraOralTreatmentPagination: IntraOralTreatmentPaginationRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const intraOralTreatmentPaginationLength: IntraOralTreatmentPaginationRequest =
      {
        profileId: this.id,
        createdByName: this.userProfile?.firstName || '',
        createdById: this.userProfile?.id || '',
        pageNo: 0,
        pageSize: 10000,
        sortBy: this.sortBy,
        orderBy: this.orderBy,
        findItem: itemSearch,
      };
    this.treatmentPlanService
      .getIntraOralTreatmentListPagination(intraOralTreatmentPagination)
      .subscribe(
        (response: IntraoralTreatmentPlanGroupResponse[]) => {
          this.intraOralTreatmentPlanData = response;
        },
        (error: any) => {
          this.intraOralTreatmentPlanData = [];
        },
      );

    this.treatmentPlanService
      .getIntraOralTreatmentListPagination(intraOralTreatmentPaginationLength)
      .subscribe(
        (response: IntraoralTreatmentPlanGroupResponse[]) => {
          this.paginationTotalItems = response.length;
        },
        (error: any) => {
          this.paginationTotalItems = 0;
        },
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

  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }

  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'Category') {
      this.sortBy = 'category';
    } else if (event.target.innerText.replace(/\s/g, '') == 'ProcedureDone') {
      this.sortBy = 'procedureTreatmentPlan';
    } else if (event.target.innerText.replace(/\s/g, '') == 'DateOfProcedure') {
      this.sortBy = 'dateOfProcedure';
    } else if (event.target.innerText.replace(/\s/g, '') == 'TotalBalance') {
      this.sortBy = 'totalBalance';
    }
    this.onGetTableData();
  }

  public onChangeDateOfProcedure(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'dateOfProcedure';
    this.onGetTableData();
  }

  public onChangeTotalBalance(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'totalBalance';
    this.onGetTableData();
  }

  public onChangeCategory(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'category';
    this.onGetTableData();
  }

  public onChangeProcedureDone(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'procedure';
    this.onGetTableData();
  }

  public viewIntraOralTreatmentDetail(dateOfProcedure: any) {
    if (dateOfProcedure !== undefined) {
      this.router.navigate([
        'dental-records/treatment-plan/intraoral/',
        this.id,
        dateOfProcedure,
      ]);
    }
  }

  public viewIntraOralBillBreakdown(dateOfProcedure: any) {
    if (dateOfProcedure !== undefined) {
      this.router.navigate([
        'bill-records/intraoral/patients/',
        this.id,
        dateOfProcedure,
      ]);
    }
  }

  public viewIntraOralTreatmentCertificate(dateOfProcedure: any) {
    if (dateOfProcedure !== undefined) {
      this.router.navigate([
        'dental-records/treatment-plan/intraoral/',
        this.id,
        dateOfProcedure,
        'certificate',
      ]);
    }
  }

  public viewIntraOralTreatmentPrescription(dateOfProcedure: any) {
    if (dateOfProcedure !== undefined) {
      this.router.navigate([
        'dental-records/treatment-plan/prescription/',
        this.id,
        dateOfProcedure,
      ]);
    }
  }
}
