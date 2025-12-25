import { PrescriptionSaveRequest } from './prescription-save-request';

export interface PrescriptionUpdateRequest extends PrescriptionSaveRequest {
  prescribedId: number;
}
