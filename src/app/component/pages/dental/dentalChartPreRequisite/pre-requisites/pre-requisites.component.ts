import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Appliances } from 'src/app/model/interface/preRequisiteModel/appliances';
import { Occlusion } from 'src/app/model/interface/preRequisiteModel/occlusion';
import { PreRequisiteDto } from 'src/app/model/interface/preRequisiteModel/pre-requisite-dto';
import { PreRequisiteModel } from 'src/app/model/interface/preRequisiteModel/pre-requisite-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { PreRequisiteRequirementService } from 'src/app/service/dentalRecord/pre-requisite-requirement.service';

@Component({
  selector: 'app-pre-requisites',
  templateUrl: './pre-requisites.component.html',
  styleUrls: ['./pre-requisites.component.scss'],
})
export class PreRequisitesComponent implements OnInit {
  constructor(
    // private IntraoralExaminationService: IntraoralExaminationService,
    // private profileModelService: ProfileModelService,
    private preRequisiteRequirementService: PreRequisiteRequirementService,
    private router: Router,
    // private route: ActivatedRoute,
    public alertService: AlertService,
    private fb: FormBuilder // public dialog: MatDialog
  ) {
    if (this.preRequisiteModel == undefined) {
      this.form = this.fb.group({
        id: [''],
        periodontalScreeningTMDRequestList: this.fb.array(
          this.periodontalScreeningList
        ),
        occlusion: this.fb.group({
          classMolar: [''],
          overjet: [''],
          overbite: [''],
          midlineDeviation: [''],
          crossbite: [''],
        }),
        appliances: this.fb.group({
          orthodontic: [''],
          stayplate: [''],
          others: [''],
        }),
      });
    }
  }
  ngOnInit(): void {
    // this.setExamType();
    this.onGetPreRequisite();
  }

