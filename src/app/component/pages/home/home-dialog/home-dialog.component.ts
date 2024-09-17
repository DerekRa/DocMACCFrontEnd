import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientAppointmentResponse } from 'src/app/model/interface/appointmentModel/patient-appointment-response';
import { PatientAppointmentService } from 'src/app/service/home/patient-appointment.service';

@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.component.html',
  styleUrls: ['./home-dialog.component.scss'],
})
export class HomeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientAppointmentService: PatientAppointmentService
  ) {}
  onNoClick(): void {
    console.log('click on close..');
    this.dialogRef.close();
  }
}
