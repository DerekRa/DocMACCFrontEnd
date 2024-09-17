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
import { User } from 'src/app/model/class/authenticate/user.model';
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
    public datepipe: DatePipe
  ) {}
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    // console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    console.log('::::::::');
    console.log(this.userProfile);
    this.onGetProfileModel();
    this.form = this.formBuilder.group({
      eventTitle: ['', [Validators.required, Validators.minLength(2)]],
      serviceToAvail: ['', [Validators.required, Validators.minLength(2)]],
      rangeDateFrom: ['', Validators.required],
      rangeTimeFrom: ['', Validators.required],
    });
    console.log('id ==-=-=-=- ' + this.id);
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
  onSubmit() {
    this.submitted = true;
    console.log('form value =-=-= ' + JSON.stringify(this.form.value));
    // console.log('form value periodontalScreeningTMDRequestList =-=-= ' + JSON.stringify(this.form.value.periodontalScreeningTMDRequestList));
    // console.log('form value occlusion =-=-= ' + JSON.stringify(this.form.value.occlusion));
    // console.log('form value appliances =-=-= ' + JSON.stringify(this.form.value.appliances));
    if (this.form.invalid) {
      return;
    }
    const dateFormat = this.datepipe.transform(
      this.form.value['rangeDateFrom'],
      'yyyy-MM-dd'
    );
    const regularPatientRequest: RegularPatientRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      eventTitle: this.form.value['eventTitle'],
      serviceToAvail: this.form.value['serviceToAvail'],
      rangeDateTimeFrom:
        dateFormat + 'T' + this.form.value['rangeTimeFrom'] + ':00',
      rangeDateTimeTo:
        dateFormat + 'T' + this.form.value['rangeTimeFrom'] + ':00',
    };

    this.patientAppointmentService
      .createRegularAppointment(regularPatientRequest)
      .subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
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
          console.log(error.status);
          console.log(error);
          console.log(JSON.stringify(error));
          const errorResponse: CustomHttpResponse = error['error'];
          console.log(errorResponse);
          if (errorResponse.httpStatus == 'BAD_REQUEST') {
            this.alertService.error(errorResponse.message, this.options);
          }
        },
        () => console.log('Done creating walkin appointment..')
      );
  }
}
