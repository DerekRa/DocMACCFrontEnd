import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { DentalChartDesignResponse } from 'src/app/model/interface/dentalChartModel/dental-chart-design-response';
import { IntraoralExamination } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/intraoral-examination';
import { BracketLatestRequest } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-latest-request';
import { BracketRequest } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-request';
import { BracketResponse } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { IntraoralExaminationService } from 'src/app/service/dentalRecord/intraoral-examination.service';
import { OrthodonticExaminationService } from 'src/app/service/dentalRecord/orthodontic-examination.service';

@Component({
  selector: 'app-orthodontic-examination',
  templateUrl: './orthodontic-examination.component.html',
  styleUrls: ['./orthodontic-examination.component.scss'],
})
export class OrthodonticExaminationComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.datePick = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel();
    this.getImageTeeth('addTeeth.png');
    this.getImageToothSurface('default_tooth_surface.png');
    this.onGetTableData('PermanentTeeth', 'topCenter', 'StatusRight', 'desc');
    this.onGetTableData('PermanentTeeth', 'topCenter', 'StatusLeft', 'asc');
    this.onGetTableData(
      'PermanentTeeth',
      'bottomCenter',
      'StatusRight',
      'desc',
    );
    this.onGetTableData('PermanentTeeth', 'bottomCenter', 'StatusLeft', 'asc');
    this.getBracketPrescriptionWireTypes('BracketPrescription');
    this.getBracketPrescriptionWireTypes('MaxillaryWireType');
    this.getBracketPrescriptionWireTypes('MandibularWireType');
    const urlPathName = window.location.pathname;
    const paramsURL = urlPathName.split('/');
    if (paramsURL[4] == 'add-record') {
      this.submittedBracketPrescription = false;
      this.submittedMaxillary = false;
      this.submittedMandibular = false;
      this.bracesAction = 'add-braces';
    } else {
      this.submittedBracketPrescription = true;
      this.submittedMaxillary = true;
      this.submittedMandibular = true;
      this.bracesAction = 'update-braces';
    }
    this.recordAction = paramsURL[4];
  }

  constructor(
    private profileModelService: ProfileModelService,
    private intraoralExaminationService: IntraoralExaminationService,
    private orthodonticExaminationService: OrthodonticExaminationService,
    private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    private fb: FormBuilder,
    private readonly keycloak: KeycloakService,
    public datepipe: DatePipe,
  ) {}

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public id: any;
  public recordAction: any;
  public bracesAction: any;
  public datePick: any;
  public profileModel: ProfileModel | undefined;
  public widthImage: string = '34';
  public heightImage: string = '49';
  public widthBigImage: string = '40';
  public heightBigImage: string = '66';
  public widthAddImage: string = '54';
  public heightAddImage: string = '49';
  public addTeethLink: string = '';
  public teethNumber: string = '';
  public examType: string = 'Orthodontic Examination';
  public examUrl: string = 'orthodontic-examination';
  public defaultToothSurface: string = '';
  public submittedBracketPrescription: boolean | undefined;
  public submittedMaxillary: boolean | undefined;
  public submittedMandibular: boolean | undefined;
  public isTrackHistory = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public imageDetailsPermaRightTopCenter: DentalChartDesignResponse[] | any;
  public imageDetailsPermaLeftTopCenter: DentalChartDesignResponse[] | any;
  public imageDetailsPermaRightBottomCenter: DentalChartDesignResponse[] | any;
  public imageDetailsPermaLeftBottomCenter: DentalChartDesignResponse[] | any;
  public intraoralExaminationResponse: IntraoralExamination | undefined;
  public bracketPrescription: BracketResponse | undefined;
  public maxillaryWireType: BracketResponse | undefined;
  public mandibularWireType: BracketResponse | undefined;
  public formBracketPrescription: FormGroup = new FormGroup({
    bracketPrescription: new FormControl(''),
  });
  public formMaxillaryWireType: FormGroup = new FormGroup({
    maxillaryWireType: new FormControl(''),
  });
  public formMandibularWireType: FormGroup = new FormGroup({
    mandibularWireType: new FormControl(''),
  });

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  private onGetTableData(
    kindsOfTeeth: string,
    teethArea: string,
    teethPositionStatus: string,
    sorting: string,
  ) {
    const urlPathName = window.location.pathname;

    this.intraoralExaminationService
      .getIntraOralDisplay(
        this.id,
        kindsOfTeeth,
        teethArea,
        teethPositionStatus,
        sorting,
        this.isTrackHistory,
        this.datePick,
      )
      .subscribe((response: DentalChartDesignResponse[]) => {
        if (teethArea == 'topCenter' && teethPositionStatus == 'StatusRight') {
          this.imageDetailsPermaRightTopCenter = response;
        }
        if (teethArea == 'topCenter' && teethPositionStatus == 'StatusLeft') {
          this.imageDetailsPermaLeftTopCenter = response;
        }
        if (
          teethArea == 'bottomCenter' &&
          teethPositionStatus == 'StatusRight'
        ) {
          this.imageDetailsPermaRightBottomCenter = response;
        }
        if (
          teethArea == 'bottomCenter' &&
          teethPositionStatus == 'StatusLeft'
        ) {
          this.imageDetailsPermaLeftBottomCenter = response;
        }
      });
  }

  private getBracketPrescriptionWireTypes(category: string) {
    const bracketLatestRequest: BracketLatestRequest = {
      profileId: this.id,
      category: category,
    };
    this.orthodonticExaminationService
      .getBracketPrescriptionWireTypesLatest(bracketLatestRequest)
      .subscribe((response: BracketResponse) => {
        if (category == 'BracketPrescription') {
          this.bracketPrescription = response;
          this.formBracketPrescription = this.fb.group({
            bracketPrescription: [this.bracketPrescription.values],
          });
        }
        if (category == 'MaxillaryWireType') {
          this.maxillaryWireType = response;
          this.formMaxillaryWireType = this.fb.group({
            maxillaryWireType: [this.maxillaryWireType.values],
          });
        }
        if (category == 'MandibularWireType') {
          this.mandibularWireType = response;
          this.formMandibularWireType = this.fb.group({
            mandibularWireType: [this.mandibularWireType.values],
          });
        }
      });
  }

  public displayCondition(teethNumbering: number) {
    this.intraoralExaminationService
      .getRecentIntraOralExaminationByNumber(this.id, teethNumbering)
      .subscribe((response: IntraoralExamination) => {
        this.intraoralExaminationResponse = response;
        this.teethNumber = '';
        for (
          let i = 0;
          i <
          this.intraoralExaminationResponse?.conditionProcedureGroupings
            ?.conditions.length;
          i++
        ) {
          if (
            this.intraoralExaminationResponse?.conditionProcedureGroupings
              ?.conditions[i].checked
          ) {
            if (this.teethNumber !== '') {
              this.teethNumber +=
                ', ' +
                this.intraoralExaminationResponse?.conditionProcedureGroupings
                  ?.conditions[i].name;
            } else {
              this.teethNumber =
                this.intraoralExaminationResponse?.conditionProcedureGroupings?.conditions[
                  i
                ].name;
            }
          }
        }
      });
  }

  onSubmitBracketPrescription(): void {
    if (this.formBracketPrescription.invalid) {
      return;
    }
    const bracketRequest: BracketRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      category: 'BracketPrescription',
      values: this.formBracketPrescription.value.bracketPrescription,
    };
    this.createBracketPrescriptionWireTypes(
      bracketRequest,
      'BracketPrescription',
    );
  }

  onSubmitMaxillaryWireType(): void {
    if (this.formMaxillaryWireType.invalid) {
      return;
    }
    const bracketRequest: BracketRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      category: 'MaxillaryWireType',
      values: this.formMaxillaryWireType.value.maxillaryWireType,
    };
    this.createBracketPrescriptionWireTypes(
      bracketRequest,
      'MaxillaryWireType',
    );
  }

  onSubmitMandibularWireType(): void {
    if (this.formMandibularWireType.invalid) {
      return;
    }
    const bracketRequest: BracketRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      category: 'MandibularWireType',
      values: this.formMandibularWireType.value.mandibularWireType,
    };
    this.createBracketPrescriptionWireTypes(
      bracketRequest,
      'MandibularWireType',
    );
  }

  private createBracketPrescriptionWireTypes(
    bracketRequest: BracketRequest,
    bracket: string,
  ) {
    this.orthodonticExaminationService
      .createBracketPrescriptionWireTypes(bracketRequest)
      .subscribe(
        (response: CustomHttpResponse) => {
          if (response.httpStatus == 'CREATED') {
            this.alertService.success(response.message, this.options);
            this.getBracketPrescriptionWireTypes(bracket);
            if (bracket == 'BracketPrescription') {
              this.submittedBracketPrescription = true;
            }
            if (bracket == 'MaxillaryWireType') {
              this.submittedMaxillary = true;
            }
            if (bracket == 'MandibularWireType') {
              this.submittedMandibular = true;
            }

            // this.recordAction = 'view-record';
            // this.router.navigate(['dental-records/dental-chart/orthodontic-examination/view-record/', this.id]);
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

  public updateRecordActionToView() {
    this.recordAction = 'view-record';
    this.bracesAction = 'update-braces';
    this.submittedBracketPrescription = true;
    this.submittedMaxillary = true;
    this.submittedMandibular = true;
  }

  public updateRecordActionToUpdate() {
    this.recordAction = 'add-record';
    this.bracesAction = 'add-braces';
    this.submittedBracketPrescription = false;
    this.submittedMaxillary = false;
    this.submittedMandibular = false;
  }

  public addUpdateOrthodonticExam(teethNumbering: number) {
    this.router.navigate([
      `dental-records/dental-chart/orthodontic-examination/add-record/${this.id}/${this.bracesAction}/${teethNumbering}`,
    ]);
  }

  public teethHistory(teethNumbering: number) {
    this.router.navigate([
      `dental-records/dental-chart/orthodontic-examination/view-record/${this.id}/orthodontic-history/${teethNumbering}`,
    ]);
  }

  public teethRecentHistory(teethNumbering: number) {
    this.router.navigate([
      `dental-records/dental-chart/orthodontic-examination/view-record/${this.id}/orthodontic-recent/${teethNumbering}`,
    ]);
  }

  public getImageTeeth(image: string) {
    this.addTeethLink = this.intraoralExaminationService.getImage(image);
  }

  public getImageToothSurface(image: string) {
    this.defaultToothSurface = this.intraoralExaminationService.getImage(image);
  }
}
