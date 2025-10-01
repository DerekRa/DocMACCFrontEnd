export interface PatientAppointmentResponse {
  id: string;
  profileId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  cellNumber: string;
  title: string;
  serviceToAvail: string;
  start: string;
  end: string;
  createdDate: Date;
}
