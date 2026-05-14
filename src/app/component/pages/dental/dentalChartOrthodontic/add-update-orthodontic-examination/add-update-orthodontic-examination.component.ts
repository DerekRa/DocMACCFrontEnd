import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ToothNumbersDentalChart } from 'src/app/model/interface/dentalChartModel/intraoralExaminationSaveUpdateModel/tooth-numbers-dental-chart';
import { BracketLatestRequest } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-latest-request';
import { BracketResponse } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/bracket-response';
import { OrthodonticExamination } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/orthodontic-examination';
import { OrthodonticExaminationLatest } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/orthodontic-examination-latest';
import { OrthodonticExaminationResponse } from 'src/app/model/interface/dentalChartModel/orthodonticExaminationModel/orthodontic-examination-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { IntraoralExaminationService } from 'src/app/service/dentalRecord/intraoral-examination.service';
import { OrthodonticExaminationService } from 'src/app/service/dentalRecord/orthodontic-examination.service';

@Component({
  selector: 'app-add-update-orthodontic-examination',
  templateUrl: './add-update-orthodontic-examination.component.html',
  styleUrls: ['./add-update-orthodontic-examination.component.scss'],
})
export class AddUpdateOrthodonticExaminationComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.id = this.route.snapshot.params['id'];
    this.teethNumbering = this.route.snapshot.params['teethNumbering'];
    this.onGetProfileModel();
    let currentDateTime = this.datepipe.transform(
      new Date(),
      'MM/dd/yyyy h:mm:ss',
    );
    let currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.onGetData(currentDate + '');
    this.onGetToothNumbers(
      'PermanentTeeth',
      'topCenter',
      'StatusRight',
      'desc',
    );
    this.onGetToothNumbers('PermanentTeeth', 'topCenter', 'StatusLeft', 'asc');
    this.onGetToothNumbers(
      'PermanentTeeth',
      'bottomCenter',
      'StatusRight',
      'desc',
    );
    this.onGetToothNumbers(
      'PermanentTeeth',
      'bottomCenter',
      'StatusLeft',
      'asc',
    );
    this.getBracketPrescriptionWireTypes('BracketPrescription');
    this.getBracketPrescriptionWireTypes('MaxillaryWireType');
    this.getBracketPrescriptionWireTypes('MandibularWireType');
  }

  constructor(
    private profileModelService: ProfileModelService,
    private orthodonticExaminationService: OrthodonticExaminationService,
    private intraoralExaminationService: IntraoralExaminationService,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private fb: FormBuilder, // public datepipe: DatePipe
    public alertService: AlertService,
    private readonly keycloak: KeycloakService,
  ) {}

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public id: any;
  public teethNumbering: any;
  public profileModel: ProfileModel | undefined;
  public braces: OrthodonticExaminationResponse | undefined;
  public bracketPrescription: BracketResponse | undefined;
  public maxillaryWireType: BracketResponse | undefined;
  public mandibularWireType: BracketResponse | undefined;
  // public toothNumbersId: any[] = [];
  public toothNumbersValue: any[] = [];
  public toothDetailsPermaRightTopCenter: any[] = [];
  public toothDetailsPermaLeftTopCenter: any[] = [];
  public toothDetailsPermaRightBottomCenter: any[] = [];
  public toothDetailsPermaLeftBottomCenter: any[] = [];
  public submitted: boolean | undefined;
  public showMaxillaryWireType: boolean | undefined;
  public showMandibularWireType: boolean | undefined;
  public newDataToInsert: boolean = false;
  public currentDate = new Date();
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    profileId: new FormControl(''),
    toothNumber: new FormControl(''),
    dateOfProcedure: new FormControl(''),
    bracketHeight: new FormControl(''),
    note: new FormControl(''),
  });

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  public onGetData(dateOfProcedure: string) {
    const orthodonticExaminationLatest: OrthodonticExaminationLatest = {
      profileId: this.id,
      toothNumber: this.teethNumbering,
      dateOfProcedure: dateOfProcedure,
    };
    this.orthodonticExaminationService
      .getOrthodonticExaminationLatest(orthodonticExaminationLatest)
      .subscribe((response) => {
        this.braces = response;

        if (this.braces.dateOfProcedure == null) {
          this.newDataToInsert = true;
        } else {
          this.newDataToInsert = false;
        }
        let dop = this.datepipe.transform(
          new Date(dateOfProcedure),
          'yyyy-MM-dd',
        );
        this.braces.dateOfProcedure =
          this.braces.dateOfProcedure == null
            ? new Date(dateOfProcedure)
            : this.braces.dateOfProcedure;
        this.form = this.fb.group({
          profileId: [this.braces?.profileId],
          toothNumber: [this.braces?.toothNumber],
          dateOfProcedure: [dop, Validators.required],
          bracketHeight: [this.braces?.bracketHeight, Validators.required],
          note: [this.braces?.note, Validators.required],
        });
        // this.toothNumbersId = [];
        this.toothNumbersValue = [];
        // this.toothNumbersId.push(this.braces?.dentalChartDesignId);
        this.toothNumbersValue.push(Number(this.teethNumbering));
      });
  }

  private onGetToothNumbers(
    kindsOfTeeth: string,
    teethArea: string,
    teethPositionStatus: string,
    sorting: string,
  ) {
    this.intraoralExaminationService
      .getToothNumbersDisplay(
        this.id,
        kindsOfTeeth,
        teethArea,
        teethPositionStatus,
        sorting,
      )
      .subscribe((response: ToothNumbersDentalChart[]) => {
        if (teethArea == 'topCenter' && teethPositionStatus == 'StatusRight') {
          this.toothDetailsPermaRightTopCenter = [];
          for (let i = 0; i < response.length; i++) {
            if (response[i].teethNumbering == this.teethNumbering) {
              this.showMaxillaryWireType = true;
            }
            this.toothDetailsPermaRightTopCenter.push({
              formControlName: 'fcToothNumberName' + response[i].teethNumbering,
              inputId: 'toothNumberId' + response[i].teethNumbering,
              label: response[i].teethNumbering,
              name: 'toothNumber' + response[i].teethNumbering,
              value: response[i].id,
              checked:
                this.teethNumbering == response[i].teethNumbering
                  ? true
                  : false,
            });
          }
        }

        if (teethArea == 'topCenter' && teethPositionStatus == 'StatusLeft') {
          this.toothDetailsPermaLeftTopCenter = [];
          for (let i = 0; i < response.length; i++) {
            if (response[i].teethNumbering == this.teethNumbering) {
              this.showMaxillaryWireType = true;
            }
            this.toothDetailsPermaLeftTopCenter.push({
              formControlName: 'fcToothNumberName' + response[i].teethNumbering,
              inputId: 'toothNumberId' + response[i].teethNumbering,
              label: response[i].teethNumbering,
              name: 'toothNumber' + response[i].teethNumbering,
              value: response[i].id,
              checked:
                this.teethNumbering == response[i].teethNumbering
                  ? true
                  : false,
            });
          }
        }

        if (
          teethArea == 'bottomCenter' &&
          teethPositionStatus == 'StatusRight'
        ) {
          this.toothDetailsPermaRightBottomCenter = [];
          for (let i = 0; i < response.length; i++) {
            if (response[i].teethNumbering == this.teethNumbering) {
              this.showMandibularWireType = true;
            }
            this.toothDetailsPermaRightBottomCenter.push({
              formControlName: 'fcToothNumberName' + response[i].teethNumbering,
              inputId: 'toothNumberId' + response[i].teethNumbering,
              label: response[i].teethNumbering,
              name: 'toothNumber' + response[i].teethNumbering,
              value: response[i].id,
              checked:
                this.teethNumbering == response[i].teethNumbering
                  ? true
                  : false,
            });
          }
        }

        if (
          teethArea == 'bottomCenter' &&
          teethPositionStatus == 'StatusLeft'
        ) {
          this.toothDetailsPermaLeftBottomCenter = [];
          for (let i = 0; i < response.length; i++) {
            if (response[i].teethNumbering == this.teethNumbering) {
              this.showMandibularWireType = true;
            }
            this.toothDetailsPermaLeftBottomCenter.push({
              formControlName: 'fcToothNumberName' + response[i].teethNumbering,
              inputId: 'toothNumberId' + response[i].teethNumbering,
              label: response[i].teethNumbering,
              name: 'toothNumber' + response[i].teethNumbering,
              value: response[i].id,
              checked:
                this.teethNumbering == response[i].teethNumbering
                  ? true
                  : false,
            });
          }
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
        }
        if (category == 'MaxillaryWireType') {
          this.maxillaryWireType = response;
        }
        if (category == 'MandibularWireType') {
          this.mandibularWireType = response;
        }
      });
  }

  onCheckboxChangeToothNumbers(event: any) {
    const idNumber = event.target.value.split('-');
    if (event.target.checked) {
      // this.toothNumbersId.push(Number(idNumber[0]));
      this.toothNumbersValue.push(Number(idNumber[1]));
    } else {
      // const indexId: number = this.toothNumbersId.indexOf(Number(idNumber[0]));
      const indexNumber: number = this.toothNumbersValue.indexOf(
        Number(idNumber[1]),
      );
      // if (indexId !== -1) {
      //     this.toothNumbersId.splice(indexId, 1);
      // }
      if (indexNumber !== -1) {
        this.toothNumbersValue.splice(indexNumber, 1);
      }
    }
  }

  onChangeDateOfProcedure(event: MatDatepickerInputEvent<Date>) {
    let month =
      event.value?.toLocaleDateString('en-US', { month: 'numeric' }).length == 1
        ? '0' + event.value?.toLocaleDateString('en-US', { month: 'numeric' })
        : event.value?.toLocaleDateString('en-US', { month: 'numeric' });
    let day =
      event.value?.toLocaleDateString('en-US', { day: 'numeric' }).length == 1
        ? '0' + event.value?.toLocaleDateString('en-US', { day: 'numeric' })
        : event.value?.toLocaleDateString('en-US', { day: 'numeric' });
    const dateOfProcedure =
      event.value?.toLocaleDateString('en-US', { year: 'numeric' }) +
      '-' +
      month +
      '-' +
      day;

    this.onGetData(dateOfProcedure);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.toothNumbersValue.length == 0) {
      return;
    }
    if (this.form.invalid) {
      return;
    }

    const dateFormat = this.datepipe.transform(
      this.form.value['dateOfProcedure'],
      'yyyy-MM-dd',
    );
    for (let i = 0; i < this.toothNumbersValue.length; i++) {
      const orthodonticExamination: OrthodonticExamination = {
        profileId: this.id,
        createdByName: this.userProfile?.firstName || '',
        createdById: this.userProfile?.id || '',
        toothNumber: this.toothNumbersValue[i],
        dateOfProcedure: dateFormat + '',
        wireType: this.showMandibularWireType
          ? 'MandibularWireType'
          : 'MaxillaryWireType',
        bracketHeight: this.form.value['bracketHeight'],
        note: this.form.value['note'],
      };
      this.orthodonticExaminationService
        .createOrthodonticExamination(orthodonticExamination)
        .subscribe(
          (response: CustomHttpResponse) => {
            if (response.httpStatus == 'CREATED') {
              const messageSplit = response.message.split(':');
              const strLink =
                '<a href="/dental-records/dental-chart/orthodontic-examination/add-record/' +
                this.id +
                '">Click here to view..</a>';
              this.options.autoClose = false;
              this.alertService.success(
                messageSplit[0] + strLink,
                this.options,
              );
              //Go to current date
              // let currentDateTime = this.datepipe.transform(new Date(), 'MM/dd/yyyy h:mm:ss');
              let currentDate = this.datepipe.transform(
                new Date(),
                'yyyy-MM-dd',
              );
              // this.resetAllCheckboxes();
              this.onGetData(currentDate + '');
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
}
