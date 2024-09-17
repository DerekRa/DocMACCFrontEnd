import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { PrescriptionSaveRequest } from 'src/app/model/interface/prescriptionModel/prescription-save-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { PrescriptionService } from 'src/app/service/treatmentPlan/prescription.service';

@Component({
  selector: 'app-add-update-prescription',
  templateUrl: './add-update-prescription.component.html',
  styleUrls: ['./add-update-prescription.component.scss'],
})
export class AddUpdatePrescriptionComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.dateOfProcedure = this.route.snapshot.params['dateofProcedure'];
    this.onGetProfileModel();
    this.form = this.formBuilder.group({
      brandName: ['', [Validators.required, Validators.minLength(2)]],
      genericName: ['', [Validators.required, Validators.minLength(2)]],
      dispense: [''],
      dosage: ['', Validators.required],
      remarks: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  constructor(
    private profileModelService: ProfileModelService,
    private prescriptionService: PrescriptionService,
    private readonly keycloak: KeycloakService,
    public alertService: AlertService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  public id: any;
  public userProfile: KeycloakProfile | null = null;
  public profileModel: ProfileModel | undefined;
  public dateOfProcedure: string = '';
  public submitted = false;
  public isLoggedIn = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    brandName: new FormControl(''),
    genericName: new FormControl(''),
    dispense: new FormControl(''),
    dosage: new FormControl(''),
    remarks: new FormControl(''),
  });

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe(
      (response) => {
        this.profileModel = response;
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('Done getting single profile..')
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log('form value =-=-= ' + JSON.stringify(this.form.value));
    // console.log('form value periodontalScreeningTMDRequestList =-=-= ' + JSON.stringify(this.form.value.periodontalScreeningTMDRequestList));
    // console.log('form value occlusion =-=-= ' + JSON.stringify(this.form.value.occlusion));
    // console.log('form value appliances =-=-= ' + JSON.stringify(this.form.value.appliances));
    if (this.form.invalid) {
      return;
    }

    console.log('firstName = ' + this.userProfile?.firstName);
    console.log('id = ' + this.userProfile?.id);

    const prescriptionSaveRequest: PrescriptionSaveRequest = {
      dosage: this.form.value['dosage'],
      remarks: this.form.value['remarks'],
      brandName: this.form.value['brandName'],
      genericName: this.form.value['genericName'],
      dispense: this.form.value['dispense'],
      profileId: this.id,
      dateOfProcedure: this.dateOfProcedure,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
    };

    this.prescriptionService
      .createPrescription(prescriptionSaveRequest)
      .subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
          if (response.httpStatus == 'CREATED') {
            const messageSplit = response.message.split(':');
            const strLink =
              '<a href="/dental-records/treatment-plan/prescription/' +
              this.id +
              '/' +
              this.dateOfProcedure +
              '"> Click here to view..</a>';
            this.options.autoClose = false;
            this.alertService.success(messageSplit[0] + strLink, this.options);
          }
        },
        (error: any) => {
          console.log(error.status);
          console.log(error);
          console.log(JSON.stringify(error));
          const errorResponse: CustomHttpResponse = error['error'];
          console.log(errorResponse);
          if (errorResponse.httpStatus == 'BAD_REQUEST') {
            this.alertService.error(errorResponse.message, this.options);
          }
        },
        () => console.log('Done creating walkin appointment..')
      );
  }
}
