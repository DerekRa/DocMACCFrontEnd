import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { cilClock, cilCalendar } from '@coreui/icons';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { User } from 'src/app/model/class/authenticate/user.model';
import { PatientAppointmentResponse } from 'src/app/model/interface/appointmentModel/patient-appointment-response';
import { WalkInPatientRequest } from 'src/app/model/interface/appointmentModel/walk-in-patient-request';
import { WalkInPatientUpdateRequest } from 'src/app/model/interface/appointmentModel/walk-in-patient-update-request';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { PatientAppointmentService } from 'src/app/service/home/patient-appointment.service';
// import { PatientAppointmentService } from 'src/app/service/patient-appointment.service';

@Component({
  selector: 'app-add-update-event',
  templateUrl: './add-update-event.component.html',
  styleUrls: ['./add-update-event.component.scss'],
})
export class AddUpdateEventComponent implements OnInit {
  constructor(
    private readonly keycloak: KeycloakService,
    private patientAppointmentService: PatientAppointmentService,
    public alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.category = this.route.snapshot.params['category'];
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    if (this.eventData == undefined) {
      this.form = this.formBuilder.group({
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        middleName: ['', []],
        cellNumber: ['', [Validators.required, Validators.minLength(2)]],
        eventTitle: ['', [Validators.required, Validators.minLength(2)]],
        serviceToAvail: ['', [Validators.required, Validators.minLength(2)]],
        rangeDateFrom: ['', Validators.required],
        rangeTimeFrom: ['', Validators.required],
      });
    }
    if (this.id == undefined || this.category == undefined) {
      this.newDataToInsert = true;
    } else {
      this.onGetSingleAppointmentData();
    }
    console.log('this.newDataToInsert', this.newDataToInsert);
  }

  public id: any;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public category: any;
  public currentDate = new Date();
  public submitted = false;
  public newDataToInsert = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    cellNumber: new FormControl(''),
    eventTitle: new FormControl(''),
    serviceToAvail: new FormControl(''),
    rangeDateFrom: new FormControl(''),
    rangeTimeFrom: new FormControl(''),
  });
  eventData: PatientAppointmentResponse | undefined;

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onGetSingleAppointmentData() {
    this.patientAppointmentService
      .getSingleAppointment(this.id, this.category)
      .subscribe((response: PatientAppointmentResponse) => {
        // title: string;
        // serviceToAvail: string;
        // start: string;
        console.log('response', response);
        this.eventData = response;
        const format = 'HH:mm';
        this.form = this.formBuilder.group({
          lastName: [
            this.eventData?.lastName,
            [Validators.required, Validators.minLength(2)],
          ],
          firstName: [
            this.eventData?.firstName,
            [Validators.required, Validators.minLength(2)],
          ],
          middleName: [this.eventData?.middleName],
          cellNumber: [
            this.eventData?.cellNumber,
            [Validators.required, Validators.minLength(2)],
          ],
          eventTitle: [
            this.eventData?.title,
            [Validators.required, Validators.minLength(2)],
          ],
          serviceToAvail: [
            this.eventData?.serviceToAvail,
            [Validators.required, Validators.minLength(2)],
          ],
          rangeDateFrom: [this.eventData?.start, [Validators.required]],
          rangeTimeFrom: [
            new DatePipe('en-us').transform(this.eventData?.start, format),
            [Validators.required],
          ],
        });
      });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    // const format = 'HH:mm';
    if (this.newDataToInsert) {
      const dateFormat = this.datepipe.transform(
        this.form.value['rangeDateFrom'],
        'yyyy-MM-dd',
      );
      const walkin: WalkInPatientRequest = {
        createdByName: this.userProfile?.firstName || '', // to update soon on user management
        createdById: this.userProfile?.id || '', // to update soon on user management
        firstName: this.form.value['firstName'],
        lastName: this.form.value['lastName'],
        middleName: this.form.value['middleName'],
        cellNumber: this.form.value['cellNumber'],
        eventTitle: this.form.value['eventTitle'],
        serviceToAvail: this.form.value['serviceToAvail'],
        rangeDateTimeFrom:
          dateFormat + 'T' + this.form.value['rangeTimeFrom'] + ':00',
        rangeDateTimeTo:
          dateFormat + 'T' + this.form.value['rangeTimeFrom'] + ':00',
      };
      this.patientAppointmentService.createWalkInAppointment(walkin).subscribe(
        (response: CustomHttpResponse) => {
          if (response.httpStatus == 'CREATED') {
            const messageSplit = response.message.split(':');
            const strLink =
              '<a href="/home/appointment/walk-in/' +
              messageSplit[1] +
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
    } else {
      const dateFormat = this.datepipe.transform(
        this.form.value['rangeDateFrom'],
        'yyyy-MM-dd',
      );
      const appointmentId = this.eventData?.id ? this.eventData?.id : '0';
      const walkInPatientUpdateRequest: WalkInPatientUpdateRequest = {
        appointmentId: appointmentId,
        createdByName: this.userProfile?.firstName || '', // to be updated soon on user management
        createdById: this.userProfile?.id || '', // to be updated soon on user management
        firstName: this.form.value['firstName'],
        middleName: this.form.value['middleName'],
        lastName: this.form.value['lastName'],
        cellNumber: this.form.value['cellNumber'],
        eventTitle: this.form.value['eventTitle'],
        serviceToAvail: this.form.value['serviceToAvail'],
        rangeDateTimeFrom:
          dateFormat + 'T' + this.form.value['rangeTimeFrom'] + ':00',
        rangeDateTimeTo:
          dateFormat + 'T' + this.form.value['rangeTimeFrom'] + ':00',
      };
      this.patientAppointmentService
        .updateWalkInAppointment(walkInPatientUpdateRequest)
        .subscribe(
          (response: CustomHttpResponse) => {
            if (response.httpStatus == 'OK') {
              const messageSplit = response.message.split(':');

              const strLink =
                '<a href="/home/appointment/' +
                this.category +
                '/' +
                messageSplit[1] +
                '"> Click here to view..</a>';
              this.options.autoClose = false;
              this.alertService.success(
                messageSplit[0] + strLink,
                this.options,
              );
            }
          },
          (error: any) => {
            const errorResponse: CustomHttpResponse = error['error'];
            if (error.status == 0) {
              this.alertService.error('Unauthorized access', this.options);
            }
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
        );
    }
  }
}
