import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  ngOnInit(): void {
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
      'desc'
    );
    this.onGetTableData('PermanentTeeth', 'bottomCenter', 'StatusLeft', 'asc');
    this.getBracketPrescriptionWireTypes('BracketPrescription');
    this.getBracketPrescriptionWireTypes('MaxillaryWireType');
    this.getBracketPrescriptionWireTypes('MandibularWireType');
    console.log('this.recordAction = ' + this.recordAction);
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
    console.log(paramsURL[0]);
    console.log(paramsURL[1]);
    console.log(paramsURL[2]);
    console.log(paramsURL[3]);
    console.log(paramsURL[4]);
    console.log(paramsURL[5]);
    console.log('urlPathName = ' + urlPathName);
  }
  constructor(
    private profileModelService: ProfileModelService,
    private intraoralExaminationService: IntraoralExaminationService,
    private orthodonticExaminationService: OrthodonticExaminationService,
    private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    private fb: FormBuilder
  ) {}
  public id: any;
  public recordAction: any;
  public bracesAction: any;
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
  private onGetTableData(
    kindsOfTeeth: string,
    teethArea: string,
    teethPositionStatus: string,
    sorting: string
  ) {
    const urlPathName = window.location.pathname;
    // console.log('urlPathName = ' + urlPathName);

    this.intraoralExaminationService
      .getIntraOralDisplay(
        this.id,
        kindsOfTeeth,
        teethArea,
        teethPositionStatus,
        sorting
      )
      .subscribe(
        (response: DentalChartDesignResponse[]) => {
          if (
            teethArea == 'topCenter' &&
            teethPositionStatus == 'StatusRight'
          ) {
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
        },
        (error: any) => console.log(error),
        () => console.log('Done getting default configuration design..')
      );
  }
  private getBracketPrescriptionWireTypes(category: string) {
    const bracketLatestRequest: BracketLatestRequest = {
      profileId: this.id,
      category: category,
    };
    this.orthodonticExaminationService
      .getBracketPrescriptionWireTypesLatest(bracketLatestRequest)
      .subscribe(
        (response: BracketResponse) => {
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
        },
        (error: any) => console.log(error),
        () => console.log('Done getting default configuration design..')
      );
  }
  public displayCondition(teethNumbering: number) {
    // console.log(teethNumbering)
    // console.log('urlPathName = ' + urlPathName);
    this.intraoralExaminationService
      .getRecentIntraOralExaminationByNumber(this.id, teethNumbering)
      .subscribe(
        (response: IntraoralExamination) => {
          // console.log('response == ' + JSON.stringify(response));
          this.intraoralExaminationResponse = response;
          // console.log('intraoralExaminationResponse == ' + JSON.stringify(this.intraoralExaminationResponse));
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
          // console.log(this.teethNumber);
        },
        (error: any) => {
          console.log('error ==' + JSON.stringify(error));
        },
        () => console.log('Done getting Intraoral Examination response..')
      );
  }
  onSubmitBracketPrescription(): void {
    console.log(
      'form value =-=-= ' + JSON.stringify(this.formBracketPrescription.value)
    );
    if (this.formBracketPrescription.invalid) {
      return;
    }
    const bracketRequest: BracketRequest = {
      profileId: this.id,
      createdBy: 10, // update soon
      category: 'BracketPrescription',
      values: this.formBracketPrescription.value.bracketPrescription,
    };
    this.createBracketPrescriptionWireTypes(
      bracketRequest,
      'BracketPrescription'
    );
  }
  onSubmitMaxillaryWireType(): void {
    console.log(
      'form value =-=-= ' + JSON.stringify(this.formMaxillaryWireType.value)
    );
    if (this.formMaxillaryWireType.invalid) {
      return;
    }
    const bracketRequest: BracketRequest = {
      profileId: this.id,
      createdBy: 10, // update soon
      category: 'MaxillaryWireType',
      values: this.formMaxillaryWireType.value.maxillaryWireType,
    };
    this.createBracketPrescriptionWireTypes(
      bracketRequest,
      'MaxillaryWireType'
    );
  }
  onSubmitMandibularWireType(): void {
    console.log(
      'form value =-=-= ' + JSON.stringify(this.formMandibularWireType.value)
    );
    if (this.formMandibularWireType.invalid) {
      return;
    }
    const bracketRequest: BracketRequest = {
      profileId: this.id,
      createdBy: 10, // update soon
      category: 'MandibularWireType',
      values: this.formMandibularWireType.value.mandibularWireType,
    };
    this.createBracketPrescriptionWireTypes(
      bracketRequest,
      'MandibularWireType'
    );
  }
  private createBracketPrescriptionWireTypes(
    bracketRequest: BracketRequest,
    bracket: string
  ) {
    this.orthodonticExaminationService
      .createBracketPrescriptionWireTypes(bracketRequest)
      .subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
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
          console.log(error);
          const errorResponse: CustomHttpResponse = error['error'];
          if (errorResponse.httpStatus == 'BAD_REQUEST') {
            this.alertService.error(errorResponse.message, this.options);
          }
        },
        () => console.log('Done creating bracket prescription..')
      );
  }
  public updateRecordActionToView() {
    this.recordAction = 'view-record';
    this.bracesAction = 'update-braces';
    this.submittedBracketPrescription = true;
    this.submittedMaxillary = true;
    this.submittedMandibular = true;
    console.log(this.recordAction);
  }
  public updateRecordActionToUpdate() {
    this.recordAction = 'add-record';
    this.bracesAction = 'add-braces';
    this.submittedBracketPrescription = false;
    this.submittedMaxillary = false;
    this.submittedMandibular = false;
    console.log(this.recordAction);
  }
  public addUpdateOrthodonticExam(teethNumbering: number) {
    console.log('teethNumbering = ' + teethNumbering);
    this.router.navigate([
      `dental-records/dental-chart/orthodontic-examination/add-record/${this.id}/${this.bracesAction}/${teethNumbering}`,
    ]);
  }
  public teethHistory(teethNumbering: number) {
    console.log('teethNumbering = ' + teethNumbering);
    this.router.navigate([
      `dental-records/dental-chart/orthodontic-examination/view-record/${this.id}/orthodontic-history/${teethNumbering}`,
    ]);
  }
  public teethRecentHistory(teethNumbering: number) {
    console.log('teethNumbering = ' + teethNumbering);
    this.router.navigate([
      `dental-records/dental-chart/orthodontic-examination/view-record/${this.id}/orthodontic-recent/${teethNumbering}`,
    ]);
  }
  public getImageTeeth(image: string) {
    console.log('image : ' + image);
    this.addTeethLink = this.intraoralExaminationService.getImage(image);
  }
  public getImageToothSurface(image: string) {
    console.log('image : ' + image);
    this.defaultToothSurface = this.intraoralExaminationService.getImage(image);
  }
}
