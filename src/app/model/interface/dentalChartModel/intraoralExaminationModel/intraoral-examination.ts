import { ConditionProcedureGroupings } from './condition-procedure-groupings';
import { DentalChartDesignResponse } from '../dental-chart-design-response';
import { SurfaceCheckResponse } from './surface-check-response';

export interface IntraoralExamination {
    profileId: number;
    dentalChartDesignId: number;
    dateOfProcedure: string;
    id: number;
    createdAt: string;
    createdBy: number;
    updatedAt: any;
    updatedBy: any;
    dentalChartDesignResponse: DentalChartDesignResponse;
    conditionProcedureGroupings: ConditionProcedureGroupings;
    surfaceCheckResponses: SurfaceCheckResponse[];
}
