import { InformedConsent } from './informed-consent';
import { MedicalClearance } from './medical-clearance';
import { MedicalStatus } from './medical-status';
import { Physician } from './physician';
import { Question } from './question';

export interface MedicalModel {
    medicalModel: MedicalStatus;
    physician: Physician[];
    questions: Question;
    informedConsents: InformedConsent[];
    medicalClearances: MedicalClearance[];
}
