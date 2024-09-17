export interface PrescriptionSaveRequest {
  dosage: string;
  remarks: string;
  brandName: string;
  genericName: string;
  dispense: string;
  profileId: number;
  dateOfProcedure: string;
  createdByName: string;
  createdById: string;
}
