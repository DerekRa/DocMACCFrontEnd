import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Physician } from 'src/app/model/interface/medicalHistoryModel/physician';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { PhysicianHistoryService } from 'src/app/service/dentalRecord/physician-history.service';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.scss'],
})
export class PhysicianComponent implements OnInit {
  public id: any;
  public physicianId: any;
  public action: any;
  public submitted = false;
  public physician: Physician | undefined;
  public profileModel: ProfileModel | undefined;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    officeAddress: new FormControl(''),
    officeNumber: new FormControl(''),
    specialty: new FormControl(''),
  });
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.physicianId = this.route.snapshot.params['physicianId'];
    this.action = this.route.snapshot.params['action'];
    console.log('action = ' + this.action);
    this.onGetPhysician();
    this.onGetProfileModel();
  }
  constructor(
    private profileModelService: ProfileModelService,
    private physicianHistoryService: PhysicianHistoryService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public alertService: AlertService
  ) {}
  urlCurrentLocation() {
    const urlPathName = window.location.pathname;
    const urlAction = urlPathName.split('/');
    return urlAction[5];
  }
  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe(
      (response) => {
        console.log('res prof=' + response);
        this.profileModel = response;
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('Done getting single profile..')
    );
  }
  public onGetPhysician(): void {
    this.physicianHistoryService
      .getPhysician(this.id, this.physicianId)
      .subscribe(
        (response) => {
          console.log('res physician=' + response);
          this.physician = response;
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done getting single physician..')
      );
  }
  public deletePhysician() {
    const physician: Physician = {
      id: this.physicianId,
      createdBy: this.id,
    };
    console.log('delete noiw');
    this.physicianHistoryService.deletePhysician(physician).subscribe(
      (response: CustomHttpResponse) => {
        console.log(response);
        if (response.httpStatus == 'OK') {
          this.alertService.success(response.message, this.options);
          this.router.navigate([
            `/medical-history/patient/physicians`,
            this.id,
          ]);
        }
      },
      (error: any) => {
        console.log(error);
        const errorResponse: CustomHttpResponse = error['error'];
        if (errorResponse.httpStatus == 'BAD_REQUEST') {
          this.alertService.error(errorResponse.message, this.options);
        }
      },
      () => console.log('Done deleting single physician..')
    );
  }
  public updatePhysician() {
    this.action = 'Update';
    this.form = this.formBuilder.group({
      fullName: [
        this.physician?.fullName,
        [
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      officeAddress: [
        this.physician?.officeAddress,
        [
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      officeNumber: [
        this.physician?.officeNumber,
        [
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      specialty: [
        this.physician?.specialty,
        [
          Validators.minLength(2),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
    });
    this.router.navigate([
      `/medical-history/patient/physicians/${this.id}/Update/${this.physician?.id}`,
    ]);
  }
  public cancelPhysician() {
    this.action = 'View';
    this.router.navigate([
      `/medical-history/patient/physicians/${this.id}/View/${this.physician?.id}`,
    ]);
  }
  public savePhysician() {
    if (this.action === 'Update') {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      const physician: Physician = {
        id: this.physician?.id,
        fullName: this.form.value['fullName'],
        officeAddress: this.form.value['officeAddress'],
        officeNumber: this.form.value['officeNumber'],
        specialty: this.form.value['specialty'],
        createdBy: this.id,
      };
      console.log('physician == ' + JSON.stringify(physician));
      this.physicianHistoryService.updatePhysicianHistory(physician).subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
          if (response.httpStatus == 'OK') {
            const messageSplit = response.message.split(':');
            this.options.autoClose = false;
            this.alertService.success(messageSplit[0], this.options);
            this.onGetPhysician();
            this.action = 'View';
            this.router.navigate([
              `/medical-history/patient/physicians/${this.id}/View/${this.physician?.id}`,
            ]);
          }
        },
        (error: any) => {
          console.log(error);
          const errorResponse: CustomHttpResponse = error['error'];
          if (errorResponse.httpStatus == 'BAD_REQUEST') {
            this.alertService.error(errorResponse.message, this.options);
          }
        },
        () => console.log('Done updating physician records..')
      );
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
