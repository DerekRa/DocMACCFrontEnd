import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
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
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.id = this.route.snapshot.params['id'];
    this.physicianId = this.route.snapshot.params['physicianId'];
    this.action = this.route.snapshot.params['action'];
    this.onGetPhysician();
    this.onGetProfileModel();
  }

  constructor(
    private profileModelService: ProfileModelService,
    private physicianHistoryService: PhysicianHistoryService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
    private readonly keycloak: KeycloakService,
  ) {}

  urlCurrentLocation() {
    const urlPathName = window.location.pathname;
    const urlAction = urlPathName.split('/');
    return urlAction[5];
  }

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  public onGetPhysician(): void {
    this.physicianHistoryService
      .getPhysician(this.id, this.physicianId)
      .subscribe((response) => {
        this.physician = response;
        if (this.urlCurrentLocation() === 'Update') {
          this.updatePhysician();
        }
      });
  }

  public deletePhysician() {
    const physician: Physician = {
      id: this.physicianId,
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
    };
    this.physicianHistoryService.deletePhysician(physician).subscribe(
      (response: CustomHttpResponse) => {
        if (response.httpStatus == 'OK') {
          this.alertService.success(response.message, this.options);
          this.router.navigate([
            `/medical-history/patient/physicians`,
            this.id,
          ]);
        }
      },
      (error: any) => {
        const errorResponse: CustomHttpResponse = error['error'];
        if (errorResponse.httpStatus == 'BAD_REQUEST') {
          this.alertService.error(errorResponse.message, this.options);
        }
      },
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
        profileId: this.id,
        fullName: this.form.value['fullName'],
        officeAddress: this.form.value['officeAddress'],
        officeNumber: this.form.value['officeNumber'],
        specialty: this.form.value['specialty'],
        createdByName: this.userProfile?.firstName || '',
        createdById: this.userProfile?.id || '',
      };
      this.physicianHistoryService.updatePhysicianHistory(physician).subscribe(
        (response: CustomHttpResponse) => {
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
          const errorResponse: CustomHttpResponse = error['error'];
          if (errorResponse.httpStatus == 'BAD_REQUEST') {
            this.alertService.error(errorResponse.message, this.options);
          }
        },
      );
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
