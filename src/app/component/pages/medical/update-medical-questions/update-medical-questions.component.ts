import { MedicalStatus } from 'src/app/model/interface/medicalHistoryModel/medical-status';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicalModel } from 'src/app/model/interface/medicalHistoryModel/medical-model';
import { Question } from 'src/app/model/interface/medicalHistoryModel/question';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { MedicalHistoryService } from 'src/app/service/medicalHistory/medical-history.service';

@Component({
  selector: 'app-update-medical-questions',
  templateUrl: './update-medical-questions.component.html',
  styleUrls: ['./update-medical-questions.component.scss'],
})
export class UpdateMedicalQuestionsComponent implements OnInit {
  public id: any | undefined;
  public profileModel: ProfileModel | undefined;
  public medicalModel: MedicalModel | undefined;
  public allergiesFormArray: FormArray | undefined;
  public allergiesCollection: any[] = [];
  public submitted = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public listOfAllergies: Array<any> = [
    {
      name: 'Local Anesthetic (ex. Lidocaine)',
      value: 'Local Anesthetic',
      checked: false,
    },
    {
      name: 'Penicillin or Antibiotics',
      value: 'Penicillin or Antibiotics',
      checked: false,
    },
    { name: 'Latex', value: 'Latex', checked: false },
    { name: 'Sulfa drugs', value: 'Sulfa drugs', checked: false },
    { name: 'Aspirin', value: 'Aspirin', checked: false },
  ];
  public formAllergies!: FormGroup;
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
    haveYouHadAnyOfTheFollowing: this.formBuilder.array([]),
    otherHaveYouHadAnyOfTheFollowing: new FormControl(''),
    bloodPressureDate: new FormControl(''),
  });
  constructor(
    private profileModelService: ProfileModelService,
    private medicalHistoryService: MedicalHistoryService,
    public alertService: AlertService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.formAllergies = this.fb.group({
      allergies: this.fb.array([], [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel(this.id);
    this.onGetMedicalModel(this.id);
    // this.onGetProfileModel(this.id);
  }
  get listOfAllAllergies() {
    return this.form.controls['allergies'] as FormArray;
  }
  public onGetProfileModel(id: number): void {
    this.profileModelService.getProfileModel(id).subscribe(
      (response) => {
        console.log('res=' + response);
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
        //console.log('resss=' + JSON.stringify(response));
        this.medicalModel = response;
        //console.log('here');

        // this.allergiesFormArray = allergies;
        //console.log('this.ListOfAllergies === ' + JSON.stringify(this.ListOfAllergies));

        // otherHaveYouHadAnyOfTheFollowing: string;
        this.form = this.formBuilder.group({
          id: [this.medicalModel?.medicalModel?.id],
          goodHealth: [
            this.medicalModel?.questions?.goodHealth,
            [Validators.required],
          ],
          medicalTreatment: [
            this.medicalModel?.questions?.medicalTreatment,
            [Validators.required],
          ],
          conditionTreated: [
            this.medicalModel?.questions?.conditionTreated,
            [Validators.required],
          ],
          surgicalOperation: [
            this.medicalModel?.questions?.surgicalOperation,
            [Validators.required],
          ],
          whatOperation: [
            this.medicalModel?.questions?.whatOperation,
            [Validators.required],
          ],
          hospitalized: [
            this.medicalModel?.questions?.hospitalized,
            [Validators.required],
          ],
          whenWhyHospitalized: [
            this.medicalModel?.questions?.whenWhyHospitalized,
            [Validators.required],
          ],
          prescriptionMedication: [
            this.medicalModel?.questions?.prescriptionMedication,
            [Validators.required],
          ],
          specificPrescriptionMedication: [
            this.medicalModel?.questions?.specificPrescriptionMedication,
            [Validators.required],
          ],
          tobacco: [
            this.medicalModel?.questions?.tobacco,
            [Validators.required],
          ],
          alcoholCocaineOtherDrugs: [
            this.medicalModel?.questions?.alcoholCocaineOtherDrugs,
            [Validators.required],
          ],
          allergies: [[]],
          otherAllergies: [
            this.medicalModel?.questions?.otherAllergies,
            [Validators.required],
          ],
          bleedingTime: [
            this.medicalModel?.questions?.bleedingTime,
            [Validators.required],
          ],
          womanOnlyPregnant: [
            this.medicalModel?.questions?.womanOnlyPregnant,
            [Validators.required],
          ],
          womanOnlyNursing: [
            this.medicalModel?.questions?.womanOnlyNursing,
            [Validators.required],
          ],
          womanOnlyBirthControlPills: [
            this.medicalModel?.questions?.womanOnlyBirthControlPills,
            [Validators.required],
          ],
          bloodType: [
            this.medicalModel?.questions?.bloodType,
            [Validators.required],
          ],
          bloodPressure: [
            this.medicalModel?.questions?.bloodPressure,
            [Validators.required],
          ],
          haveYouHadAnyOfTheFollowing: [
            this.medicalModel?.questions?.haveYouHadAnyOfTheFollowing,
            [Validators.required],
          ],
          otherHaveYouHadAnyOfTheFollowing: [
            this.medicalModel?.questions?.otherHaveYouHadAnyOfTheFollowing,
            [Validators.required],
          ],
        });

        //const allergies = this.medicalModel?.questions?.allergies.split(',');
        //console.log('allergies length === ' + allergies.length);

        // for (let i = 0; i < allergies.length; i++) {
        //     // console.log('vals=' + allergies[i]);d
        //     // this.allergiesCollection.push(allergies[i]);
        //     // allergiess.push(allergies[i]);
        //     this.updateCheckedBox(allergies[i]);
        // }

        //const allergiess = this.form.controls['allergies'] as FormArray;
        // console.log('-=-=-=');
        //console.log('this.form =-=- ' + JSON.stringify(this.form.controls));
        //console.log('allergiess = ' + JSON.stringify(this.form.controls['allergies']));
        //console.log('allergiess length === ' + allergiess.length);
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        // console.log('allergies === ' + JSON.stringify(this.allergiesFormArray));
        console.log('Done getting medical health..');
      }
    );
  }
  updateCheckedBox(key: String) {
    // console.log('this.listOfAllergies.length == ' + this.listOfAllergies.length);
    const allergies = this.form.controls['allergies'] as FormArray;
    for (let i = 0; i < this.listOfAllergies.length; i++) {
      //console.log('key vals=' + key);
      //console.log('list allergies vals=' + this.listOfAllergies[i].value);
      if (key == this.listOfAllergies[i].value) {
        //console.log('here');
        this.listOfAllergies[i].checked = true;
        allergies.push(new FormControl(this.listOfAllergies[i].value));
      }
      //console.log('this.listOfAllergies[i].checked == ' + this.listOfAllergies[i].checked);
    }
  }
  onCheckboxChangeAllergies(event: any) {
    console.log(event.target.value);
    const allergies = this.form.controls['allergies'] as FormArray;
    if (event.target.checked) {
      allergies.push(new FormControl(event.target.value));
    } else {
      const index = allergies.controls.findIndex(
        (x) => x.value === event.target.value
      );
      allergies.removeAt(index);
    }
  }
  onCheckboxChangeHadAnyFollowing(event: any) {
    console.log(event.target.value);
    const selectedHadFollowing = this.form.controls[
      'haveYouHadAnyOfTheFollowing'
    ] as FormArray;
    if (event.target.checked) {
      selectedHadFollowing.push(new FormControl(event.target.value));
    } else {
      const index = selectedHadFollowing.controls.findIndex(
        (x) => x.value === event.target.value
      );
      selectedHadFollowing.removeAt(index);
    }
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const question: Question = {
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

    console.log('question == ' + JSON.stringify(question));
    const addMedicalModel: MedicalModel = {
      medicalModel: {
        createdBy: 'Kenzou',
        profileId: this.id,
      },
      physician: [],
      questions: question,
      informedConsents: [],
      medicalClearances: [],
    };
    console.log('addMedicalModel == ' + JSON.stringify(addMedicalModel));
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
            this.alertService.success(messageSplit[0] + strLink, this.options);
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