  @Input('idData') id: any;
  @Input('recordData') recordAction: any;
  @Input('examUrlData') examUrl: any;
  public examinationType: any;
  public submitted = false;
  public preRequisiteModel: PreRequisiteModel | undefined;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    id: new FormControl(''),
    periodontalScreeningTMDRequestList: this.fb.array([
      {
        fcname: new FormControl(''),
        inputId: new FormControl(''),
        labelName: new FormControl(''),
        name: new FormControl(''),
        value: new FormControl(''),
        checked: false,
      },
    ]),
    occlusion: this.fb.group({
      classMolar: new FormControl(''),
      overjet: new FormControl(''),
      overbite: new FormControl(''),
      midlineDeviation: new FormControl(''),
      crossbite: new FormControl(''),
    }),
    appliances: this.fb.group({
      orthodontic: new FormControl(''),
      stayplate: new FormControl(''),
      others: new FormControl(''),
    }),
  });
  public occlusion: Occlusion = {
    classMolar: '',
    overjet: '',
    overbite: '',
    midlineDeviation: '',
    crossbite: '',
  };
  public appliances: Appliances = {
    orthodontic: '',
    stayplate: '',
    others: '',
  };
  public periodontalScreeningList: any[] = [
    {
      inputId: 'gingivitisId',
      labelName: 'Periodontal Screening',
      name: 'Gingivitis',
      value: 'Gingivitis',
      checked: false,
    },
    {
      inputId: 'earlyPeriodontitisId',
      labelName: 'Periodontal Screening',
      name: 'Early Periodontitis',
      value: 'Early Periodontitis',
      checked: false,
    },
    {
      inputId: 'moderatePeriodontitisId',
      labelName: 'Periodontal Screening',
      name: 'Moderate Periodontitis',
      value: 'Moderate Periodontitis',
      checked: false,
    },
    {
      inputId: 'advancedPeriodontitisId',
      labelName: 'Periodontal Screening',
      name: 'Advanced Periodontitis',
      value: 'Advanced Periodontitis',
      checked: false,
    },
    {
      inputId: 'clenchingId',
      labelName: 'TMD',
      name: 'Clenching',
      value: 'Clenching',
      checked: false,
    },
    {
      inputId: 'clickingId',
      labelName: 'TMD',
      name: 'Clicking',
      value: 'Clicking',
      checked: false,
    },
    {
      inputId: 'trismusId',
      labelName: 'TMD',
      name: 'Trismus',
      value: 'Trismus',
      checked: false,
    },
    {
      inputId: 'muscleSpasmId',
      labelName: 'TMD',
      name: 'Muscle Spasm',
      value: 'Muscle Spasm',
      checked: false,
    },
  ];

  private setExamType() {
    if (this.examUrl == 'intraoral-examination') {
      this.examinationType = 'intraoral_examination';
    }
    if (this.examUrl == 'orthodontic-examination') {
      this.examinationType = 'orthodontic_examination';
    }
  }
  public onGetPreRequisite(): void {
    const formData = new FormData();
    formData.append('profileId', this.id);
    console.log('get prerequisite -=-= -= -= - =- =- =- =- =');
    console.log('recordAction = ' + this.recordAction);
    const getPreRequisite: PreRequisiteDto = {
      profileId: this.id,
      examinationType: this.examUrl,
    };
    this.preRequisiteRequirementService
      .getPreRequisite(getPreRequisite)
      .subscribe(
        (response: PreRequisiteModel) => {
          this.preRequisiteModel = response;
          this.preRequisiteModel.periodontalScreeningTMDRequestList = this
            .preRequisiteModel?.periodontalScreeningTMDRequestList
            ? this.preRequisiteModel.periodontalScreeningTMDRequestList
            : this.periodontalScreeningList;
          this.preRequisiteModel.occlusion = this.preRequisiteModel?.occlusion
            ? this.preRequisiteModel.occlusion
            : this.occlusion;
          this.preRequisiteModel.appliances = this.preRequisiteModel?.appliances
            ? this.preRequisiteModel.appliances
            : this.appliances;
          this.form = this.fb.group({
            id: [this.preRequisiteModel.id],
            periodontalScreeningTMDRequestList: this.fb.array(
              this.preRequisiteModel?.periodontalScreeningTMDRequestList
            ),
            occlusion: this.fb.group({
              classMolar: [this.preRequisiteModel.occlusion.classMolar],
              overjet: [this.preRequisiteModel.occlusion.overjet],
              overbite: [this.preRequisiteModel.occlusion.overbite],
              midlineDeviation: [
                this.preRequisiteModel.occlusion.midlineDeviation,
              ],
              crossbite: [this.preRequisiteModel.occlusion.crossbite],
            }),
            appliances: this.fb.group({
              orthodontic: [this.preRequisiteModel.appliances.orthodontic],
              stayplate: [this.preRequisiteModel.appliances.stayplate],
              others: [this.preRequisiteModel.appliances.others],
            }),
          });
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done getting display Periapical data..')
      );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  // get classMolar(): any { return this.form.get('occlusion.classMolar'); }
  // get overjet(): any { return this.form.get('occlusion.overjet'); }
  get getPeriodontalScreeningTMDRequestList(): any {
    return this.form.get('periodontalScreeningTMDRequestList');
  }
  // get getPeriodontalScreeningTMDRequestList() {
  //     return this.form.controls['periodontalScreeningTMDRequestList'] as FormArray;
  // }
  onCheckboxChange(event: any) {
    for (
      let i = 0;
      i < this.form.value.periodontalScreeningTMDRequestList.length;
      i++
    ) {
      if (
        event.target.value ==
        this.form.value.periodontalScreeningTMDRequestList[i].value
      ) {
        if (this.form.value.periodontalScreeningTMDRequestList[i].checked) {
          this.form.value.periodontalScreeningTMDRequestList[i].checked = false;
        } else {
          this.form.value.periodontalScreeningTMDRequestList[i].checked = true;
        }
      }
    }
  }
  onSubmit(): void {
    this.submitted = true;
    // console.log('form value =-=-= ' + JSON.stringify(this.form.value));
    // console.log('form value periodontalScreeningTMDRequestList =-=-= ' + JSON.stringify(this.form.value.periodontalScreeningTMDRequestList));
    // console.log('form value occlusion =-=-= ' + JSON.stringify(this.form.value.occlusion));
    // console.log('form value appliances =-=-= ' + JSON.stringify(this.form.value.appliances));
    if (this.form.invalid) {
      return;
    }

    const preRequisiteModelSave: PreRequisiteModel = {
      profileId: this.id,
      createdBy: 1, // update soon
      examinationType: this.examinationType,
      periodontalScreeningTMDRequestList:
        this.form.value.periodontalScreeningTMDRequestList,
      occlusion: this.form.value.occlusion,
      appliances: this.form.value.appliances,
    };

    this.preRequisiteRequirementService
      .createPreRequisite(preRequisiteModelSave)
      .subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
          if (response.httpStatus == 'CREATED' || response.httpStatus == 'OK') {
            this.alertService.success(response.message, this.options);
            this.onGetPreRequisite();
            this.recordAction = 'view-record';
            this.router.navigate([
              'dental-records/dental-chart/' + this.examUrl + '/view-record/',
              this.id,
            ]);
          }
        },
        (error: any) => {
          console.log(error);
          const errorResponse: CustomHttpResponse = error['error'];
          if (errorResponse.httpStatus == 'BAD_REQUEST') {
            this.alertService.error(errorResponse.message, this.options);
          }
        },
        () => console.log('Done creating pre requisite..')
      );
  }
}
