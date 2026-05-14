import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { RegularPatientRequest } from 'src/app/model/interface/appointmentModel/regular-patient-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { PatientAppointmentService } from 'src/app/service/home/patient-appointment.service';

@Component({
  selector: 'app-add-update-appointment',
  templateUrl: './add-update-appointment.component.html',
  styleUrls: ['./add-update-appointment.component.scss'],
})
export class AddUpdateAppointmentComponent implements OnInit {
  constructor(
    private readonly keycloak: KeycloakService,
    private patientAppointmentService: PatientAppointmentService,
    private profileModelService: ProfileModelService,
    public alertService: AlertService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
  ) {}
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.onGetProfileModel();
    this.form = this.formBuilder.group({
      eventTitle: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      serviceToAvail: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      ],
      rangeDateFrom: ['', Validators.required],
      rangeTimeFrom: ['', Validators.required],
    });
  }

  public id: any;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public currentDate = new Date();
  public submitted = false;
  public profileModel: ProfileModel | undefined;
  public form: FormGroup = new FormGroup({
    eventTitle: new FormControl(''),
    serviceToAvail: new FormControl(''),
    rangeDateFrom: new FormControl(''),
    rangeTimeFrom: new FormControl(''),
  });
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  private convert(time: string) {
    let [hour, modifier] = time.split(':');
    let min = parseInt(modifier).toString().padStart(2, '0');
    let index = modifier.toLowerCase().indexOf('m');
    let meridian = modifier.slice(index - 1);
    let hr = parseInt(hour);

    if (hour === '12') {
      hr = 0;
    }

    if (meridian == 'PM') {
      hr = hr + 12;
    }

    hour = hr.toString().padStart(2, '0');

    let time24hr = `${hour}:${min}`;

    return time24hr;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const dateFormat = this.datepipe.transform(
      this.form.value['rangeDateFrom'],
      'yyyy-MM-dd',
    );

    const timeFormat = this.convert(this.form.value['rangeTimeFrom']);
    const regularPatientRequest: RegularPatientRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      eventTitle: this.form.value['eventTitle'],
      serviceToAvail: this.form.value['serviceToAvail'],
      rangeDateTimeFrom: dateFormat + 'T' + timeFormat,
      rangeDateTimeTo: dateFormat + 'T' + timeFormat,
    };

    this.patientAppointmentService
      .createRegularAppointment(regularPatientRequest)
      .subscribe(
        (response: CustomHttpResponse) => {
          if (response.httpStatus == 'CREATED') {
            const messageSplit = response.message.split(':');
            const strLink =
              '<a href="/dental-records/treatment-plan/intraoral/' +
              this.id +
              '"> Click here to view..</a>';
            this.options.autoClose = false;
            this.alertService.success(messageSplit[0] + strLink, this.options);
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
