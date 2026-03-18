import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AmountChargedHistoryComponent } from './component/pages/bill/intraOralBill/amount-charged-history/amount-charged-history.component';
import { AmountPaidHistoryComponent } from './component/pages/bill/intraOralBill/amount-paid-history/amount-paid-history.component';
import { AmountProcedureComponent } from './component/pages/bill/intraOralBill/amount-procedure/amount-procedure.component';
import { IntraoralBillBreakdownComponent } from './component/pages/bill/intraOralBill/intraoral-bill-breakdown/intraoral-bill-breakdown.component';
import { PaymentProcedureComponent } from './component/pages/bill/intraOralBill/payment-procedure/payment-procedure.component';
import { AddUpdateAdditionalChargeComponent } from './component/pages/bill/orthodonticBill/add-update-additional-charge/add-update-additional-charge.component';
import { AddUpdateBillComponent } from './component/pages/bill/orthodonticBill/add-update-bill/add-update-bill.component';
import { AddUpdatePaymentComponent } from './component/pages/bill/orthodonticBill/add-update-payment/add-update-payment.component';
import { AdditionalChargeHistoryComponent } from './component/pages/bill/orthodonticBill/additional-charge-history/additional-charge-history.component';
import { BillBreakdownComponent } from './component/pages/bill/orthodonticBill/bill-breakdown/bill-breakdown.component';
import { BillChangesHistoryComponent } from './component/pages/bill/orthodonticBill/bill-changes-history/bill-changes-history.component';
import { BillHistoryComponent } from './component/pages/bill/orthodonticBill/bill-history/bill-history.component';
import { PaymentHistoryComponent } from './component/pages/bill/orthodonticBill/payment-history/payment-history.component';
import { AddUpdateIntraoralExaminationComponent } from './component/pages/dental/dentalChartIntraoral/add-update-intraoral-examination/add-update-intraoral-examination.component';
import { IntraoralExaminationComponent } from './component/pages/dental/dentalChartIntraoral/intraoral-examination/intraoral-examination.component';
import { TeethProcedureHistoryComponent } from './component/pages/dental/dentalChartIntraoral/teeth-procedure-history/teeth-procedure-history.component';
import { AddUpdateOrthodonticExaminationComponent } from './component/pages/dental/dentalChartOrthodontic/add-update-orthodontic-examination/add-update-orthodontic-examination.component';
import { BracesHistoryComponent } from './component/pages/dental/dentalChartOrthodontic/braces-history/braces-history.component';
import { BracketHistoryComponent } from './component/pages/dental/dentalChartOrthodontic/bracket-history/bracket-history.component';
import { OrthodonticExaminationComponent } from './component/pages/dental/dentalChartOrthodontic/orthodontic-examination/orthodontic-examination.component';
import { PreRequisitesComponent } from './component/pages/dental/dentalChartPreRequisite/pre-requisites/pre-requisites.component';
import { AddUpdateXrayTakenComponent } from './component/pages/dental/dentalChartXray/add-update-xray-taken/add-update-xray-taken.component';
import { XrayTakenDisplayComponent } from './component/pages/dental/dentalChartXray/xray-taken-display/xray-taken-display.component';
import { XrayTakenComponent } from './component/pages/dental/dentalChartXray/xray-taken/xray-taken.component';
import { AddUpdateEventComponent } from './component/pages/home/add-update-event/add-update-event.component';
import { HomeDialogComponent } from './component/pages/home/home-dialog/home-dialog.component';
import { HomeComponent } from './component/pages/home/home/home.component';
import { AddAllergiesComponent } from './component/pages/medical/add-allergies/add-allergies.component';
import { AddInformedConsentComponent } from './component/pages/medical/add-informed-consent/add-informed-consent.component';
import { AddUpdateMedicalQuestionsComponent } from './component/pages/medical/add-medical-questions/add-update-medical-questions.component';
import { AddUpdatePhysicianComponent } from './component/pages/medical/add-physician/add-physician.component';
import { InformedConsentsComponent } from './component/pages/medical/informed-consents/informed-consents.component';
import { MedicalClearanceComponent } from './component/pages/medical/medical-clearance/medical-clearance.component';
import { MedicalQuestionsComponent } from './component/pages/medical/medical-questions/medical-questions.component';
import { PhysicianComponent } from './component/pages/medical/physician/physician.component';
import { PhysiciansComponent } from './component/pages/medical/physicians/physicians.component';
import { AllergiesComponent } from './component/pages/medical/update-medical-questions/allergies/allergies.component';
import { UpdateMedicalQuestionsComponent } from './component/pages/medical/update-medical-questions/update-medical-questions.component';
import { AddPatientProfileComponent } from './component/pages/patients/add-patient-profile/add-patient-profile.component';
import { CameraDeviceComponent } from './component/pages/patients/camera-device/camera-device.component';
import { PatientProfileComponent } from './component/pages/patients/patient-profile/patient-profile.component';
import { PatientsProfileComponent } from './component/pages/patients/patients-profile/patients-profile.component';
import { UpdatePatientProfileComponent } from './component/pages/patients/update-patient-profile/update-patient-profile.component';
import { AddUpdateAppointmentComponent } from './component/pages/treatment/intraOralTreatment/add-update-appointment/add-update-appointment.component';
import { AddUpdateAutoPrescriptionComponent } from './component/pages/treatment/intraOralTreatment/add-update-auto-prescription/add-update-auto-prescription.component';
import { AddUpdatePrescriptionComponent } from './component/pages/treatment/intraOralTreatment/add-update-prescription/add-update-prescription.component';
import { AppointmentHistoryComponent } from './component/pages/treatment/intraOralTreatment/appointment-history/appointment-history.component';
import { AppointmentsComponent } from './component/pages/treatment/intraOralTreatment/appointments/appointments.component';
import { DentalCertificationComponent } from './component/pages/treatment/intraOralTreatment/dental-certification/dental-certification.component';
import { IntraOralTreatmentBillListComponent } from './component/pages/treatment/intraOralTreatment/intra-oral-treatment-bill-list/intra-oral-treatment-bill-list.component';
import { IntraOralTreatmentListDetailsComponent } from './component/pages/treatment/intraOralTreatment/intra-oral-treatment-list-details/intra-oral-treatment-list-details.component';
import { PrescriptionComponent } from './component/pages/treatment/intraOralTreatment/prescription/prescription.component';
import { OrthodonticTreatmentListComponent } from './component/pages/treatment/orthodocticTreatment/orthodontic-treatment-list/orthodontic-treatment-list.component';
import { AlertComponent } from './component/shared/alert/alert.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { HeaderComponent } from './component/shared/header/header.component';
// import { environment } from 'src/environments/environment.development';
// import { BrowserModule } from '@angular/platform-browser';

