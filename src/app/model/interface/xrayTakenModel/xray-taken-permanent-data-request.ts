export interface XrayTakenPermanentDataRequest {
  xrayTakenId?: Number;
  profileId: Number;
  updatedByName?: string;
  updatedById?: string;
  location: string;
  examinationType: string;
  labelName: string;
  remarks?: string;
}
