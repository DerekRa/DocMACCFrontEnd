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
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.teethNumbering = this.route.snapshot.params['teethNumbering'];
    this.onGetProfileModel();
    let currentDateTime = this.datepipe.transform(
      new Date(),
      'MM/dd/yyyy h:mm:ss'
    );
    console.log(currentDateTime);
    let currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.onGetData(currentDate + '');
    this.onGetToothNumbers(
      'PermanentTeeth',
      'topCenter',
      'StatusRight',
      'desc'
    );
    this.onGetToothNumbers('PermanentTeeth', 'topCenter', 'StatusLeft', 'asc');
    this.onGetToothNumbers(
      'PermanentTeeth',
      'bottomCenter',
      'StatusRight',
      'desc'
    );
    this.onGetToothNumbers(
      'PermanentTeeth',
      'bottomCenter',
      'StatusLeft',
      'asc'
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
    public alertService: AlertService
  ) {}
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
  public onGetData(dateOfProcedure: string) {
    console.log('get data dateOfProcedure = ' + dateOfProcedure);
    const orthodonticExaminationLatest: OrthodonticExaminationLatest = {
      profileId: this.id,
      toothNumber: this.teethNumbering,
      dateOfProcedure: dateOfProcedure,
    };
    this.orthodonticExaminationService
      .getOrthodonticExaminationLatest(orthodonticExaminationLatest)
      .subscribe(
        (response) => {
          this.braces = response;
          console.log('this.braces = ' + this.braces);
          console.log(this.braces);
          if (this.braces.dateOfProcedure == null) {
            this.newDataToInsert = true;
          } else {
            this.newDataToInsert = false;
          }
          let dop = this.datepipe.transform(
            new Date(dateOfProcedure),
            'yyyy-MM-dd'
          );
          this.braces.dateOfProcedure =
            this.braces.dateOfProcedure == null
              ? new Date(dateOfProcedure)
              : this.braces.dateOfProcedure;
          this.form = this.fb.group({
            profileId: [this.braces?.profileId],
            toothNumber: [this.braces?.toothNumber],
            dateOfProcedure: [dop, Validators.required],
            bracketHeight: [this.braces?.bracketHeight],
            note: [this.braces?.note],
          });
          // this.toothNumbersId = [];
          this.toothNumbersValue = [];
          // this.toothNumbersId.push(this.braces?.dentalChartDesignId);
          this.toothNumbersValue.push(Number(this.teethNumbering));
        },
        (error: any) => {
          console.log('error');
          console.log(error);
        },
        () => console.log('Done getting single profile..')
      );
  }
  private onGetToothNumbers(
    kindsOfTeeth: string,
    teethArea: string,
    teethPositionStatus: string,
    sorting: string
  ) {
    this.intraoralExaminationService
      .getToothNumbersDisplay(
        this.id,
        kindsOfTeeth,
        teethArea,
        teethPositionStatus,
        sorting
      )
      .subscribe(
        (response: ToothNumbersDentalChart[]) => {
          if (
            teethArea == 'topCenter' &&
            teethPositionStatus == 'StatusRight'
          ) {
            this.toothDetailsPermaRightTopCenter = [];
            for (let i = 0; i < response.length; i++) {
              if (response[i].teethNumbering == this.teethNumbering) {
                this.showMaxillaryWireType = true;
              }
              this.toothDetailsPermaRightTopCenter.push({
                formControlName:
                  'fcToothNumberName' + response[i].teethNumbering,
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
                formControlName:
                  'fcToothNumberName' + response[i].teethNumbering,
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
                formControlName:
                  'fcToothNumberName' + response[i].teethNumbering,
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
                formControlName:
                  'fcToothNumberName' + response[i].teethNumbering,
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
        },
        (error: any) => console.log(error),
        () => console.log('Done getting default numbers design..')
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
          }
          if (category == 'MaxillaryWireType') {
            this.maxillaryWireType = response;
          }
          if (category == 'MandibularWireType') {
            this.mandibularWireType = response;
          }
        },
        (error: any) => console.log(error),
        () => console.log('Done getting default configuration design..')
      );
  }
  onCheckboxChangeToothNumbers(event: any) {
    console.log(event);
    console.log(event.target.checked);
    console.log(event.target.value);
    console.log(event.target.name);
    const idNumber = event.target.value.split('-');
    if (event.target.checked) {
      // this.toothNumbersId.push(Number(idNumber[0]));
      this.toothNumbersValue.push(Number(idNumber[1]));
    } else {
      // const indexId: number = this.toothNumbersId.indexOf(Number(idNumber[0]));
      const indexNumber: number = this.toothNumbersValue.indexOf(
        Number(idNumber[1])
      );
      // if (indexId !== -1) {
      //     this.toothNumbersId.splice(indexId, 1);
      // }
      if (indexNumber !== -1) {
        this.toothNumbersValue.splice(indexNumber, 1);
      }
    }
    // console.log(this.toothNumbersId);
    console.log(this.toothNumbersValue);
  }
  onChangeDateOfProcedure(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value?.toLocaleDateString('en-US', { month: 'numeric' }));
    console.log(event.value?.toLocaleDateString('en-US', { day: 'numeric' }));
    const dateOfProcedure =
      event.value?.toLocaleDateString('en-US', { year: 'numeric' }) +
      '-' +
      event.value?.toLocaleDateString('en-US', { month: 'numeric' }) +
      '-' +
      event.value?.toLocaleDateString('en-US', { day: 'numeric' }) +
      '-';

    this.onGetData(dateOfProcedure);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    console.log('form value =-=-= ' + JSON.stringify(this.form.value));
    console.log(JSON.stringify(this.form.value));
    console.log('dateOfProcedure = ' + this.form.value['dateOfProcedure']);

    if (this.toothNumbersValue.length == 0) {
      return;
    }

    for (let i = 0; i < this.toothNumbersValue.length; i++) {
      console.log('tooth number = ' + this.toothNumbersValue[i]);
    }

    for (let i = 0; i < this.toothNumbersValue.length; i++) {
      const orthodonticExamination: OrthodonticExamination = {
        profileId: this.id,
        createdBy: 10, // update soon
        toothNumber: this.toothNumbersValue[i],
        dateOfProcedure: this.form.value['dateOfProcedure'],
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
            console.log(response);
            if (response.httpStatus == 'CREATED') {
              const messageSplit = response.message.split(':');
              const strLink =
                '<a href="/dental-records/dental-chart/orthodontic-examination/add-record/' +
                this.id +
                '">Click here to view..</a>';
              this.options.autoClose = false;
              this.alertService.success(
                messageSplit[0] + strLink,
                this.options
              );
              //Go to current date
              // let currentDateTime = this.datepipe.transform(new Date(), 'MM/dd/yyyy h:mm:ss');
              let currentDate = this.datepipe.transform(
                new Date(),
                'yyyy-MM-dd'
              );
              // this.resetAllCheckboxes();
              this.onGetData(currentDate + '');
            }
          },
          (error: any) => {
            console.log(error);
            const errorResponse: CustomHttpResponse = error['error'];
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
          () => console.log('Done updating single profile..')
        );
    }
  }
}