function initializeKeycloak(keycloak: KeycloakService) {
  // console.log('load environment host:', environment.localhost);
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:7080/',
        // url: 'http://192.168.1.2:7080/',
        realm: 'maccDentalclinicRealm',
        clientId: 'maccDentalclinicClient',
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: 'http://localhost:4200/home',
        // redirectUri: 'http://192.168.1.2:4200/home',
        checkLoginIframe: false,
      },
      loadUserProfileAtStartUp: false,
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    HomeDialogComponent,
    AddUpdateEventComponent,
    AlertComponent,
    PatientsProfileComponent,
    PatientProfileComponent,
    UpdatePatientProfileComponent,
    AddPatientProfileComponent,
    AddAllergiesComponent,
    AddInformedConsentComponent,
    AddUpdatePhysicianComponent,
    InformedConsentsComponent,
    MedicalClearanceComponent,
    MedicalQuestionsComponent,
    PhysicianComponent,
    PhysiciansComponent,
    UpdateMedicalQuestionsComponent,
    AllergiesComponent,
    AddUpdateMedicalQuestionsComponent,
    AddUpdateIntraoralExaminationComponent,
    IntraoralExaminationComponent,
    XrayTakenDisplayComponent,
    PreRequisitesComponent,
    TeethProcedureHistoryComponent,
    AddUpdateOrthodonticExaminationComponent,
    BracesHistoryComponent,
    BracketHistoryComponent,
    OrthodonticExaminationComponent,
    AddUpdateXrayTakenComponent,
    XrayTakenComponent,
    DentalCertificationComponent,
    IntraOralTreatmentBillListComponent,
    IntraOralTreatmentListDetailsComponent,
    AppointmentsComponent,
    AddUpdateAppointmentComponent,
    AppointmentHistoryComponent,
    PrescriptionComponent,
    AddUpdatePrescriptionComponent,
    AddUpdateAutoPrescriptionComponent,
    OrthodonticTreatmentListComponent,
    IntraoralBillBreakdownComponent,
    AmountProcedureComponent,
    PaymentProcedureComponent,
    AmountChargedHistoryComponent,
    AmountPaidHistoryComponent,
    AddUpdateBillComponent,
    BillBreakdownComponent,
    AddUpdatePaymentComponent,
    AddUpdateAdditionalChargeComponent,
    PaymentHistoryComponent,
    AdditionalChargeHistoryComponent,
    BillHistoryComponent,
    BillChangesHistoryComponent,
    CameraDeviceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatDatepickerModule,
    MatDialogModule,
    NgxMaterialTimepickerModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxDropzoneModule,
    MatIconModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    // NavbarNavComponent,
    // NavbarComponent,
    // NavbarBrandDirective,
    // NavbarTextComponent,
    // NavbarTogglerDirective,
    // NavbarModule,
    // NavModule,
    // GridModule,
  ],
  providers: [
    // KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    // {
    //   provide: APP_CONFIG,
    //   // useValue: environment,
    //   // useExisting: ConfigurationsService,
    // },
    provideAnimations(),
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
