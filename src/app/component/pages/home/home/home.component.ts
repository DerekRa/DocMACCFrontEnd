import {
  Component,
  ModuleWithProviders,
  OnInit,
  Provider,
} from '@angular/core';
import { CalendarOptions, EventHoveringArg } from '@fullcalendar/core';
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline'; // for prime account
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { createPopperLite as createPopper } from '@popperjs/core';
import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarModuleConfig,
  CalendarUtils,
} from 'angular-calendar';
import { PatientAppointmentResponse } from 'src/app/model/interface/appointmentModel/patient-appointment-response';
import { PatientAppointmentService } from 'src/app/service/home/patient-appointment.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { HomeDialogComponent } from '../home-dialog/home-dialog.component';
import { EventTitleResponse } from 'src/app/model/interface/appointmentModel/event-title-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { KeycloakService } from 'keycloak-angular';
// import { KeycloakService } from 'src/app/service/keycloak.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.onGetAppointmentData();
    setTimeout(() => {
      console.log('here...');
      console.log(this.appointments);
      console.log('........');
      this.loadCalendarOptions();
    }, 2000);
  }
  constructor(
    public dialog: MatDialog,
    private profileModelService: ProfileModelService,
    private patientAppointmentService: PatientAppointmentService,
    private route: ActivatedRoute, // private readonly store: Storage
    private router: Router,
    public alertService: AlertService,
    private keycloakService: KeycloakService
  ) {}

  viewDate: Date = new Date();
  appointments: any[] = [];
  eventData: PatientAppointmentResponse | undefined;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth', //timeGridWeek,timeGridDay,
    },
    plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
    //dayMaxEventRows: true,
    views: {
      timeGrid: {
        //dayMaxEventRows: 6 // adjust to 6 only for timeGridWeek/timeGridDay
      },
      dayGridMonth: {
        // name of view
        // titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
        // other view-specific options here
      },
      listMonth: {
        // titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
      },
    },
    eventSources: this.appointments,
  };

  handleEventClick(arg: any) {
    this.onGetSingleAppointmentData(arg);
  }
  handleMouseEnter(mouseEnterInfo: EventHoveringArg): void {
    const reference = document.getElementById('#reference');
    const popper = document.getElementById('#tooltip');
    var newParagraph = document.createElement('popper-content');
    console.log(popper);
    //     // Add text to the new paragraph
    newParagraph.textContent =
      'This is a dynamic paragraph created using JavaScript.';
    if (popper != null) {
      console.log(mouseEnterInfo.event.extendedProps['firstName']);
      createPopper(mouseEnterInfo.el, popper, {
        placement: 'left',
      });
    }
  }

  onGetAppointmentData() {
    this.patientAppointmentService.getAllPatientAppointment().subscribe(
      (response: any) => {
        console.log('response');
        console.log(response.body);
        this.appointments = response.body;
      },
      (error: any) => console.log(error),
      () => console.log('Done getting all appointments..')
    );
  }
  onGetSingleAppointmentData(arg: any) {
    this.patientAppointmentService
      .getSingleAppointment(arg.event.id, arg.event.extendedProps.category)
      .subscribe(
        (response: PatientAppointmentResponse) => {
          console.log('response');
          console.log(response);
          this.eventData = response;
          const dialogRef = this.dialog.open(HomeDialogComponent, {
            data: {
              firstName: this.eventData.firstName,
              lastName: this.eventData.lastName,
              cellNumber: this.eventData.cellNumber,
              title: this.eventData.title,
              serviceToAvail: this.eventData.serviceToAvail,
              start: this.eventData.start,
              // end: this.eventData.end
            },
          });

          dialogRef.afterClosed().subscribe((result) => {
            console.log('result');
            console.log(result);
            console.log('The dialog was closed');
            if (result == 'edit') {
              this.router.navigate([
                `home/appointment/${arg.event.extendedProps.category}/${this.eventData?.id}`,
              ]);
            }
          });
        },
        (error: any) => console.log(error),
        () => console.log('Done getting all appointments..')
      );
  }
  deletePatientAppointment() {
    const appointmentId = this.eventData?.id ? this.eventData?.id : '0';
    this.patientAppointmentService.removeAppointment(appointmentId).subscribe(
      (response: CustomHttpResponse) => {
        if (response.httpStatus == 'OK') {
          this.options.autoClose = false;
          this.alertService.success(response.message, this.options);
          this.onGetAppointmentData();
          setTimeout(() => {
            this.loadCalendarOptions();
          }, 1500);
        }
      },
      (error: any) => console.log(error),
      () => console.log('Done getting all appointments..')
    );
  }
  loadCalendarOptions() {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listMonth', //timeGridWeek,timeGridDay,
      },
      footerToolbar: {
        left: 'addNewEvent',
        center: '',
        right: '',
      },
      customButtons: {
        addNewEvent: {
          text: 'add event (for first time patient only)',
          click: function (arg, el) {
            console.log(arg.view);
            console.log(arg.view?.location);
            console.log(el);
            window.location.href = arg.view?.location.href + '/appointment';
            //home/appointment
            // this.router.navigate([`home/appointment`]);
            // alert('clicked the custom button!');
          },
        },
      },
      initialDate: new Date(),
      progressiveEventRendering: true,
      moreLinkClick: function (arg) {
        console.info(arg);
      },
      events: this.appointments,
      plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
      navLinks: true,
      dayMaxEvents: true,
      businessHours: true, // display business hours
      selectable: true,
      eventClick: (arg) => this.handleEventClick(arg),
    };
  }

  logout() {
    console.log('logout was click!....');
    this.keycloakService.logout();
  }
}
