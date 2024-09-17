import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-update-patient-profile',
  templateUrl: './update-patient-profile.component.html',
  styleUrls: ['./update-patient-profile.component.scss'],
})
export class UpdatePatientProfileComponent implements OnInit {
  public date: Date = new Date();
  public profileModel: ProfileModel | undefined;
  public id: any | undefined;
  public picture: string = 'assets/images/img2x2.png';
  public form: FormGroup = new FormGroup({
    id: new FormControl(''),
    imgLink: new FormControl(''),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    nickName: new FormControl(''),
    religion: new FormControl(''),
    nationality: new FormControl(''),
    occupation: new FormControl(''),
    homeAddress: new FormControl(''),
    homeNumber: new FormControl(''),
    officeNumber: new FormControl(''),
    cellNumber: new FormControl(''),
    faxNumber: new FormControl(''),
    emailAddress: new FormControl(''),
    dentalInsurance: new FormControl(''),
    firstDentalVisit: new FormControl(''),
    parentsGuardian: new FormControl(''),
    parentsGuardianOccupation: new FormControl(''),
    referralName: new FormControl(''),
    reasonDentalConsultation: new FormControl(''),
  });
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  public submitted: boolean = false;
  constructor(
    private profileModelService: ProfileModelService,
    public alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel(this.id);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const profileModelUpdate: ProfileModel = {
      id: this.form.value['id'],
      imgLink: this.form.value['imgLink'],
      name: {
        id: this.form.value['id'],
        firstName: this.form.value['firstName'],
        lastName: this.form.value['lastName'],
        middleName: this.form.value['middleName'],
        nickName: this.form.value['nickName'],
      },
      sex: this.profileModel?.sex + '',
      birthday: this.profileModel?.birthday + '',
      religion: this.form.value['religion'],
      nationality: this.form.value['nationality'],
      occupation: this.form.value['occupation'],
      dentalInsurance: this.form.value['dentalInsurance'],
      firstDentalVisit: this.form.value['firstDentalVisit'],
      minor: {
        id: this.form.value['id'],
        parentsGuardian: this.form.value['parentsGuardian'],
        parentsGuardianOccupation: this.form.value['parentsGuardianOccupation'],
        referralName: this.form.value['referralName'],
        reasonDentalConsultation: this.form.value['reasonDentalConsultation'],
      },
      contactDetail: {
        id: this.form.value['id'],
        contactNumber: {
          id: this.form.value['id'],
          homeNumber: this.form.value['homeNumber'],
          officeNumber: this.form.value['officeNumber'],
          cellNumber: this.form.value['cellNumber'],
          faxNumber: this.form.value['faxNumber'],
        },
        emailAddress: this.form.value['emailAddress'],
        homeAddress: this.form.value['homeAddress'],
      },
      updatedBy: 'Kenz',
    };
    this.profileModelService.updateProfileModel(profileModelUpdate).subscribe(
      (response: CustomHttpResponse) => {
        console.log(response);
        if (response.httpStatus == 'OK') {
          this.alertService.success(response.message, this.options);
        }
      },
      (error: any) => {
        console.log(error);
        const errorResponse: CustomHttpResponse = error['error'];
        if (errorResponse.httpStatus == 'BAD_REQUEST') {
          this.alertService.error(errorResponse.message, this.options);
        }
      },
      () => console.log('Done updating single profile..')
    );
  }

  public onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        const formData = new FormData();

        formData.append('file', file);

        this.profileModelService.uploadPicture(formData).subscribe(
          (response: CustomHttpResponse) => {
            if (response.httpStatus == 'OK') {
              const messageSplit = response.message.split(':');
              this.form.patchValue({
                // imgLink: reader.result as string
                imgLink:
                  this.profileModelService.getImageURL() + messageSplit[1],
              });
              this.picture = reader.result as string;
              this.alertService.success(messageSplit[0], this.options);
            }
          },
          (error: any) => {
            const errorResponse: CustomHttpResponse = error['error'];
            console.log(error);
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
          () => console.log('Done uploading profile picture..')
        );
      };
    }
  }

  public onGetProfileModel(id: number): void {
    this.profileModelService.getProfileModel(id).subscribe(
      (response) => {
        this.profileModel = response;
        this.picture = this.profileModel?.imgLink;
        this.form = this.formBuilder.group({
          id: [this.profileModel?.id],
          imgLink: [this.profileModel?.imgLink],
          lastName: [
            this.profileModel?.name?.lastName,
            [Validators.required, Validators.minLength(2)],
          ],
          middleName: [
            this.profileModel?.name?.middleName,
            [Validators.required, Validators.minLength(2)],
          ],
          firstName: [
            this.profileModel?.name?.firstName,
            [Validators.required, Validators.minLength(2)],
          ],
          nickName: [
            this.profileModel?.name?.nickName,
            [Validators.minLength(2)],
          ],
          religion: [
            this.profileModel?.religion,
            [Validators.required, Validators.minLength(2)],
          ],
          nationality: [
            this.profileModel?.nationality,
            [Validators.minLength(2)],
          ],
          occupation: [
            this.profileModel?.occupation,
            [Validators.minLength(2)],
          ],
          homeAddress: [
            this.profileModel?.contactDetail?.homeAddress,
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255),
            ],
          ],
          homeNumber: [
            this.profileModel?.contactDetail?.contactNumber?.homeNumber,
            [Validators.minLength(2)],
          ],
          officeNumber: [
            this.profileModel?.contactDetail?.contactNumber?.officeNumber,
            [Validators.minLength(2)],
          ],
          cellNumber: [
            this.profileModel?.contactDetail?.contactNumber?.cellNumber,
            [Validators.required, Validators.minLength(2)],
          ],
          faxNumber: [
            this.profileModel?.contactDetail?.contactNumber?.faxNumber,
            [Validators.minLength(2)],
          ],
          emailAddress: [
            this.profileModel?.contactDetail?.emailAddress,
            [Validators.email],
          ],
          dentalInsurance: [
            this.profileModel?.dentalInsurance,
            [Validators.minLength(2)],
          ],
          firstDentalVisit: [
            this.profileModel?.firstDentalVisit,
            [Validators.required],
          ],
          parentsGuardian: [
            this.profileModel?.minor?.parentsGuardian,
            [Validators.minLength(2), Validators.maxLength(255)],
          ],
          parentsGuardianOccupation: [
            this.profileModel?.minor?.parentsGuardianOccupation,
            [Validators.minLength(2), Validators.maxLength(255)],
          ],
          referralName: [
            this.profileModel?.minor?.referralName,
            [Validators.minLength(2), Validators.maxLength(255)],
          ],
          reasonDentalConsultation: [
            this.profileModel?.minor?.reasonDentalConsultation,
            [Validators.minLength(2), Validators.maxLength(255)],
          ],
        });
      },
      (error: CustomHttpResponse) => {
        console.log(error);
      },
      () => console.log('Done getting single profile..')
    );
  }
}
