import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IntraoralExamination } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/intraoral-examination';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { ConditionProcedureModelRequest } from 'src/app/model/interface/dentalChartModel/intraoralExaminationSaveUpdateModel/condition-procedure-model-request';
import { ConditionProcedureRequest } from 'src/app/model/interface/dentalChartModel/intraoralExaminationSaveUpdateModel/condition-procedure-request';
import { toothSurfaceValidator } from './custom-validator';
import { ToothNumbersDentalChart } from 'src/app/model/interface/dentalChartModel/intraoralExaminationSaveUpdateModel/tooth-numbers-dental-chart';
import { IntraoralExaminationService } from 'src/app/service/dentalRecord/intraoral-examination.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';

@Component({
  selector: 'app-add-update-intraoral-examination',
  templateUrl: './add-update-intraoral-examination.component.html',
  styleUrls: ['./add-update-intraoral-examination.component.scss'],
})
export class AddUpdateIntraoralExaminationComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.teethNumbering = this.route.snapshot.params['teethNumbering'];
    let currentDateTime = this.datepipe.transform(
      new Date(),
      'MM/dd/yyyy h:mm:ss'
    );
    console.log(currentDateTime);
    let currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    console.log('currentDate = ' + currentDate);
    this.onGetData(this.id, this.teethNumbering, currentDate + '');
    this.onGetProfileModel();
    console.log(
      'this.intraoralExaminationResponse = ' + this.intraoralExaminationResponse
    );
    this.onGetToothNumbers('TemporaryTeeth', 'top', 'StatusRight', 'desc');
    this.onGetToothNumbers('TemporaryTeeth', 'top', 'StatusLeft', 'asc');
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
    this.onGetToothNumbers('TemporaryTeeth', 'bottom', 'StatusRight', 'desc');
    this.onGetToothNumbers('TemporaryTeeth', 'bottom', 'StatusLeft', 'asc');
    if (this.intraoralExaminationResponse == undefined) {
    }
  }
  constructor(
    private intraoralExaminationService: IntraoralExaminationService,
    private profileModelService: ProfileModelService,
    private router: Router,
    private route: ActivatedRoute,
    public alertService: AlertService,
    public matButtonModule: MatButtonModule,
    public matNativeDateModule: MatNativeDateModule,
    public matFormFieldModule: MatFormFieldModule,
    public matInputModule: MatInputModule,
    public matRippleModule: MatRippleModule,
    public matDatepickerModule: MatDatepickerModule,
    private fb: FormBuilder, // public datepipe: DatePipe
    public datepipe: DatePipe
  ) {
    this.dentalChartDesignResponseForm = this.fb.group({
      kindsOfTeeth: ['', this.validatorData('required')],
      teethPositionStatus: ['', this.validatorData('required')],
      teethNumbering: ['', this.validatorData('required')],
      teethImage: ['', this.validatorData('required')],
      teethImageLink: ['', this.validatorData('required')],
      teethArea: ['', this.validatorData('required')],
    });
    this.conditionProcedureGroupingsForm = this.fb.group({
      conditions: this.fb.array(this.conditionList),
      restorations: this.fb.array(this.restorationList),
      restorationsInlay: this.fb.array(this.restorationInlayList),
      restorationsOnlay: this.fb.array(this.restorationOnlayList),
      restorationsFluoride: this.fb.array(this.restorationFluorideList),
      prosthetics: this.fb.array(this.prostheticsList),
      denture: this.fb.array(this.dentureList),
      periodontal: this.fb.array(this.periodontalList),
      surgery: this.fb.array(this.surgeryList),
      conditionProcedureSurfaceRemarksResponse:
        this.conditionProcedureSurfaceRemarksForm,
    });
    this.conditionProcedureSurfaceRemarksForm = this.fb.group({
      restorationInlayOther: ['', this.validatorData('required')],
      restorationInlayNote: ['', this.validatorData('required')],
      restorationOnlayOther: ['', this.validatorData('required')],
      restorationOnlayNote: ['', this.validatorData('required')],
      prostheticsNote: ['', this.validatorData('required')],
      removablePartialDentureNote: ['', this.validatorData('required')],
      completeDentureNote: ['', this.validatorData('required')],
      almostCompleteDentureNote: ['', this.validatorData('required')],
      surgeryReason: ['', this.validatorData('required')],
      toothSurfaceNote: ['', this.validatorData('required')],
    });
    let numbersCheckOne = [
      55, 54, 65, 64, 18, 17, 16, 15, 14, 24, 25, 26, 27, 28, 48, 47, 46, 45,
      44, 34, 35, 36, 37, 38, 85, 84, 75, 74,
    ];
    let numbersCheckTwo = [
      53, 52, 51, 65, 64, 13, 12, 11, 24, 25, 26, 27, 28, 43, 42, 41, 34, 35,
      36, 37, 38, 83, 82, 81, 75, 74,
    ];
    let number = this.teethNumbering;

    this.form = this.fb.group({
      profileId: [''],
      dentalChartDesignId: [''],
      dateOfProcedure: ['', this.validatorData('required')],
      dentalChartDesignResponse: this.dentalChartDesignResponseForm,
      conditionProcedureGroupings: this.conditionProcedureGroupingsForm,
      surfaceCheckResponses: [
        this.fb.array([
          {
            id: 'buccalCervicalId',
            name: numbersCheckOne.includes(number) ? 'Buccal' : 'Cervical',
            value: numbersCheckOne.includes(number) ? 'Buccal' : 'Cervical',
            checked: false,
          },
          {
            id: 'lingualIncisalFacialId',
            name: numbersCheckOne.includes(number)
              ? 'Lingual'
              : 'Incisal Facial',
            value: numbersCheckOne.includes(number)
              ? 'Lingual'
              : 'Incisal Facial',
            checked: false,
          },
          {
            id: 'mesialDistalId',
            name: numbersCheckTwo.includes(number) ? 'Mesial' : 'Distal',
            value: numbersCheckTwo.includes(number) ? 'Mesial' : 'Distal',
            checked: false,
          },
          {
            id: 'distalMesialId',
            name: numbersCheckTwo.includes(number) ? 'Distal' : 'Mesial',
            value: numbersCheckTwo.includes(number) ? 'Distal' : 'Mesial',
            checked: false,
          },
          {
            id: 'occlusalPitId',
            name: numbersCheckOne.includes(number) ? 'Occlusal' : 'Pit',
            value: numbersCheckOne.includes(number) ? 'Occlusal' : 'Pit',
            checked: false,
          },
        ]),
        [toothSurfaceValidator('surfaceCheckResponses')],
      ],
    });
  }
  public id: any;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public currentDate = new Date();
  public teethNumbering: any;
  public toothDetailsTempRightTop: any[] = [];
  public toothDetailsTempLeftTop: any[] = [];
  public toothDetailsPermaRightTopCenter: any[] = [];
  public toothDetailsPermaLeftTopCenter: any[] = [];
  public toothDetailsPermaRightBottomCenter: any[] = [];
  public toothDetailsPermaLeftBottomCenter: any[] = [];
  public toothDetailsTempRightBottom: any[] = [];
  public toothDetailsTempLeftBottom: any[] = [];
  public toothNumbersId: any[] = [];
  public toothNumbersValue: any[] = [];
  public intraoralExaminationResponse: IntraoralExamination | undefined;
  public profileModel: ProfileModel | undefined;
  public conditionList: any[] = [
    {
      formControlName: 'presentTeeth',
      inputId: 'presentTeethId',
      group: 'Condition',
      label: '&#10003; - Present Teeth',
      name: 'Present Teeth',
      value: 'Present Teeth',
      checked: false,
    },
    {
      formControlName: 'decayed',
      inputId: 'decayedId',
      group: 'Condition',
      label: 'D - Decayed (Caries Indicated for Filling)',
      name: 'Decayed (Caries Indicated for Filling)',
      value: 'Decayed',
      checked: false,
    },
    {
      formControlName: 'missingCaries',
      inputId: 'missingCariesId',
      group: 'Condition',
      label: 'M - Missing due to Caries',
      name: 'Missing due to Caries',
      value: 'Missing due to Caries',
      checked: false,
    },
    {
      formControlName: 'missingCauses',
      inputId: 'missingCausesId',
      group: 'Condition',
      label: 'MO - Missing due to Other Causes',
      name: 'Missing due to Other Causes',
      value: 'Missing due to Other Causes',
      checked: false,
    },
    {
      formControlName: 'impactedTooth',
      inputId: 'impactedToothId',
      group: 'Condition',
      label: 'Im - Impacted Tooth',
      name: 'Impacted Tooth',
      value: 'Impacted Tooth',
      checked: false,
    },
    {
      formControlName: 'supernumeraryTooth',
      inputId: 'supernumeraryToothId',
      group: 'Condition',
      label: 'Sp - Supernumerary Tooth',
      name: 'Supernumerary Tooth',
      value: 'Supernumerary Tooth',
      checked: false,
    },
    {
      formControlName: 'rootFragment',
      inputId: 'rootFragmentId',
      group: 'Condition',
      label: 'Rf - Root Fragment',
      name: 'Root Fragment',
      value: 'Root Fragment',
      checked: false,
    },
    {
      formControlName: 'unerupted',
      inputId: 'uneruptedId',
      group: 'Condition',
      label: 'Un - Unerupted',
      name: 'Unerupted',
      value: 'Unerupted',
      checked: false,
    },
  ];
  public restorationList: any[] = [
    {
      formControlName: 'amaigamFilling',
      inputId: 'amaigamFillingId',
      group: 'Restorations',
      label: 'Am - Amaigam Filling',
      name: 'Amaigam Filling',
      value: 'Amaigam Filling',
      checked: false,
    },
    {
      formControlName: 'compositeFilling',
      inputId: 'compositeFillingId',
      group: 'Restorations',
      label: 'Co - Composite Filling',
      name: 'Composite Filling',
      value: 'Composite Filling',
      checked: false,
    },
    {
      formControlName: 'sealants',
      inputId: 'sealantsId',
      group: 'Restorations',
      label: 'S - Sealants',
      name: 'Sealants',
      value: 'Sealants',
      checked: false,
    },
  ];
  public restorationInlayList: any[] = [
    {
      formControlName: 'compositeInlay',
      inputId: 'compositeInlayId',
      group: 'Restorations',
      label: 'In - Inlay',
      name: 'composite',
      value: 'composite',
      checked: false,
    },
    {
      formControlName: 'plasticInlay',
      inputId: 'plasticInlayId',
      group: 'Restorations',
      label: 'In - Inlay',
      name: 'plastic',
      value: 'plastic',
      checked: false,
    },
    {
      formControlName: 'metalInlay',
      inputId: 'metalInlayId',
      group: 'Restorations',
      label: 'In - Inlay',
      name: 'metal',
      value: 'metal',
      checked: false,
    },
    {
      formControlName: 'procaineMetalInlay',
      inputId: 'procaineMetalInlayId',
      group: 'Restorations',
      label: 'In - Inlay',
      name: 'procaine fused to metal',
      value: 'procaine fused to metal',
      checked: false,
    },
    {
      formControlName: 'emaxInlay',
      inputId: 'emaxInlayId',
      group: 'Restorations',
      label: 'In - Inlay',
      name: 'emax',
      value: 'emax',
      checked: false,
    },
    {
      formControlName: 'zirconiaInlay',
      inputId: 'zirconiaInlayId',
      group: 'Restorations',
      label: 'In - Inlay',
      name: 'zirconia',
      value: 'zirconia',
      checked: false,
    },
  ];
  public restorationOnlayList: any[] = [
    {
      formControlName: 'compositeOnlay',
      inputId: 'compositeOnlayId',
      group: 'Restorations',
      label: 'On - Onlay',
      name: 'composite',
      value: 'composite',
      checked: false,
    },
    {
      formControlName: 'plasticOnlay',
      inputId: 'plasticOnlayId',
      group: 'Restorations',
      label: 'On - Onlay',
      name: 'plastic',
      value: 'plastic',
      checked: false,
    },
    {
      formControlName: 'metalOnlay',
      inputId: 'metalOnlayId',
      group: 'Restorations',
      label: 'On - Onlay',
      name: 'metal',
      value: 'metal',
      checked: false,
    },
    {
      formControlName: 'procaineMetalOnlay',
      inputId: 'procaineMetalOnlayId',
      group: 'Restorations',
      label: 'On - Onlay',
      name: 'procaine fused to metal',
      value: 'procaine fused to metal',
      checked: false,
    },
    {
      formControlName: 'emaxOnlay',
      inputId: 'emaxOnlayId',
      group: 'Restorations',
      label: 'On - Onlay',
      name: 'emax',
      value: 'emax',
      checked: false,
    },
    {
      formControlName: 'zirconiaOnlay',
      inputId: 'zirconiaOnlayId',
      group: 'Restorations',
      label: 'On - Onlay',
      name: 'zirconia',
      value: 'zirconia',
      checked: false,
    },
  ];
  public restorationFluorideList: any[] = [
    {
      formControlName: 'gel',
      inputId: 'gelId',
      group: 'Restorations',
      label: 'FL - Fluoride Application',
      name: 'Gel',
      value: 'Gel',
      checked: false,
    },
    {
      formControlName: 'varnish',
      inputId: 'varnishId',
      group: 'Restorations',
      label: 'FL - Fluoride Application',
      name: 'Varnish',
      value: 'Varnish',
      checked: false,
    },
  ];
  public prostheticsList: any[] = [
    {
      formControlName: 'veneers',
      inputId: 'veneersId',
      group: 'Prosthetics',
      label: 'Ve - Veneers',
      name: 'Veneers',
      value: 'Veneers',
      checked: false,
    },
    {
      formControlName: 'maryLand',
      inputId: 'maryLandId',
      group: 'Prosthetics',
      label: 'Ml - MaryLand',
      name: 'MaryLand',
      value: 'MaryLand',
      checked: false,
    },
    {
      formControlName: 'jacketCrown',
      inputId: 'jacketCrownId',
      group: 'Prosthetics',
      label: 'JC - Jacket Crown',
      name: 'Jacket Crown',
      value: 'Jacket Crown',
      checked: false,
    },
    {
      formControlName: 'fixedBridge',
      inputId: 'fixedBridgeId',
      group: 'Prosthetics',
      label: 'FPD - Fixed Bridge',
      name: 'Fixed Bridge',
      value: 'Fixed Bridge',
      checked: false,
    },
    {
      formControlName: 'abutment',
      inputId: 'abutmentId',
      group: 'Prosthetics',
      label: 'Ab - Abutment',
      name: 'Abutment',
      value: 'Abutment',
      checked: false,
    },
    {
      formControlName: 'attachment',
      inputId: 'attachmentId',
      group: 'Prosthetics',
      label: 'Att - Attachment',
      name: 'Attachment',
      value: 'Attachment',
      checked: false,
    },
    {
      formControlName: 'pontic',
      inputId: 'ponticId',
      group: 'Prosthetics',
      label: 'P - Pontic',
      name: 'Pontic',
      value: 'Pontic',
      checked: false,
    },
    {
      formControlName: 'implant',
      inputId: 'implantId',
      group: 'Prosthetics',
      label: 'Imp - Implant',
      name: 'Implant',
      value: 'Implant',
      checked: false,
    },
  ];
  public dentureList: any[] = [
    {
      formControlName: 'removablePartialDenture',
      inputId: 'removablePartialDentureId',
      group: 'Denture',
      label: 'RPD - Removable Partial Denture',
      name: 'Removable Partial Denture',
      value: 'Removable Partial Denture',
      noteValue: '',
      checked: false,
    },
    {
      formControlName: 'completeDenture',
      inputId: 'completeDentureId',
      group: 'Denture',
      label: 'CD - Complete Denture',
      name: 'Complete Denture',
      value: 'Complete Denture',
      noteValue: '',
      checked: false,
    },
    {
      formControlName: 'almostCompleteDenture',
      inputId: 'almostCompleteDentureId',
      group: 'Denture',
      label: 'ACD - Almost Complete Denture',
      name: 'Almost Complete Denture',
      value: 'Almost Complete Denture',
      noteValue: '',
      checked: false,
    },
  ];
  public periodontalList: any[] = [
    {
      formControlName: 'oralProphylaxis',
      inputId: 'oralProphylaxisId',
      group: 'Periodontal',
      label: 'OP - Oral Prophylaxis',
      name: 'Oral Prophylaxis',
      value: 'Oral Prophylaxis',
      checked: false,
    },
    {
      formControlName: 'nonSurgicalRootPlaning',
      inputId: 'nonSurgicalRootPlaningId',
      group: 'Periodontal',
      label: 'NSRP - Non Surgical Root Planing',
      name: 'Non Surgical Root Planing',
      value: 'Non Surgical Root Planing',
      checked: false,
    },
    {
      formControlName: 'surgicalRootPlaning',
      inputId: 'surgicalRootPlaningId',
      group: 'Periodontal',
      label: 'SRP - Surgical Root Planing',
      name: 'Surgical Root Planing',
      value: 'Surgical Root Planing',
      checked: false,
    },
  ];
  public surgeryList: any[] = [
    {
      formControlName: 'extractionDueCaries',
      inputId: 'extractionDueCariesId',
      group: 'Surgery',
      label: 'X - Extraction due to Caries',
      name: 'Extraction due to Caries',
      value: 'Extraction due to Caries',
      checked: false,
    },
    {
      formControlName: 'extractionDueOtherCauses',
      inputId: 'extractionDueOtherCausesId',
      group: 'Surgery',
      label: 'XO - Extraction due to Other Causes',
      name: 'Extraction due to Other Causes',
      value: 'Extraction due to Other Causes',
      checked: false,
    },
  ];
  public surfaceCheckList: any[] = [];
  public submitted = false;
  public newDataToInsert = false;
  // public conditionsChecked = false;
  // public restorationsChecked = false;
  // public surfacesChecked = false;
  public dentalChartDesignResponseForm: FormGroup = new FormGroup({
    kindsOfTeeth: new FormControl(''),
    teethPositionStatus: new FormControl(''),
    teethNumbering: new FormControl(''),
    teethImage: new FormControl(''),
    teethImageLink: new FormControl(''),
    teethArea: new FormControl(''),
  });
  public conditionProcedureSurfaceRemarksForm: FormGroup = new FormGroup({
    restorationInlayOther: new FormControl(''),
    restorationInlayNote: new FormControl(''),
    restorationOnlayOther: new FormControl(''),
    restorationOnlayNote: new FormControl(''),
    prostheticsNote: new FormControl(''),
    removablePartialDentureNote: new FormControl(''),
    completeDentureNote: new FormControl(''),
    almostCompleteDentureNote: new FormControl(''),
    surgeryReason: new FormControl(''),
    toothSurfaceNote: new FormControl(''),
  });
  public conditionProcedureGroupingsForm: FormGroup = new FormGroup({
    conditions: this.fb.array([]),
    restorations: this.fb.array([]),
    restorationsInlay: this.fb.array([]),
    restorationsOnlay: this.fb.array([]),
    restorationsFluoride: this.fb.array([]),
    prosthetics: this.fb.array([]),
    denture: this.fb.array([]),
    periodontal: this.fb.array([]),
    surgery: this.fb.array([]),
    conditionProcedureSurfaceRemarksResponse:
      this.conditionProcedureSurfaceRemarksForm,
  });
  public form: FormGroup = new FormGroup({
    profileId: new FormControl(''),
    dentalChartDesignId: new FormControl(''),
    dateOfProcedure: new FormControl(''),
    dentalChartDesignResponse: this.dentalChartDesignResponseForm,
    conditionProcedureGroupings: this.conditionProcedureGroupingsForm,
    surfaceCheckResponses: this.fb.array([]),
  });
  validatorData(event: any) {
    if (event == 'all') {
      return [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(83),
      ];
    } else if (event == 'minmax') {
      return [Validators.minLength(2), Validators.maxLength(83)];
    } else if (event == 'minmaxHigh') {
      return [Validators.minLength(2), Validators.maxLength(255)];
    } else if (event == 'required') {
      return [Validators.required];
    } else {
      return [];
    }
  }
  private onGetData(
    id: number,
    teethNumbering: number,
    dateOfProcedure: string
  ) {
    const urlPathName = window.location.pathname;
    // console.log('urlPathName = ' + urlPathName);
    this.intraoralExaminationService
      .getIntraOralExaminationByNumber(id, teethNumbering, dateOfProcedure)
      .subscribe(
        (response: IntraoralExamination) => {
          console.log('response == ' + JSON.stringify(response));
          this.intraoralExaminationResponse = response;
          // console.log('intraoralExaminationResponse == ' + JSON.stringify(this.intraoralExaminationResponse));

          if (this.intraoralExaminationResponse?.createdBy == 0) {
            this.newDataToInsert = true;
          } else {
            this.newDataToInsert = false;
          }
          console.log(
            'createdBy=' + this.intraoralExaminationResponse?.createdBy
          );
          console.log('this.newDataToInsert=' + this.newDataToInsert);
          let dentureDBList: any[] = [];
          for (
            let i = 0;
            i <
            this.intraoralExaminationResponse?.conditionProcedureGroupings
              ?.denture.length;
            i++
          ) {
            dentureDBList.push({
              formControlName: 'fcDentureName' + i,
              inputId: 'dentureInputId' + i,
              group:
                this.intraoralExaminationResponse?.conditionProcedureGroupings
                  ?.denture[i].group,
              label:
                this.intraoralExaminationResponse?.conditionProcedureGroupings
                  ?.denture[i].label,
              name: this.intraoralExaminationResponse
                ?.conditionProcedureGroupings?.denture[i].name,
              value:
                this.intraoralExaminationResponse?.conditionProcedureGroupings
                  ?.denture[i].value,
              noteValue:
                i == 0
                  ? this.intraoralExaminationResponse
                      ?.conditionProcedureGroupings
                      ?.conditionProcedureSurfaceRemarksResponse
                      ?.removablePartialDentureNote
                  : i == 1
                  ? this.intraoralExaminationResponse
                      ?.conditionProcedureGroupings
                      ?.conditionProcedureSurfaceRemarksResponse
                      ?.completeDentureNote
                  : i == 2
                  ? this.intraoralExaminationResponse
                      ?.conditionProcedureGroupings
                      ?.conditionProcedureSurfaceRemarksResponse
                      ?.almostCompleteDentureNote
                  : '',
              checked:
                this.intraoralExaminationResponse?.conditionProcedureGroupings
                  ?.denture[i].checked,
            });
          }
          // console.log("condition length = "+this.intraoralExaminationResponse?.conditionProcedureGroupings?.surgery.length)
          // let conditionlist =
          //     this.intraoralExaminationResponse?.conditionProcedureGroupings?.surgery.length != 0
          //         ? this.intraoralExaminationResponse?.conditionProcedureGroupings?.surgery
          //         : this.surgeryList;
          this.conditionProcedureSurfaceRemarksForm = this.fb.group({
            restorationInlayOther: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse
                ?.restorationInlayOther,
            ],
            restorationInlayNote: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse
                ?.restorationInlayNote,
            ],
            restorationOnlayOther: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse
                ?.restorationOnlayOther,
            ],
            restorationOnlayNote: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse
                ?.restorationOnlayNote,
            ],
            prostheticsNote: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse?.prostheticsNote,
            ],
            removablePartialDentureNote: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse
                ?.removablePartialDentureNote,
            ],
            completeDentureNote: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse?.completeDentureNote,
            ],
            almostCompleteDentureNote: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse
                ?.almostCompleteDentureNote,
            ],
            surgeryReason: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse?.surgeryReason,
            ],
            toothSurfaceNote: [
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditionProcedureSurfaceRemarksResponse?.toothSurfaceNote,
            ],
          });

          console.log('Fill conditions on get action');
          console.log(
            this.intraoralExaminationResponse?.conditionProcedureGroupings
              ?.conditions.length
          );
          console.log('this.conditionList value');
          console.log(this.conditionList);
          this.conditionProcedureGroupingsForm = this.fb.group({
            conditions: this.fb.array(
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditions.length != 0
                ? this.intraoralExaminationResponse?.conditionProcedureGroupings
                    ?.conditions
                : this.conditionList
            ),
            restorations: this.fb.array(
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.restorations.length != 0
                ? this.intraoralExaminationResponse?.conditionProcedureGroupings
                    ?.restorations
                : this.restorationList
            ),
            restorationsInlay: this.fb.array(
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.restorationsInlay.length != 0
                ? this.intraoralExaminationResponse?.conditionProcedureGroupings
                    ?.restorationsInlay
                : this.restorationInlayList
            ),
            restorationsOnlay: this.fb.array(
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.restorationsOnlay.length != 0
                ? this.intraoralExaminationResponse?.conditionProcedureGroupings
                    ?.restorationsOnlay
                : this.restorationOnlayList
            ),
            restorationsFluoride: this.fb.array(
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.restorationsFluoride.length != 0
                ? this.intraoralExaminationResponse?.conditionProcedureGroupings
                    ?.restorationsFluoride
                : this.restorationFluorideList
            ),
            prosthetics: this.fb.array(
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.prosthetics.length != 0
                ? this.intraoralExaminationResponse?.conditionProcedureGroupings
                    ?.prosthetics
                : this.prostheticsList
            ),
            denture: this.fb.array(
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.denture.length != 0
                ? dentureDBList
                : this.dentureList
            ),
            periodontal: this.fb.array(
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.periodontal.length != 0
                ? this.intraoralExaminationResponse?.conditionProcedureGroupings
                    ?.periodontal
                : this.periodontalList
            ),
            surgery: this.fb.array(
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.surgery.length != 0
                ? this.intraoralExaminationResponse?.conditionProcedureGroupings
                    ?.surgery
                : this.surgeryList
            ),
            conditionProcedureSurfaceRemarksResponse:
              this.conditionProcedureSurfaceRemarksForm,
          });
          this.toothNumbersId = [];
          this.toothNumbersValue = [];
          this.toothNumbersId.push(
            this.intraoralExaminationResponse?.dentalChartDesignId
          );
          this.toothNumbersValue.push(Number(teethNumbering));
          this.form = this.fb.group({
            profileId: [this.intraoralExaminationResponse?.profileId],
            dentalChartDesignId: [
              this.intraoralExaminationResponse?.dentalChartDesignId,
            ],
            dateOfProcedure: [
              this.intraoralExaminationResponse?.dateOfProcedure,
              Validators.required,
            ],
            dentalChartDesignResponse:
              this.intraoralExaminationResponse?.dentalChartDesignResponse,
            conditionProcedureGroupings: this.conditionProcedureGroupingsForm,
            surfaceCheckResponses: this.fb.array(
              this.intraoralExaminationResponse?.surfaceCheckResponses
            ),
          });
          console.log(this.form.value);
        },
        (error: any) => {
          console.log('error ==' + JSON.stringify(error));
        },
        () => console.log('Done getting Intraoral Examination response..')
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
          if (teethArea == 'top' && teethPositionStatus == 'StatusRight') {
            this.toothDetailsTempRightTop = [];
            for (let i = 0; i < response.length; i++) {
              this.toothDetailsTempRightTop.push({
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
          if (teethArea == 'top' && teethPositionStatus == 'StatusLeft') {
            this.toothDetailsTempLeftTop = [];
            for (let i = 0; i < response.length; i++) {
              this.toothDetailsTempLeftTop.push({
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
            teethArea == 'topCenter' &&
            teethPositionStatus == 'StatusRight'
          ) {
            this.toothDetailsPermaRightTopCenter = [];
            for (let i = 0; i < response.length; i++) {
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
          if (teethArea == 'bottom' && teethPositionStatus == 'StatusRight') {
            this.toothDetailsTempRightBottom = [];
            for (let i = 0; i < response.length; i++) {
              this.toothDetailsTempRightBottom.push({
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
          if (teethArea == 'bottom' && teethPositionStatus == 'StatusLeft') {
            this.toothDetailsTempLeftBottom = [];
            for (let i = 0; i < response.length; i++) {
              this.toothDetailsTempLeftBottom.push({
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
  get getFormConditions() {
    return this.conditionProcedureGroupingsForm.controls[
      'conditions'
    ] as FormArray;
  }
  onCheckboxChangeConditions(event: any, reset: boolean) {
    for (
      let i = 0;
      i < this.conditionProcedureGroupingsForm.value.conditions.length;
      i++
    ) {
      if (reset) {
        this.conditionProcedureGroupingsForm.value.conditions[i].checked =
          false;
      } else {
        if (
          event.target.value ==
          this.conditionProcedureGroupingsForm.value.conditions[i].value
        ) {
          if (
            this.conditionProcedureGroupingsForm.value.conditions[i].checked
          ) {
            this.conditionProcedureGroupingsForm.value.conditions[i].checked =
              false;
          } else {
            this.conditionProcedureGroupingsForm.value.conditions[i].checked =
              true;
          }
        }
      }
    }
  }
  get getFormRestorations() {
    return this.conditionProcedureGroupingsForm.controls[
      'restorations'
    ] as FormArray;
  }
  onCheckboxChangeRestorations(event: any, reset: boolean) {
    for (
      let i = 0;
      i < this.conditionProcedureGroupingsForm.value.restorations.length;
      i++
    ) {
      if (reset) {
        this.conditionProcedureGroupingsForm.value.restorations[i].checked =
          false;
      } else {
        if (
          event.target.value ==
          this.conditionProcedureGroupingsForm.value.restorations[i].value
        ) {
          if (
            this.conditionProcedureGroupingsForm.value.restorations[i].checked
          ) {
            this.conditionProcedureGroupingsForm.value.restorations[i].checked =
              false;
          } else {
            this.conditionProcedureGroupingsForm.value.restorations[i].checked =
              true;
          }
        }
      }
    }
  }
  get getFormRestorationsInlay() {
    return this.conditionProcedureGroupingsForm.controls[
      'restorationsInlay'
    ] as FormArray;
  }
  onCheckboxChangeRestorationsInlay(event: any, reset: boolean) {
    for (
      let i = 0;
      i < this.conditionProcedureGroupingsForm.value.restorationsInlay.length;
      i++
    ) {
      if (reset) {
        this.conditionProcedureGroupingsForm.value.restorationsInlay[
          i
        ].checked = false;
      } else {
        if (
          event.target.value ==
          this.conditionProcedureGroupingsForm.value.restorationsInlay[i].value
        ) {
          if (
            this.conditionProcedureGroupingsForm.value.restorationsInlay[i]
              .checked
          ) {
            this.conditionProcedureGroupingsForm.value.restorationsInlay[
              i
            ].checked = false;
          } else {
            this.conditionProcedureGroupingsForm.value.restorationsInlay[
              i
            ].checked = true;
          }
        }
      }
    }
  }
  get getFormRestorationsOnlay() {
    return this.conditionProcedureGroupingsForm.controls[
      'restorationsOnlay'
    ] as FormArray;
  }
  onCheckboxChangeRestorationsOnlay(event: any, reset: boolean) {
    for (
      let i = 0;
      i < this.conditionProcedureGroupingsForm.value.restorationsOnlay.length;
      i++
    ) {
      if (reset) {
        this.conditionProcedureGroupingsForm.value.restorationsOnlay[
          i
        ].checked = false;
      } else {
        if (
          event.target.value ==
          this.conditionProcedureGroupingsForm.value.restorationsOnlay[i].value
        ) {
          if (
            this.conditionProcedureGroupingsForm.value.restorationsOnlay[i]
              .checked
          ) {
            this.conditionProcedureGroupingsForm.value.restorationsOnlay[
              i
            ].checked = false;
          } else {
            this.conditionProcedureGroupingsForm.value.restorationsOnlay[
              i
            ].checked = true;
          }
        }
      }
    }
  }
  get getFormRestorationsFluoride() {
    return this.conditionProcedureGroupingsForm.controls[
      'restorationsFluoride'
    ] as FormArray;
  }
  onCheckboxChangeRestorationsFluoride(event: any, reset: boolean) {
    for (
      let i = 0;
      i <
      this.conditionProcedureGroupingsForm.value.restorationsFluoride.length;
      i++
    ) {
      if (reset) {
        this.conditionProcedureGroupingsForm.value.restorationsFluoride[
          i
        ].checked = false;
      } else {
        if (
          event.target.value ==
          this.conditionProcedureGroupingsForm.value.restorationsFluoride[i]
            .value
        ) {
          if (
            this.conditionProcedureGroupingsForm.value.restorationsFluoride[i]
              .checked
          ) {
            this.conditionProcedureGroupingsForm.value.restorationsFluoride[
              i
            ].checked = false;
          } else {
            this.conditionProcedureGroupingsForm.value.restorationsFluoride[
              i
            ].checked = true;
          }
        }
      }
    }
  }
  get getFormProsthetics() {
    return this.conditionProcedureGroupingsForm.controls[
      'prosthetics'
    ] as FormArray;
  }
  onCheckboxChangeProsthetics(event: any, reset: boolean) {
    for (
      let i = 0;
      i < this.conditionProcedureGroupingsForm.value.prosthetics.length;
      i++
    ) {
      if (reset) {
        this.conditionProcedureGroupingsForm.value.prosthetics[i].checked =
          false;
      } else {
        if (
          event.target.value ==
          this.conditionProcedureGroupingsForm.value.prosthetics[i].value
        ) {
          if (
            this.conditionProcedureGroupingsForm.value.prosthetics[i].checked
          ) {
            this.conditionProcedureGroupingsForm.value.prosthetics[i].checked =
              false;
          } else {
            this.conditionProcedureGroupingsForm.value.prosthetics[i].checked =
              true;
          }
        }
      }
    }
  }
  get getFormDenture() {
    return this.conditionProcedureGroupingsForm.controls[
      'denture'
    ] as FormArray;
  }
  onCheckboxChangeDenture(event: any, reset: boolean) {
    for (
      let i = 0;
      i < this.conditionProcedureGroupingsForm.value.denture.length;
      i++
    ) {
      if (reset) {
        this.conditionProcedureGroupingsForm.value.denture[i].checked = false;
      } else {
        if (
          event.target.value ==
          this.conditionProcedureGroupingsForm.value.denture[i].value
        ) {
          if (this.conditionProcedureGroupingsForm.value.denture[i].checked) {
            this.conditionProcedureGroupingsForm.value.denture[i].checked =
              false;
          } else {
            this.conditionProcedureGroupingsForm.value.denture[i].checked =
              true;
          }
        }
      }
    }
  }
  get getFormPeriodontal() {
    return this.conditionProcedureGroupingsForm.controls[
      'periodontal'
    ] as FormArray;
  }
  onCheckboxChangePeriodontal(event: any, reset: boolean) {
    for (
      let i = 0;
      i < this.conditionProcedureGroupingsForm.value.periodontal.length;
      i++
    ) {
      if (reset) {
        this.conditionProcedureGroupingsForm.value.periodontal[i].checked =
          false;
      } else {
        if (
          event.target.value ==
          this.conditionProcedureGroupingsForm.value.periodontal[i].value
        ) {
          if (
            this.conditionProcedureGroupingsForm.value.periodontal[i].checked
          ) {
            this.conditionProcedureGroupingsForm.value.periodontal[i].checked =
              false;
          } else {
            this.conditionProcedureGroupingsForm.value.periodontal[i].checked =
              true;
          }
        }
      }
    }
  }
  get getFormSurgery() {
    return this.conditionProcedureGroupingsForm.controls[
      'surgery'
    ] as FormArray;
  }
  onCheckboxChangeSurgery(event: any, reset: boolean) {
    for (
      let i = 0;
      i < this.conditionProcedureGroupingsForm.value.surgery.length;
      i++
    ) {
      if (reset) {
        this.conditionProcedureGroupingsForm.value.surgery[i].checked = false;
      } else {
        if (
          event.target.value ==
          this.conditionProcedureGroupingsForm.value.surgery[i].value
        ) {
          if (this.conditionProcedureGroupingsForm.value.surgery[i].checked) {
            this.conditionProcedureGroupingsForm.value.surgery[i].checked =
              false;
          } else {
            this.conditionProcedureGroupingsForm.value.surgery[i].checked =
              true;
          }
        }
      }
    }
  }
  get getFormSurfaceCheck() {
    return this.form.controls['surfaceCheckResponses'] as FormArray;
  }
  onCheckboxChangeSurfaceCheck(event: any, reset: boolean) {
    for (let i = 0; i < this.form.value.surfaceCheckResponses.length; i++) {
      if (reset) {
        this.form.value.surfaceCheckResponses[i].checked = false;
      } else {
        if (
          event.target.value == this.form.value.surfaceCheckResponses[i].value
        ) {
          if (this.form.value.surfaceCheckResponses[i].checked) {
            this.form.value.surfaceCheckResponses[i].checked = false;
          } else {
            this.form.value.surfaceCheckResponses[i].checked = true;
          }
        }
      }
    }
  }
  onCheckboxAllChangeSurfaceCheck(event: any, reset: boolean) {
    for (let i = 0; i < this.form.value.surfaceCheckResponses.length; i++) {
      if (reset) {
        this.form.value.surfaceCheckResponses[i].checked = false;
      } else {
        if (event.target.checked) {
          this.form.value.surfaceCheckResponses[i].checked = true;
        } else {
          this.form.value.surfaceCheckResponses[i].checked = false;
        }
      }
    }
  }
  onCheckboxChangeToothNumbers(event: any) {
    console.log(event);
    console.log(event.target.checked);
    console.log(event.target.value);
    console.log(event.target.name);
    const idNumber = event.target.value.split('-');
    if (event.target.checked) {
      this.toothNumbersId.push(Number(idNumber[0]));
      this.toothNumbersValue.push(Number(idNumber[1]));
    } else {
      const indexId: number = this.toothNumbersId.indexOf(Number(idNumber[0]));
      const indexNumber: number = this.toothNumbersValue.indexOf(
        Number(idNumber[1])
      );
      if (indexId !== -1) {
        this.toothNumbersId.splice(indexId, 1);
      }
      if (indexNumber !== -1) {
        this.toothNumbersValue.splice(indexNumber, 1);
      }
    }
    console.log(this.toothNumbersId);
    console.log(this.toothNumbersValue);
  }
  onChangeDateOfProcedure(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value?.toLocaleDateString('en-US', { month: '2-digit' }));
    console.log(event.value?.toLocaleDateString('en-US', { day: '2-digit' }));
    const dateOfProcedure =
      event.value?.toLocaleDateString('en-US', { year: 'numeric' }) +
      '-' +
      event.value?.toLocaleDateString('en-US', { month: '2-digit' }) +
      '-' +
      event.value?.toLocaleDateString('en-US', { day: '2-digit' });
    console.log('dateOfProcedure = ' + dateOfProcedure);
    this.onGetToothNumbers('TemporaryTeeth', 'top', 'StatusRight', 'desc');
    this.onGetToothNumbers('TemporaryTeeth', 'top', 'StatusLeft', 'asc');
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
    this.onGetToothNumbers('TemporaryTeeth', 'bottom', 'StatusRight', 'desc');
    this.onGetToothNumbers('TemporaryTeeth', 'bottom', 'StatusLeft', 'asc');
    this.resetAllCheckboxes();
    this.onGetData(this.id, this.teethNumbering, dateOfProcedure);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    // console.log('form value =-=-= ' + JSON.stringify(this.form.value));
    // console.log(JSON.stringify(this.form.value));

    if (this.toothNumbersId.length == 0) {
      return;
    }

    for (let i = 0; i < this.toothNumbersId.length; i++) {
      console.log(this.toothNumbersId[i]);
    }

    for (let i = 0; i < this.toothNumbersId.length; i++) {
      const conditions =
        this.form.value['conditionProcedureGroupings']['conditions'];
      const denture = this.form.value['conditionProcedureGroupings']['denture'];
      const periodontal =
        this.form.value['conditionProcedureGroupings']['periodontal'];
      const prosthetics =
        this.form.value['conditionProcedureGroupings']['prosthetics'];
      const restorations =
        this.form.value['conditionProcedureGroupings']['restorations'];
      const restorationsFluoride =
        this.form.value['conditionProcedureGroupings']['restorationsFluoride'];
      const restorationsInlay =
        this.form.value['conditionProcedureGroupings']['restorationsInlay'];
      const restorationsOnlay =
        this.form.value['conditionProcedureGroupings']['restorationsOnlay'];
      const surgery = this.form.value['conditionProcedureGroupings']['surgery'];
      const combineGroupings = conditions
        .concat(denture)
        .concat(periodontal)
        .concat(prosthetics)
        .concat(restorations)
        .concat(restorationsFluoride)
        .concat(restorationsInlay)
        .concat(restorationsOnlay)
        .concat(surgery);
      const conditionProcedureRequests: ConditionProcedureRequest[] =
        combineGroupings;

      const conditionProcedureRequest: ConditionProcedureModelRequest = {
        profileId: this.form.value['profileId'],
        dentalChartDesignId: this.toothNumbersId[i],
        dateOfProcedure: this.form.value['dateOfProcedure'],
        conditionProcedureRequests: conditionProcedureRequests,
        conditionProcedureRemarksRequests:
          this.form.value['conditionProcedureGroupings'][
            'conditionProcedureSurfaceRemarksResponse'
          ],
        surfaceCheckRequests: this.form.value['surfaceCheckResponses'],
      };
      console.log('conditionProcedureRequest 00');
      console.log(JSON.stringify(conditionProcedureRequest));
      console.log('conditionProcedureRequest 01');
      console.log(conditionProcedureRequest);
      this.intraoralExaminationService
        .createIntraOralExaminationModel(conditionProcedureRequest)
        .subscribe(
          (response: CustomHttpResponse) => {
            console.log(response);
            if (response.httpStatus == 'CREATED') {
              const messageSplit = response.message.split(':');
              const strLink =
                '<a href="/dental-records/dental-chart/intraoral-examination/add-record/' +
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
              this.resetAllCheckboxes();
              this.onGetData(this.id, this.teethNumbering, currentDate + '');
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
    this.toothNumbersId = [];
    this.toothNumbersValue = [];
    return;
  }
  private resetAllCheckboxes() {
    // reset all to false
    this.onCheckboxChangeConditions('', true);
    this.onCheckboxChangeRestorations('', true);
    this.onCheckboxChangeRestorationsInlay('', true);
    this.onCheckboxChangeRestorationsOnlay('', true);
    this.onCheckboxChangeRestorationsFluoride('', true);
    this.onCheckboxChangeProsthetics('', true);
    this.onCheckboxChangeDenture('', true);
    this.onCheckboxChangePeriodontal('', true);
    this.onCheckboxChangeSurgery('', true);
    this.onCheckboxChangeSurfaceCheck('', true);
    this.onCheckboxAllChangeSurfaceCheck('', true);
  }
}
