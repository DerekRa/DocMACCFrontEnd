import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicalModel } from 'src/app/model/interface/medicalHistoryModel/medical-model';
import { MedicalQuestionsModel } from 'src/app/model/interface/medicalHistoryModel/medical-questions-model';
import { Question } from 'src/app/model/interface/medicalHistoryModel/question';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { MedicalHistoryService } from 'src/app/service/medicalHistory/medical-history.service';

@Component({
  selector: 'app-add-medical-questions',
  templateUrl: './add-update-medical-questions.component.html',
  styleUrls: ['./add-update-medical-questions.component.scss'],
})
export class AddUpdateMedicalQuestionsComponent implements OnInit {
  public profileModel: ProfileModel | undefined;
  public medicalModel: MedicalModel | undefined;
  public id: any;
  public urlLocation: string = 'Add';
  public allergyList: any[] = [
    {
      fcname: 'localAnes',
      inputId: 'localAnesId',
      name: 'Local Anesthetic (ex. Lidocaine)',
      value: 'Local Anesthetic',
      checked: false,
    },
    {
      fcname: 'penicilAntib',
      inputId: 'penicilAntibId',
      name: 'Penicillin or Antibiotics',
      value: 'Penicillin or Antibiotics',
      checked: false,
    },
    {
      fcname: 'latexName',
      inputId: 'latexNameId',
      name: 'Latex',
      value: 'Latex',
      checked: false,
    },
    {
      fcname: 'sulDrug',
      inputId: 'sulDrugId',
      name: 'Sulfa Drugs',
      value: 'Sulfa Drugs',
      checked: false,
    },
    {
      fcname: 'aspirinData',
      inputId: 'aspirinDataId',
      name: 'Aspirin',
      value: 'Aspirin',
      checked: false,
    },
  ];
  public medicalConditionList: any[] = [
    {
      name: 'High Blood Pressure',
      value: 'High Blood Pressure',
      checked: false,
    },
    { name: 'Low Blood Pressure', value: 'Low Blood Pressure', checked: false },
    {
      name: 'Epilepsy / Convulsions',
      value: 'Epilepsy / Convulsions',
      checked: false,
    },
    {
      name: 'AIDS or HIV Infection',
      value: 'AIDS or HIV Infection',
      checked: false,
    },
    {
      name: 'Sexually Transmitted disease',
      value: 'Sexually Transmitted disease',
      checked: false,
    },
    {
      name: 'Stomach Troubles / Ulcers',
      value: 'Stomach Troubles / Ulcers',
      checked: false,
    },
    { name: 'Fainting Seizure', value: 'Fainting Seizure', checked: false },
    { name: 'Rapid Weight Loss', value: 'Rapid Weight Loss', checked: false },
    { name: 'Radiation Therapy', value: 'Radiation Therapy', checked: false },
    {
      name: 'Joint Replacement / Implant',
      value: 'Joint Replacement / Implant',
      checked: false,
    },
    { name: 'Heart Surgery', value: 'Heart Surgery', checked: false },
    { name: 'Heart Attack', value: 'Heart Attack', checked: false },
    { name: 'Thyroid Problem', value: 'Thyroid Problem', checked: false },
    { name: 'Heart Disease', value: 'Heart Disease', checked: false },
    { name: 'Heart Murmur', value: 'Heart Murmur', checked: false },
    {
      name: 'Hepatitis / Liver Disease',
      value: 'Hepatitis / Liver Disease',
      checked: false,
    },
    { name: 'Rheumatic Fever', value: 'Rheumatic Fever', checked: false },
    {
      name: 'Hay Fever / Allergies',
      value: 'Hay Fever / Allergies',
      checked: false,
    },
    {
      name: 'Respiratory Problems',
      value: 'Respiratory Problems',
      checked: false,
    },
    {
      name: 'Hepatitis / Jaundice',
      value: 'Hepatitis / Jaundice',
      checked: false,
    },
    { name: 'Tuberculosis', value: 'Tuberculosis', checked: false },
    { name: 'Swallon Ankles', value: 'Swallon Ankles', checked: false },
    { name: 'Kidney Disease', value: 'Kidney Disease', checked: false },
    { name: 'Diabetes', value: 'Diabetes', checked: false },
    { name: 'Chest Pain', value: 'Chest Pain', checked: false },
    { name: 'Stroke', value: 'Stroke', checked: false },
    { name: 'Cancer / Tumors', value: 'Cancer / Tumors', checked: false },
    { name: 'Anemia', value: 'Anemia', checked: false },
    { name: 'Angina', value: 'Angina', checked: false },
    { name: 'Asthma', value: 'Asthma', checked: false },
    { name: 'Emphysema', value: 'Emphysema', checked: false },
    { name: 'Bleeding Problems', value: 'Bleeding Problems', checked: false },
    { name: 'Blood Disease', value: 'Blood Disease', checked: false },
    { name: 'Head Injuries', value: 'Head Injuries', checked: false },
    {
      name: 'Arthritis / Rheumatism',
      value: 'Arthritis / Rheumatism',
      checked: false,
    },
  ];
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    id: new FormControl(''),
    goodHealth: new FormControl(''),
    medicalTreatment: new FormControl(''),
    conditionTreated: new FormControl(''),
    surgicalOperation: new FormControl(''),
    whatOperation: new FormControl(''),
    hospitalized: new FormControl(''),
    whenWhyHospitalized: new FormControl(''),
    prescriptionMedication: new FormControl(''),
    specificPrescriptionMedication: new FormControl(''),
    tobacco: new FormControl(''),
    alcoholCocaineOtherDrugs: new FormControl(''),
    allergies: this.fb.array([]),
    otherAllergies: new FormControl(''),
    bleedingTime: new FormControl(''),
    womanOnlyPregnant: new FormControl(''),
    womanOnlyNursing: new FormControl(''),
    womanOnlyBirthControlPills: new FormControl(''),
    bloodType: new FormControl(''),
    bloodPressure: new FormControl(''),
    haveYouHadAnyOfTheFollowing: this.fb.array([]),
    otherHaveYouHadAnyOfTheFollowing: new FormControl(''),
    bloodPressureDate: new FormControl(''),
  });
  public submitted = false;
  constructor(
    private profileModelService: ProfileModelService,
    private medicalHistoryService: MedicalHistoryService,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    if (this.urlCurrentLocation() == 'update-patient') {
      this.urlLocation = 'Update';
    }
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel(this.id);
    this.onGetMedicalModel(this.id);
    console.log('this.medicalModel = ' + this.medicalModel);
    if (this.medicalModel == undefined) {
      this.form = this.fb.group({
        id: [''],
        goodHealth: ['', this.validatorData('four')],
        medicalTreatment: ['', this.validatorData('four')],
        conditionTreated: ['', this.validatorData('one')],
        surgicalOperation: ['', this.validatorData('four')],
        whatOperation: ['', this.validatorData('one')],
        hospitalized: ['', this.validatorData('four')],
        whenWhyHospitalized: ['', this.validatorData('one')],
        prescriptionMedication: ['', this.validatorData('four')],
        specificPrescriptionMedication: ['', this.validatorData('one')],
        tobacco: ['', this.validatorData('four')],
        alcoholCocaineOtherDrugs: ['', this.validatorData('four')],
        allergies: this.fb.array(this.allergyList),
        otherAllergies: [''],
        bleedingTime: [''],
        womanOnlyPregnant: [''],
        womanOnlyNursing: [''],
        womanOnlyBirthControlPills: [''],
        bloodType: ['', this.validatorData('five')],
        bloodPressure: ['', this.validatorData('one')],
        haveYouHadAnyOfTheFollowing: this.fb.array(this.medicalConditionList),
        otherHaveYouHadAnyOfTheFollowing: [''],
        bloodPressureDate: [''],
      });
    }
  }
  public onGetProfileModel(id: number): void {
    this.profileModelService.getProfileModel(id).subscribe(
      (response) => {
        this.profileModel = response;
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('Done getting single profile..')
    );
  }
  public onGetMedicalModel(id: number): void {
    this.medicalHistoryService.getMedicalModel(id).subscribe(
      (response: MedicalModel) => {
        this.medicalModel = response;
        this.allergyList = this.medicalModel?.questions?.allergies;

        this.form = this.fb.group({
          id: [this.medicalModel?.questions?.id],
          goodHealth: [
            this.medicalModel?.questions?.medicalTreatment,
            this.validatorData('one'),
          ],
          medicalTreatment: [
            this.medicalModel?.questions?.medicalTreatment,
            this.validatorData('one'),
          ],
          conditionTreated: [this.medicalModel?.questions?.conditionTreated],
          surgicalOperation: [
            this.medicalModel?.questions?.surgicalOperation,
            this.validatorData('four'),
          ],
          whatOperation: [this.medicalModel?.questions?.whatOperation],
          hospitalized: [
            this.medicalModel?.questions?.hospitalized,
            this.validatorData('four'),
          ],
          whenWhyHospitalized: [
            this.medicalModel?.questions?.whenWhyHospitalized,
          ],
          prescriptionMedication: [
            this.medicalModel?.questions?.prescriptionMedication,
            this.validatorData('four'),
          ],
          specificPrescriptionMedication: [
            this.medicalModel?.questions?.specificPrescriptionMedication,
          ],
          tobacco: [
            this.medicalModel?.questions?.tobacco,
            this.validatorData('four'),
          ],
          alcoholCocaineOtherDrugs: [
            this.medicalModel?.questions?.alcoholCocaineOtherDrugs,
            this.validatorData('four'),
          ],
          allergies: this.fb.array(
            this.medicalModel?.questions?.allergies
              ? this.medicalModel?.questions?.allergies
              : this.allergyList
          ),
          otherAllergies: [this.medicalModel?.questions?.otherAllergies],
          bleedingTime: [this.medicalModel?.questions?.bleedingTime],
          womanOnlyPregnant: [this.medicalModel?.questions?.womanOnlyPregnant],
          womanOnlyNursing: [this.medicalModel?.questions?.womanOnlyNursing],
          womanOnlyBirthControlPills: [
            this.medicalModel?.questions?.womanOnlyBirthControlPills,
          ],
          bloodType: [
            this.medicalModel?.questions?.bloodType,
            this.validatorData('five'),
          ],
          bloodPressure: [
            this.medicalModel?.questions?.bloodPressure,
            this.validatorData('one'),
          ],
          haveYouHadAnyOfTheFollowing: this.fb.array(
            this.medicalModel?.questions?.haveYouHadAnyOfTheFollowing
              ? this.medicalModel?.questions?.haveYouHadAnyOfTheFollowing
              : this.medicalConditionList
          ),
          otherHaveYouHadAnyOfTheFollowing: [
            this.medicalModel?.questions?.otherHaveYouHadAnyOfTheFollowing,
          ],
          bloodPressureDate: [this.medicalModel?.medicalModel?.createdAt],
        });
        if (this.medicalModel?.questions?.medicalTreatment == 'No') {
          this.form.controls['conditionTreated'].disable();
        }
        if (this.medicalModel?.questions?.surgicalOperation == 'No') {
          this.form.controls['whatOperation'].disable();
        }
        if (this.medicalModel?.questions?.hospitalized == 'No') {
          this.form.controls['whenWhyHospitalized'].disable();
        }
        if (this.medicalModel?.questions?.prescriptionMedication == 'No') {
          this.form.controls['specificPrescriptionMedication'].disable();
        }
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        console.log('Done getting medical health..');
      }
    );
  }
  get getFormAllergies() {
    return this.form.controls['allergies'] as FormArray;
  }
  get getFormMediclConditions() {
    return this.form.controls['haveYouHadAnyOfTheFollowing'] as FormArray;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onChangeConditionYesNo(event: any, controlName: any) {
    if (event.target.value == 'Yes') {
      this.form.controls[controlName].enable();
      this.form.controls[controlName].setValidators(this.validatorData('one'));
    } else {
      //this.form.controls[controlName].clearValidators();
      this.form.controls[controlName].reset();
      this.form.controls[controlName].disable();
    }
    this.form.controls[controlName].updateValueAndValidity();
  }
  onCheckboxChangeAllergies(event: any) {
    for (let i = 0; i < this.form.value.allergies.length; i++) {
      if (event.target.value == this.form.value.allergies[i].value) {
        if (this.form.value.allergies[i].checked) {
          this.form.value.allergies[i].checked = false;
        } else {
          this.form.value.allergies[i].checked = true;
        }
      }
    }
  }
  onCheckboxChangeHadAnyFollowing(event: any) {
    for (
      let i = 0;
      i < this.form.value.haveYouHadAnyOfTheFollowing.length;
      i++
    ) {
      if (
        event.target.value ==
        this.form.value.haveYouHadAnyOfTheFollowing[i].value
      ) {
        if (this.form.value.haveYouHadAnyOfTheFollowing[i].checked) {
          this.form.value.haveYouHadAnyOfTheFollowing[i].checked = false;
        } else {
          this.form.value.haveYouHadAnyOfTheFollowing[i].checked = true;
        }
      }
    }
  }
  validatorData(event: any) {
    if (event == 'one') {
      return [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(83),
      ];
    } else if (event == 'two') {
      return [Validators.minLength(2), Validators.maxLength(83)];
    } else if (event == 'three') {
      return [Validators.minLength(2), Validators.maxLength(255)];
    } else if (event == 'four') {
      return [Validators.required];
    } else if (event == 'five') {
      return [Validators.required, Validators.maxLength(83)];
    } else {
      return [];
    }
  }
  urlCurrentLocation() {
    const urlPathName = window.location.pathname;
    const urlAction = urlPathName.split('/');
    return urlAction[2];
  }
  onSubmit(): void {
    this.submitted = true;
    //console.log('form value =-=-= ' + JSON.stringify(this.form.value));
    if (this.form.invalid) {
      return;
    }
    const question: Question = {
      id: this.form.value['id'],
      goodHealth: this.form.value['goodHealth'],
      medicalTreatment: this.form.value['medicalTreatment'],
      conditionTreated: this.form.value['conditionTreated'],
      surgicalOperation: this.form.value['surgicalOperation'],
      whatOperation: this.form.value['whatOperation'],
      hospitalized: this.form.value['hospitalized'],
      whenWhyHospitalized: this.form.value['whenWhyHospitalized'],
      prescriptionMedication: this.form.value['prescriptionMedication'],
      specificPrescriptionMedication:
        this.form.value['specificPrescriptionMedication'],
      tobacco: this.form.value['tobacco'],
      alcoholCocaineOtherDrugs: this.form.value['alcoholCocaineOtherDrugs'],
      allergies: this.form.value['allergies'],
      otherAllergies: this.form.value['otherAllergies'],
      bleedingTime: this.form.value['bleedingTime'],
      womanOnlyPregnant: this.form.value['womanOnlyPregnant'],
      womanOnlyNursing: this.form.value['womanOnlyNursing'],
      womanOnlyBirthControlPills: this.form.value['womanOnlyBirthControlPills'],
      bloodType: this.form.value['bloodType'],
      bloodPressure: this.form.value['bloodPressure'],
      haveYouHadAnyOfTheFollowing:
        this.form.value['haveYouHadAnyOfTheFollowing'],
      otherHaveYouHadAnyOfTheFollowing:
        this.form.value['otherHaveYouHadAnyOfTheFollowing'],
    };
    //console.log('question == ' + JSON.stringify(question));

    if (this.urlCurrentLocation() === 'add-patient') {
      const addMedicalModel: MedicalQuestionsModel = {
        medicalModel: {
          createdBy: 'Kenzou',
          profileId: this.id,
        },
        questions: question,
      };
      this.medicalHistoryService
        .createMedicalQuestionsModel(addMedicalModel)
        .subscribe(
          (response: CustomHttpResponse) => {
            console.log(response);
            if (response.httpStatus == 'CREATED') {
              const messageSplit = response.message.split(':');
              const strLink =
                '<a href="/medical-history/patient/' +
                this.id +
                '">Click here to view..</a>';
              this.options.autoClose = false;
              this.alertService.success(
                messageSplit[0] + strLink,
                this.options
              );
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
    } else if (this.urlCurrentLocation() === 'update-patient') {
      const updateMedicalModel: MedicalQuestionsModel = {
        medicalModel: {
          id: this.medicalModel?.medicalModel.id,
          updatedBy: 'Killua',
        },
        questions: question,
      };
      this.medicalHistoryService
        .updateMedicalQuestionsModel(updateMedicalModel)
        .subscribe(
          (response: CustomHttpResponse) => {
            console.log(response);
            if (response.httpStatus == 'OK') {
              const messageSplit = response.message.split(':');
              const strLink =
                '<a href="/medical-history/patient/' +
                this.id +
                '">Click here to view..</a>';
              this.options.autoClose = false;
              this.alertService.success(
                messageSplit[0] + strLink,
                this.options
              );
            }
          },
          (error: any) => {
            console.log(error);
            const errorResponse: CustomHttpResponse = error['error'];
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
          () => console.log('Done updating medical records..')
        );
    }
  }
}
