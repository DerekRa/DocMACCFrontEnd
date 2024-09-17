import { ContactNumber } from "./contact-number";

export interface ContactDetail {
  id?: number;
  contactNumber: ContactNumber;
  emailAddress: string;
  homeAddress: string;
}
