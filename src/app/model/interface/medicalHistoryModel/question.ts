import { Allergies } from './allergies';
import { MedicalConditions } from './medical-conditions';

export interface Question {
    id?: number;
    goodHealth: string;
    medicalTreatment: string;
    conditionTreated: string;
    surgicalOperation: string;
    whatOperation: string;
    hospitalized: string;
    whenWhyHospitalized: string;
    prescriptionMedication: string;
    specificPrescriptionMedication: string;
    tobacco: string;
    alcoholCocaineOtherDrugs: string;
    allergies: Allergies[];
    otherAllergies: string;
    bleedingTime: string;
    womanOnlyPregnant: string;
    womanOnlyNursing: string;
    womanOnlyBirthControlPills: string;
    bloodType: string;
    bloodPressure: string;
    haveYouHadAnyOfTheFollowing: MedicalConditions[];
    otherHaveYouHadAnyOfTheFollowing: string;
}
