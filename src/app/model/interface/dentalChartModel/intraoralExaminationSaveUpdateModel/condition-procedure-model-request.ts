import { ConditionProcedureRemarksRequest } from './condition-procedure-remarks-request';
import { ConditionProcedureRequest } from './condition-procedure-request';
import { SurfaceCheckRequest } from './surface-check-request';

export interface ConditionProcedureModelRequest {
  profileId: number;
  dentalChartDesignId: number;
  dateOfProcedure: string;
  createdByName: string;
  createdById: string;
  conditionProcedureRequests: ConditionProcedureRequest[];
  conditionProcedureRemarksRequests: ConditionProcedureRemarksRequest[];
  surfaceCheckRequests: SurfaceCheckRequest[];
}
