import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MedicalModel } from 'src/app/model/interface/medicalHistoryModel/medical-model';
import { MedicalHistoryService } from 'src/app/service/medicalHistory/medical-history.service';
// import { MedicalHistoryService } from 'src/app/service/medical-history.service';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.scss'],
})
export class AllergiesComponent implements OnInit {
  public listOfAllergies: any[] = [
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
  public medicalModel: MedicalModel | undefined;
  public form: FormGroup = new FormGroup({ allergies: this.fb.array([]) });
  ngOnInit(): void {
    this.onGetMedicalModel(2);
  }
  constructor(
    private medicalHistoryService: MedicalHistoryService, // private formBuilder: FormBuilder,
    private fb: FormBuilder
  ) {}
  public onGetMedicalModel(id: number): void {
    this.medicalHistoryService.getMedicalModel(id).subscribe(
      (response: MedicalModel) => {
        this.medicalModel = response;
        //const allergies = this.medicalModel?.questions?.allergies.split(',');

        // for (let i = 0; i < allergies.length; i++) {
        //     this.updateCheckedBox(allergies[i]);
        // }
        const allergiesForms = this.form.controls['allergies'] as FormArray;
        for (let i = 0; i < this.listOfAllergies.length; i++) {
          allergiesForms.push(new FormControl(this.listOfAllergies[i]));
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

  get listOfAllAllergies() {
    return this.form.controls['allergies'] as FormArray;
  }
  updateCheckedBox(key: String) {
    //console.log('this.listOfAllergies.length == ' + this.listOfAllergies.length);
    const allergies = this.form.controls['allergies'] as FormArray;
    for (let i = 0; i < this.listOfAllergies.length; i++) {
      //console.log('key vals=' + key);
      //console.log('list allergies vals=' + this.listOfAllergies[i].value);
      if (key == this.listOfAllergies[i].value) {
        //console.log('here');
        this.listOfAllergies[i].checked = true;
      }
      // allergies.push(new FormControl(this.listOfAllergies[i].value));
      //console.log('this.listOfAllergies[i].checked == ' + this.listOfAllergies[i].checked);
    }
  }
  onCheckboxChangeAllergies(event: any) {
    console.log(event.target.value);
    //const allergies = this.form.controls['allergies'] as FormArray;
    console.log('reach until here');
    console.log('event.target.value -=-=- ' + event.target.value);
    console.log(
      'data before -=-=- ' + JSON.stringify(this.form.value.allergies)
    );
    for (let i = 0; i < this.form.value.allergies.length; i++) {
      if (event.target.value == this.form.value.allergies[i].value) {
        console.log('check value == ' + this.form.value.allergies[i].checked);
        if (this.form.value.allergies[i].checked) {
          this.form.value.allergies[i].checked = false;
        } else {
          this.form.value.allergies[i].checked = true;
        }
      }
    }

    //allergies.patchValue(event.target.value);
    console.log(
      'data after  -=-=- ' + JSON.stringify(this.form.value.allergies)
    );
  }
}
