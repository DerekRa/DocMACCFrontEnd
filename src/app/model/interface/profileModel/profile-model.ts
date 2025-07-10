import { ContactDetail } from './contact-detail';
import { Minor } from './minor';
import { Name } from './name';

export interface ProfileModel {
  id?: number;
  imgLink: string;
  name: Name;
  sex: string;
  age?: string;
  birthday: string;
  religion: string;
  nationality: string;
  occupation: string;
  contactDetail: ContactDetail;
  dentalInsurance: string;
  firstDentalVisit: string;
  minor?: Minor;
  createdByName?: string;
  createdById?: string;
  createdDateTime?: string;
  updatedByName?: string;
  updatedById?: string;
  updatedDateTime?: string;
  status?: string;
}
