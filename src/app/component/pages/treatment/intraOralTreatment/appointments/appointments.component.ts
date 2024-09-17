import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientAppointmentResponse } from 'src/app/model/interface/appointmentModel/patient-appointment-response';
import { RegularAppointmentLatestResponse } from 'src/app/model/interface/appointmentModel/regular-appointment-latest-response';
import { RegularAppointmentRequest } from 'src/app/model/interface/appointmentModel/regular-appointment-request';
import { PatientAppointmentService } from 'src/app/service/home/patient-appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  constructor(
    private patientAppointmentService: PatientAppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAppointment();
  }

  public id: any;
  eventData: RegularAppointmentLatestResponse | undefined;

  private getAppointment() {
    console.log('id :' + this.id);

    const regularAppointmentRequest: RegularAppointmentRequest = {
      profileId: this.id,
      category: 'registered',
    };

    this.patientAppointmentService
      .getRegularAppointment(regularAppointmentRequest)
      .subscribe(
        (response: RegularAppointmentLatestResponse) => {
          console.log('response');
          console.log(response);
          this.eventData = response;
          console.log('------');
        },
        (error: any) => console.log(error),
        () => console.log('Done getting appointment..')
      );
  }

  onUpdateAppointment() {
    console.log('this.id = ' + this.id);
    this.router.navigate([
      'dental-records/treatment-plan/intraoral/' +
        this.id +
        '/appointment/update',
    ]);
  }
  onViewAppointments() {
    console.log('this.id = ' + this.id);
    this.router.navigate([
      'dental-records/treatment-plan/intraoral/' +
        this.id +
        '/appointment/history',
    ]);
  }
}
