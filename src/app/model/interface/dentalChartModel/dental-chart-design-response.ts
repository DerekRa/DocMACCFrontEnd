import { ToothBackgroundValue } from "./intraoralExaminationModel/tooth-background-value";
import { ToothSurfaceValue } from "./intraoralExaminationModel/tooth-surface-value";

export interface DentalChartDesignResponse {
    kindsOfTeeth: string;
    teethPositionStatus: string;
    teethNumbering: number;
    teethImage: string;
    teethImageLink: string;
    teethArea: string;
    toothSurfaceValue: ToothSurfaceValue;
    toothBackgroundValue: ToothBackgroundValue;
}
