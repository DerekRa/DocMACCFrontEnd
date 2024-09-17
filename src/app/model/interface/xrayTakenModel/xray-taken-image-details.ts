import { XrayTakenImageList } from "./xray-taken-image-list";

export interface XrayTakenImageDetails {
    xrayTakenId?: Number;
    imageList: XrayTakenImageList[];
    examinationType: string;
    labelName: string;
    remarks: string;
    display: boolean;
    createdDate: Date;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    updatedBy: number;
}
