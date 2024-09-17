import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AddUpdateEventComponent } from './component/pages/home/add-update-event/add-update-event.component';
import { HomeComponent } from './component/pages/home/home/home.component';
import { AddPatientProfileComponent } from './component/pages/patients/add-patient-profile/add-patient-profile.component';
import { PatientProfileComponent } from './component/pages/patients/patient-profile/patient-profile.component';
import { PatientsProfileComponent } from './component/pages/patients/patients-profile/patients-profile.component';
import { UpdatePatientProfileComponent } from './component/pages/patients/update-patient-profile/update-patient-profile.component';
import { AuthKeyClockGuard } from './service/guard/auth.route';
import { AddUpdateMedicalQuestionsComponent } from './component/pages/medical/add-medical-questions/add-update-medical-questions.component';
import { InformedConsentsComponent } from './component/pages/medical/informed-consents/informed-consents.component';
import { AddInformedConsentComponent } from './component/pages/medical/add-informed-consent/add-informed-consent.component';
import { PhysicianComponent } from './component/pages/medical/physician/physician.component';
import { PhysiciansComponent } from './component/pages/medical/physicians/physicians.component';
import { AddUpdatePhysicianComponent } from './component/pages/medical/add-physician/add-physician.component';
import { AddAllergiesComponent } from './component/pages/medical/add-allergies/add-allergies.component';
import { MedicalQuestionsComponent } from './component/pages/medical/medical-questions/medical-questions.component';
import { IntraoralExaminationComponent } from './component/pages/dental/dentalChartIntraoral/intraoral-examination/intraoral-examination.component';
import { AddUpdateIntraoralExaminationComponent } from './component/pages/dental/dentalChartIntraoral/add-update-intraoral-examination/add-update-intraoral-examination.component';
import { TeethProcedureHistoryComponent } from './component/pages/dental/dentalChartIntraoral/teeth-procedure-history/teeth-procedure-history.component';
import { XrayTakenComponent } from './component/pages/dental/dentalChartXray/xray-taken/xray-taken.component';
import { AddUpdateXrayTakenComponent } from './component/pages/dental/dentalChartXray/add-update-xray-taken/add-update-xray-taken.component';
import { OrthodonticExaminationComponent } from './component/pages/dental/dentalChartOrthodontic/orthodontic-examination/orthodontic-examination.component';
import { BracketHistoryComponent } from './component/pages/dental/dentalChartOrthodontic/bracket-history/bracket-history.component';
import { AddUpdateOrthodonticExaminationComponent } from './component/pages/dental/dentalChartOrthodontic/add-update-orthodontic-examination/add-update-orthodontic-examination.component';
import { BracesHistoryComponent } from './component/pages/dental/dentalChartOrthodontic/braces-history/braces-history.component';
import { DentalCertificationComponent } from './component/pages/treatment/intraOralTreatment/dental-certification/dental-certification.component';
import { IntraOralTreatmentListDetailsComponent } from './component/pages/treatment/intraOralTreatment/intra-oral-treatment-list-details/intra-oral-treatment-list-details.component';
import { IntraOralTreatmentListComponent } from './component/pages/treatment/intraOralTreatment/intra-oral-treatment-list/intra-oral-treatment-list.component';
import { AddUpdateAppointmentComponent } from './component/pages/treatment/intraOralTreatment/add-update-appointment/add-update-appointment.component';
import { AppointmentHistoryComponent } from './component/pages/treatment/intraOralTreatment/appointment-history/appointment-history.component';
import { PrescriptionComponent } from './component/pages/treatment/intraOralTreatment/prescription/prescription.component';
import { AddUpdatePrescriptionComponent } from './component/pages/treatment/intraOralTreatment/add-update-prescription/add-update-prescription.component';
import { AddUpdateAutoPrescriptionComponent } from './component/pages/treatment/intraOralTreatment/add-update-auto-prescription/add-update-auto-prescription.component';
import { OrthodonticTreatmentListComponent } from './component/pages/treatment/orthodocticTreatment/orthodontic-treatment-list/orthodontic-treatment-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'home/appointment',
    title: 'Add Appointment',
    component: AddUpdateEventComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'home/appointment/:category/:id',
    title: 'Update Appointment',
    component: AddUpdateEventComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'patients-profile',
    title: 'Patients Profile',
    component: PatientsProfileComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'patient-profile/:id',
    title: 'Patient Profile',
    component: PatientProfileComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'add-patient-profile',
    title: 'Add Patient Profile',
    component: AddPatientProfileComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'update-patient-profile/:id',
    title: 'Update Patient Profile',
    component: UpdatePatientProfileComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'ADMIN'] },
  },

  {
    path: 'medical-history/patients',
    title: 'Patients List',
    component: PatientsProfileComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },

  {
    path: 'dental-records/dental-chart/intraoral-examination',
    title: 'Patients List',
    component: PatientsProfileComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/orthodontic-examination',
    title: 'Patients List',
    component: PatientsProfileComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/intraoral',
    title: 'Patients List',
    component: PatientsProfileComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/orthodontic',
    title: 'Patients List',
    component: PatientsProfileComponent,
  },
  {
    path: 'medical-history/add-patient/:id',
    title: 'Add Medical Health Check',
    component: AddUpdateMedicalQuestionsComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'medical-history/test-allergies',
    title: 'Medical Health Check',
    component: AddAllergiesComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'medical-history/patient/:id',
    title: 'Medical History',
    component: MedicalQuestionsComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'medical-history/update-patient/:id',
    title: 'Update Medical Health Check',
    component: AddUpdateMedicalQuestionsComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'medical-history/patient/preProcedure/:itemName/:id',
    title: 'Pre - Procedure List',
    component: InformedConsentsComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'medical-history/patient/preProcedure/:itemName/:id/add',
    title: 'Add Pre - Procedure',
    component: AddInformedConsentComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'medical-history/patient/physicians/:id',
    title: 'Physician List',
    component: PhysiciansComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'medical-history/patient/physicians/:id/:action/:physicianId',
    title: 'Physician',
    component: PhysicianComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'medical-history/patient/physicians/:id/:action',
    component: AddUpdatePhysicianComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/intraoral-examination/:record-action/:id',
    title: 'Add Intra-Oral Examination',
    component: IntraoralExaminationComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/intraoral-examination/add-record/:id/update-tooth-condition/:teethNumbering',
    title: 'Update Tooth Condition',
    component: AddUpdateIntraoralExaminationComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/intraoral-examination/view-record/:id/procedure/:teethNumbering/:action',
    title: 'Tooth History',
    component: TeethProcedureHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/xray-taken/:dentalChart/:labelName/:id',
    title: 'Xray Taken',
    component: XrayTakenComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/xray-taken/:dentalChart/:labelName/:id/:action',
    title: 'Xray Taken',
    component: AddUpdateXrayTakenComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/orthodontic-examination/:record-action/:id',
    title: 'View Orthodontic Examination',
    component: OrthodonticExaminationComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/orthodontic-examination/:record-action/:id/bracket-prescription-history',
    title: 'Bracket Prescription History',
    component: BracketHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/orthodontic-examination/:record-action/:id/maxillary-wire-type-history',
    title: 'Maxillary (Wire Type) History',
    component: BracketHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/orthodontic-examination/:record-action/:id/mandibular-wire-type-history',
    title: 'Mandibular (Wire Type) History',
    component: BracketHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/orthodontic-examination/:record-action/:id/add-braces/:teethNumbering',
    title: 'Add Orthodontic Examination',
    component: AddUpdateOrthodonticExaminationComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/orthodontic-examination/:record-action/:id/update-braces/:teethNumbering',
    title: 'Update Orthodontic Examination',
    component: AddUpdateOrthodonticExaminationComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/orthodontic-examination/:record-action/:id/orthodontic-history/:teethNumbering',
    title: 'Orthodontic Examination Changes History',
    component: BracesHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/orthodontic-examination/:record-action/:id/orthodontic-recent/:teethNumbering',
    title: 'Orthodontic Examination Latest Change',
    component: BracesHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/orthodontic/:id',
    title: 'IntraOral Treatment List',
    component: OrthodonticTreatmentListComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/intraoral/:id',
    title: 'IntraOral Treatment List',
    component: IntraOralTreatmentListComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/intraoral/:id/:dateofProcedure',
    title: 'IntraOral Treatment Detail List',
    component: IntraOralTreatmentListDetailsComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/intraoral/:id/:dateofProcedure/certificate',
    title: 'IntraOral Treatment Certificate',
    component: DentalCertificationComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/intraoral/:id/appointment/update',
    title: 'Update Appointment',
    component: AddUpdateAppointmentComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/intraoral/:id/appointment/history',
    title: 'Appointment History',
    component: AppointmentHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/prescription/:id/:dateofProcedure',
    title: 'Prescription',
    component: PrescriptionComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/prescription/:id/:dateofProcedure/Add',
    title: 'Add Prescription',
    component: AddUpdatePrescriptionComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/treatment-plan/prescription/:id/:dateofProcedure/Add-Auto',
    title: 'Add Prescription',
    component: AddUpdateAutoPrescriptionComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },

  { path: '**', title: '404 Not Found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
