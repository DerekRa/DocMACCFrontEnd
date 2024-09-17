import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Physician } from 'src/app/model/interface/medicalHistoryModel/physician';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { PhysicianHistoryService } from 'src/app/service/dentalRecord/physician-history.service';

@Component({
  selector: 'app-add-update-physician',
  templateUrl: './add-physician.component.html',
  styleUrls: ['./add-physician.component.scss'],
})
export class AddUpdatePhysicianComponent {
  public id: any;
  public action: any;
  public item_name: any;
  public urlLocation: string = 'Add';
  public submitted = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    officeAddress: new FormControl(''),
    officeNumber: new FormControl(''),
    specialty: new FormControl(''),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
    private physicianHistoryService: PhysicianHistoryService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.params['action'];
    this.form = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      officeAddress: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      officeNumber: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      specialty: [
        '',
        [
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
    });
  }
  urlCurrentLocation() {
    const urlPathName = window.location.pathname;
    const urlAction = urlPathName.split('/');
    return urlAction[5];
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    //console.log('form value =-=-= ' + JSON.stringify(this.form.value));
    if (this.form.invalid) {
      return;
    }
    console.log('this.urlCurrentLocation()  = ' + this.urlCurrentLocation());
    if (this.urlCurrentLocation() === 'Add') {
      const addPhysician: Physician = {
        fullName: this.form.value['fullName'],
        officeAddress: this.form.value['officeAddress'],
        officeNumber: this.form.value['officeNumber'],
        specialty: this.form.value['specialty'],
        createdBy: this.id,
      };
      this.physicianHistoryService
        .createPhysicianHistory(addPhysician)
        .subscribe(
          (response: CustomHttpResponse) => {
            console.log(response);
            if (response.httpStatus == 'CREATED') {
              const messageSplit = response.message.split(':');
              const strLink =
                '<a href="/medical-history/patient/physicians/' +
                this.id +
                '/View/' +
                messageSplit[1] +
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
          () => console.log('Done adding single physician..')
        );
    }
  }
}
