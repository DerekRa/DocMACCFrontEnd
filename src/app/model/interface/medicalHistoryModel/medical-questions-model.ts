import { MedicalStatus } from './medical-status';
import { Question } from './question';

export interface MedicalQuestionsModel {
    medicalModel: MedicalStatus;
    questions: Question;
}
