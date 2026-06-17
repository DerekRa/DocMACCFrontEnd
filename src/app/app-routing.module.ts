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
import { IntraOralTreatmentBillListComponent } from './component/pages/treatment/intraOralTreatment/intra-oral-treatment-bill-list/intra-oral-treatment-bill-list.component';
import { AddUpdateAppointmentComponent } from './component/pages/treatment/intraOralTreatment/add-update-appointment/add-update-appointment.component';
import { AppointmentHistoryComponent } from './component/pages/treatment/intraOralTreatment/appointment-history/appointment-history.component';
import { PrescriptionComponent } from './component/pages/treatment/intraOralTreatment/prescription/prescription.component';
import { AddUpdatePrescriptionComponent } from './component/pages/treatment/intraOralTreatment/add-update-prescription/add-update-prescription.component';
import { AddUpdateAutoPrescriptionComponent } from './component/pages/treatment/intraOralTreatment/add-update-auto-prescription/add-update-auto-prescription.component';
import { OrthodonticTreatmentListComponent } from './component/pages/treatment/orthodocticTreatment/orthodontic-treatment-list/orthodontic-treatment-list.component';
import { IntraoralBillBreakdownComponent } from './component/pages/bill/intraOralBill/intraoral-bill-breakdown/intraoral-bill-breakdown.component';
import { AmountProcedureComponent } from './component/pages/bill/intraOralBill/amount-procedure/amount-procedure.component';
import { PaymentProcedureComponent } from './component/pages/bill/intraOralBill/payment-procedure/payment-procedure.component';
import { AmountChargedHistoryComponent } from './component/pages/bill/intraOralBill/amount-charged-history/amount-charged-history.component';
import { AmountPaidHistoryComponent } from './component/pages/bill/intraOralBill/amount-paid-history/amount-paid-history.component';
import { BillHistoryComponent } from './component/pages/bill/orthodonticBill/bill-history/bill-history.component';
import { AddUpdateBillComponent } from './component/pages/bill/orthodonticBill/add-update-bill/add-update-bill.component';
import { BillBreakdownComponent } from './component/pages/bill/orthodonticBill/bill-breakdown/bill-breakdown.component';
import { BillChangesHistoryComponent } from './component/pages/bill/orthodonticBill/bill-changes-history/bill-changes-history.component';
import { AddUpdateAdditionalChargeComponent } from './component/pages/bill/orthodonticBill/add-update-additional-charge/add-update-additional-charge.component';
import { AddUpdatePaymentComponent } from './component/pages/bill/orthodonticBill/add-update-payment/add-update-payment.component';
import { PaymentHistoryComponent } from './component/pages/bill/orthodonticBill/payment-history/payment-history.component';
import { AdditionalChargeHistoryComponent } from './component/pages/bill/orthodonticBill/additional-charge-history/additional-charge-history.component';

