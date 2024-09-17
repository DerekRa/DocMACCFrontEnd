import { Appliances } from "./appliances"
import { Occlusion } from "./occlusion"
import { PeriodontalScreeningTmdrequestList } from "./periodontal-screening-tmdrequest-list"

export interface PreRequisiteModel {
    id?: number
    profileId: number
    createdBy: number
    examinationType: string
    periodontalScreeningTMDRequestList: PeriodontalScreeningTmdrequestList[]
    occlusion: Occlusion
    appliances: Appliances
}
