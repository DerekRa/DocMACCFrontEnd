export interface PrescriptionResponse {
  id: number;
  createdDate: Date;
  createdByName: string;
  createdById: string;
  updatedDate: Date;
  updatedByName: string;
  updatedById: string;
  dosage: string;
  remarks: string;
  brandName: string;
  genericName: string;
  dispense: string;
  profileId: number;
  dateOfProcedure: string;
}
