export interface XrayTakenPermanentDataRequest {
    xrayTakenId?: Number;
    profileId: Number;
    updatedBy?: Number;
    location: string;
    examinationType: string;
    labelName: string;
    remarks?: string;
}
