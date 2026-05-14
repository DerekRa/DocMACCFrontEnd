import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-allergies',
  templateUrl: './add-allergies.component.html',
  styleUrls: ['./add-allergies.component.scss'],
})
export class AddAllergiesComponent implements OnInit {
  ngOnInit(): void {
    this.listOfAllAllergiess;
    throw new Error('Method not implemented.');
  }

  public listOfAllergiess: any[] = [
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
  allergiesForm: FormGroup;
  form = this.fb.group({
    lessons: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {
    //this.listOfAllAllergies;
    // this.form.value['allergies'] = this.listOfAllergies;
    this.allergiesForm = this.fb.group({
      allergies: this.fb.array([
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
      ]),
    });
    // console.log('allergies form -=-= ' + JSON.stringify(this.allergiesForm.value));
  }

  get listOfAllAllergiess() {
    //return this.listOfAllergiess;
    return (<FormArray>this.allergiesForm.get('allergies')).controls;
    //return this.allergiesForm.get('allergies')['controls'] as FormArray;
    //return this.allergiesForm.controls['allergies'] as FormArray<any>;
  }
  onCheckboxChangeAllergies(event: any) {
    //const allergies = this.allergiesForm.controls['allergiess'] as FormArray;
    for (let i = 0; i < this.allergiesForm.value.allergies.length; i++) {
      if (event.target.value == this.allergiesForm.value.allergies[i].value) {
        if (this.allergiesForm.value.allergies[i].checked) {
          this.allergiesForm.value.allergies[i].checked = false;
        } else {
          this.allergiesForm.value.allergies[i].checked = true;
        }
      }
    }
    //allergies.patchValue(event.target.value);
  }

  get lessons() {
    return this.form.controls['lessons'] as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required],
    });
    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }
}
