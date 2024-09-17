import { ConditionProcedureResponse } from './condition-procedure-response';
import { ConditionProcedureSurfaceRemarksResponse } from './condition-procedure-surface-remarks-response';

export interface ConditionProcedureGroupings {
    conditions: ConditionProcedureResponse[];
    restorations: ConditionProcedureResponse[];
    restorationsInlay: ConditionProcedureResponse[];
    restorationsOnlay: ConditionProcedureResponse[];
    restorationsFluoride: ConditionProcedureResponse[];
    prosthetics: ConditionProcedureResponse[];
    denture: ConditionProcedureResponse[];
    periodontal: ConditionProcedureResponse[];
    surgery: ConditionProcedureResponse[];
    conditionProcedureSurfaceRemarksResponse: ConditionProcedureSurfaceRemarksResponse;
}
