import { ConditionProcedureGroupings } from './condition-procedure-groupings';
import { DentalChartDesignResponse } from '../dental-chart-design-response';
import { SurfaceCheckResponse } from './surface-check-response';

export interface IntraoralExamination {
  profileId: number;
  dentalChartDesignId: number;
  dateOfProcedure: string;
  id: number;
  createdAt: string;
  createdById: string;
  createdByName: string;
  updatedAt: any;
  updatedById: any;
  dentalChartDesignResponse: DentalChartDesignResponse;
  conditionProcedureGroupings: ConditionProcedureGroupings;
  surfaceCheckResponses: SurfaceCheckResponse[];
}
