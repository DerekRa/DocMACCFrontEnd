import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-add-patient-profile',
  templateUrl: './add-patient-profile.component.html',
  styleUrls: ['./add-patient-profile.component.scss'],
})
export class AddPatientProfileComponent implements OnInit {
  public date: Date = new Date();
  public profileModel: ProfileModel | undefined;
  public id: any | undefined;
  public picture: string = 'assets/images/img2x2.png';
  // public form: FormGroup | undefined;
  public form: FormGroup = new FormGroup({
    id: new FormControl(''),
    imgLink: new FormControl(''),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    nickName: new FormControl(''),
    birthday: new FormControl(''),
    age: new FormControl({ value: '', disabled: true }),
    gender: new FormControl(''),
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
  public submitted = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

  constructor(
    private profileModelService: ProfileModelService,
    public alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    if (this.profileModel == undefined) {
      this.form = this.formBuilder.group({
        id: [''],
        imgLink: this.picture,
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        middleName: ['', [Validators.required, Validators.minLength(2)]],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        nickName: ['', [Validators.minLength(2)]],
        birthday: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        age: [{ value: '', disabled: true }, [Validators.required]],
        religion: ['', [Validators.required, Validators.minLength(2)]],
        nationality: ['', [Validators.minLength(2)]],
        occupation: ['', [Validators.minLength(2)]],
        homeAddress: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(255),
          ],
        ],
        homeNumber: ['', [Validators.minLength(2)]],
        officeNumber: ['', [Validators.minLength(2)]],
        cellNumber: ['', [Validators.required, Validators.minLength(2)]],
        faxNumber: ['', [Validators.minLength(2)]],
        emailAddress: ['', [Validators.email]],
        dentalInsurance: ['', [Validators.minLength(2)]],
        firstDentalVisit: ['', [Validators.required]],
        parentsGuardian: ['', [Validators.minLength(2)]],
        parentsGuardianOccupation: [
          '',
          [Validators.minLength(2), Validators.maxLength(255)],
        ],
        referralName: [
          '',
          [Validators.minLength(2), Validators.maxLength(255)],
        ],
        reasonDentalConsultation: [
          '',
          [Validators.minLength(2), Validators.maxLength(255)],
        ],
      });
    }
  }

  onFileChange(event: any) {
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
              this.options.autoClose = true;
              this.alertService.success(
                'Profile picture is ready to be added',
                this.options
              );
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

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log('imgLink:' + this.form.value['imgLink']);
    console.log('firstName:' + this.form.value['firstName']);
    console.log('lastName:' + this.form.value['lastName']);
    console.log('middleName:' + this.form.value['middleName']);
    console.log('nickName:' + this.form.value['nickName']);
    console.log('gender:' + this.form.value['gender']);
    console.log('birthday:' + this.form.value['birthday']);
    console.log('religion:' + this.form.value['religion']);
    console.log('age:' + this.form.controls['age'].value);
    console.log('nationality:' + this.form.value['nationality']);
    console.log('occupation:' + this.form.value['occupation']);
    console.log('homeNumber:' + this.form.value['homeNumber']);
    console.log('officeNumber:' + this.form.value['officeNumber']);
    console.log('cellNumber:' + this.form.value['cellNumber']);
    console.log('faxNumber:' + this.form.value['faxNumber']);
    console.log('emailAddress:' + this.form.value['emailAddress']);
    console.log('homeAddress:' + this.form.value['homeAddress']);
    console.log('firstDentalVisit:' + this.form.value['firstDentalVisit']);
    console.log('dentalInsurance:' + this.form.value['dentalInsurance']);
    console.log('parentsGuardian' + this.form.value['parentsGuardian']);
    console.log(
      'parentsGuardianOccupation:' +
        this.form.value['parentsGuardianOccupation']
    );
    console.log('referralName:' + this.form.value['referralName']);
    console.log(
      'reasonDentalConsultation:' + this.form.value['reasonDentalConsultation']
    );
    const addProfileModel: ProfileModel = {
      imgLink: this.form.value['imgLink'],
      name: {
        firstName: this.form.value['firstName'],
        lastName: this.form.value['lastName'],
        middleName: this.form.value['middleName'],
        nickName: this.form.value['nickName'],
      },
      sex: this.form.value['gender'],
      birthday: this.form.value['birthday'],
      religion: this.form.value['religion'],
      age: this.form.controls['age'].value,
      nationality: this.form.value['nationality'],
      occupation: this.form.value['occupation'],
      contactDetail: {
        contactNumber: {
          homeNumber: this.form.value['homeNumber'],
          officeNumber: this.form.value['officeNumber'],
          cellNumber: this.form.value['cellNumber'],
          faxNumber: this.form.value['faxNumber'],
        },
        emailAddress: this.form.value['emailAddress'],
        homeAddress: this.form.value['homeAddress'],
      },
      firstDentalVisit: this.form.value['firstDentalVisit'],
      dentalInsurance: this.form.value['dentalInsurance'],
      minor: {
        parentsGuardian: this.form.value['parentsGuardian'],
        parentsGuardianOccupation: this.form.value['parentsGuardianOccupation'],
        referralName: this.form.value['referralName'],
        reasonDentalConsultation: this.form.value['reasonDentalConsultation'],
      },
      createdBy: 'Kenzer',
    };
    this.profileModelService.createProfileModel(addProfileModel).subscribe(
      (response: CustomHttpResponse) => {
        console.log(response);
        if (response.httpStatus == 'CREATED') {
          const messageSplit = response.message.split(':');
          const strLink =
            '<a href="/patient-profile/' +
            messageSplit[1] +
            '">Click here to view..</a>';
          this.options.autoClose = false;
          this.alertService.success(messageSplit[0] + strLink, this.options);
        }
      },
      (error: any) => {
        console.log(error);
        const errorResponse: CustomHttpResponse = error['error'];
        if (errorResponse.httpStatus == 'BAD_REQUEST') {
          this.alertService.error(errorResponse.message, this.options);
        }
      },
      () => console.log('Done creating single profile..')
    );
  }

  computeAgeEvent(event: any): void {
    const dob = new Date(event.target.value);
    //calculate month difference from current date in time
    const month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    const age_dt = new Date(month_diff);

    //extract year from date
    const year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    this.form.controls['age'].setValue(Math.abs(year - 1970));
  }

  public viewPatientProfile(event: any, id: any) {
    event.closest('.btn-close').click();
    console.log(id);
    console.log('click here');
    this.router.navigate(['patient-profile', id]);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onGetProfileModel(id: number): void {
    this.profileModelService.getProfileModel(id).subscribe(
      (response: ProfileModel) => {
        console.log('res=' + response);
        this.profileModel = response;
        this.form = this.formBuilder.group({
          id: [this.profileModel?.id],
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
            [Validators.required, Validators.minLength(2)],
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
            [Validators.minLength(2)],
          ],
          parentsGuardianOccupation: [
            this.profileModel?.minor?.parentsGuardianOccupation,
            [Validators.minLength(2)],
          ],
          referralName: [
            this.profileModel?.minor?.referralName,
            [Validators.minLength(2)],
          ],
          reasonDentalConsultation: [
            this.profileModel?.minor?.reasonDentalConsultation,
            [Validators.minLength(2)],
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