const routes: Routes = [
  //Home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  // Appointment
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
  // Patient Profile
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
  // Patient List
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
    path: 'bill-records/intraoral/patients',
    title: 'Patients List',
    component: PatientsProfileComponent,
  },
  {
    path: 'bill-records/orthodontic/patients',
    title: 'Patients List',
    component: PatientsProfileComponent,
  },
  // Patient List Ends Here
  // Medical History
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
  // Dental Records
  // IntraOral Examination
  {
    path: 'dental-records/dental-chart/intraoral-examination/:record-action/:id',
    title: 'Add Intra-Oral Examination',
    component: IntraoralExaminationComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/intraoral-examination/:record-action/:id/update-tooth-condition/:teethNumbering',
    title: 'Update Tooth Condition',
    component: AddUpdateIntraoralExaminationComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  {
    path: 'dental-records/dental-chart/intraoral-examination/view-record/:id/:history/:teethNumbering/:action',
    title: 'Tooth History',
    component: TeethProcedureHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  // Xray Taken
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
  // Orthodontic Examination
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
  // Treatment Plan
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
    component: IntraOralTreatmentBillListComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill
  // Intraoral
  {
    path: 'bill-records/intraoral/patients/:id',
    title: 'IntraOral Bill List',
    component: IntraOralTreatmentBillListComponent,
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
  //Bill
  {
    path: 'bill-records/intraoral/patients/:id/:dateofProcedure',
    title: 'IntraOral Bill Breakdown',
    component: IntraoralBillBreakdownComponent,
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
  //Treatment Prescription
  {
    path: 'dental-records/treatment-plan/prescription/:id/:dateofProcedure',
    title: 'Prescription',
    component: PrescriptionComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Treatment Prescription
  {
    path: 'dental-records/treatment-plan/prescription/:id/:dateofProcedure/Add',
    title: 'Add Prescription',
    component: AddUpdatePrescriptionComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Treatment Prescription
  {
    path: 'dental-records/treatment-plan/prescription/:id/:dateofProcedure/Add-Auto',
    title: 'Add Prescription',
    component: AddUpdateAutoPrescriptionComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Intraoral
  {
    path: 'bill-records/intraoral/patients/:id/:dateofProcedure/amount-procedure/:procedureNumber',
    title: 'IntraOral Bill Amount Procedure',
    component: AmountProcedureComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Intraoral
  {
    path: 'bill-records/intraoral/patients/:id/:dateofProcedure/payment-procedure/:procedureNumber',
    title: 'IntraOral Bill Payment',
    component: PaymentProcedureComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Intraoral
  {
    path: 'bill-records/intraoral/patients/:id/:dateofProcedure/amount-charged-history/:procedureNumber',
    title: 'IntraOral Bill Amount Charged History',
    component: AmountChargedHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Intraoral
  {
    path: 'bill-records/intraoral/patients/:id/:dateofProcedure/amount-paid-history/:procedureNumber',
    title: 'IntraOral Bill Payment History',
    component: AmountPaidHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - vew list of bills of a patient
  {
    path: 'bill-records/orthodontic/patients/:id',
    title: 'Orthodontic Bills',
    component: BillHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - add bill
  {
    path: 'bill-records/orthodontic/patients/:id/add-record',
    title: 'Add Orthodontic Bill',
    component: AddUpdateBillComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - add bill
  {
    path: 'bill-records/orthodontic/patients/:id/add-from-view-record',
    title: 'Add Orthodontic Bill',
    component: AddUpdateBillComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - vew list of breakdown of a bill
  {
    path: 'bill-records/orthodontic/patients/:id/:billId/:dateOfBill',
    title: 'Orthodontic Bill Breakdown',
    component: BillBreakdownComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - update bill
  {
    path: 'bill-records/orthodontic/patients/:id/:billId/:dateOfBill/update-bill',
    title: 'Update Orthodontic Bill',
    component: AddUpdateBillComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - view list of bill changes
  {
    path: 'bill-records/orthodontic/patients/:id/:billId/:dateOfBill/history',
    title: 'Orthodontic Bill Changes',
    component: BillChangesHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - add additional charge
  {
    path: 'bill-records/orthodontic/patients/:id/:billId/:dateOfBill/add-charge',
    title: 'Orthodontic Bill Add Charge',
    component: AddUpdateAdditionalChargeComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - add payment
  {
    path: 'bill-records/orthodontic/patients/:id/:billId/:dateOfBill/payment',
    title: 'Orthodontic Bill Payment',
    component: AddUpdatePaymentComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - update payment
  {
    path: 'bill-records/orthodontic/patients/:id/:billId/:dateOfBill/update-payment/:transactionId',
    title: 'Orthodontic Bill Update Payment',
    component: AddUpdatePaymentComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - update additional charge
  {
    path: 'bill-records/orthodontic/patients/:id/:billId/:dateOfBill/update-additional-charge/:transactionId',
    title: 'Orthodontic Bill Update Additional Charge',
    component: AddUpdateAdditionalChargeComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - view payment changes history
  {
    path: 'bill-records/orthodontic/patients/:id/:billId/:dateOfBill/payment-changes-history/:transactionId',
    title: 'Orthodontic Bill Payment History',
    component: PaymentHistoryComponent,
    // canActivate: [AuthKeyClockGuard],
    // data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //Bill - Orthodontic - view additional charge changes history
  {
    path: 'bill-records/orthodontic/patients/:id/:billId/:dateOfBill/additional-charge-changes-history/:transactionId',
    title: 'Orthodontic Bill Additional Charge History',
    component: AdditionalChargeHistoryComponent,
    canActivate: [AuthKeyClockGuard],
    data: { roles: ['USER', 'SECRETARY', 'ADMIN'] },
  },
  //ALL
  { path: '**', title: '404 Not Found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
