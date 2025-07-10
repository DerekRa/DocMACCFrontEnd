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
import { AdditionalChargeDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/additional-charge-data-request';
import { AdditionalChargeHistoryResponse } from 'src/app/model/interface/billModel/orthodonticBill/additional-charge-history-response';
import { AdditionalChargeUpdateDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/additional-charge-update-data-request';
import { OrthodonticBillDataResponse } from 'src/app/model/interface/billModel/orthodonticBill/orthodontic-bill-data-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { OrthodonticBillService } from 'src/app/service/billRecord/orthodontic-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-add-update-additional-charge',
  templateUrl: './add-update-additional-charge.component.html',
  styleUrls: ['./add-update-additional-charge.component.scss'],
})
export class AddUpdateAdditionalChargeComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.billId = this.route.snapshot.params['billId'];
    this.dateOfBill = this.route.snapshot.params['dateOfBill'];
    const urlPathName = window.location.pathname;
    this.urlLocation = urlPathName.split('/')[7];
    this.onGetProfileModel();
    this.onGetBillData();
    this.onGetTableData();
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    console.log('::::::::');
    console.log(this.userProfile);
  }
  constructor(
    private profileModelService: ProfileModelService,
    private orthodonticBillService: OrthodonticBillService,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private formBuilder: FormBuilder,
    private readonly keycloak: KeycloakService
  ) {}
  public id: any;
  public billId: any = 0;
  public transactionId: any = 0;
  public dateOfBill: any = '';
  public profileModel: ProfileModel | undefined;
  public billData: OrthodonticBillDataResponse | any = {};
  public dateOfProcedure: string = '';
  public urlLocation: string = '';
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public submitted = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    additionalCharge: new FormControl(''),
    reason: new FormControl(''),
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
  private onGetTableData() {
    console.log('this.urlLocation==' + this.urlLocation);
    if (this.urlLocation == 'update-additional-charge') {
      console.log('this.transactionId==' + this.transactionId);
      this.transactionId = this.route.snapshot.params['transactionId'];
      console.log('this.transactionId==' + this.transactionId);
      this.orthodonticBillService
        .getAdditionalCharge(this.transactionId)
        .subscribe(
          (response: AdditionalChargeHistoryResponse) => {
            console.log('response for AdditionalChargeHistoryResponse');
            console.log(response);
            this.billData = response;
            this.form = this.formBuilder.group({
              additionalCharge: [
                this.billData.additionalChargeAmount,
                [Validators.required],
              ],
              reason: [
                '',
                [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(255),
                ],
              ],
            });
          },
          (error: any) => {
            console.log(error);
          },
          () => console.log('Done getting additional charge data..')
        );
    } else {
      this.form = this.formBuilder.group({
        additionalCharge: ['', [Validators.required]],
        reason: [''],
      });
    }
  }
  private onGetBillData() {
    if (this.billId !== 0) {
      this.orthodonticBillService.getBill(this.id, this.billId).subscribe(
        (response: OrthodonticBillDataResponse) => {
          console.log('response for OrthodonticBillDataResponse');
          console.log(response);
          this.billData = response;
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done getting bill data..')
      );
    } else {
    }
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

    if (this.urlLocation == 'add-charge') {
      const billDataRequest: AdditionalChargeDataRequest = {
        billId: this.billId,
        additionalChargeAmount: this.form.value['additionalCharge'],
        createdByName: this.userProfile?.firstName || '',
        createdById: this.userProfile?.id || '',
      };
      console.log('billDataRequest :::' + billDataRequest);
      console.log(billDataRequest);
      this.orthodonticBillService
        .createAdditionalCharge(billDataRequest)
        .subscribe(
          (response: CustomHttpResponse) => {
            console.log(response);
            if (response.httpStatus == 'CREATED') {
              const strLink =
                '<a href="/bill-records/orthodontic/patients/' +
                this.id +
                '/' +
                this.billId +
                '/' +
                this.dateOfBill +
                '"> Click here to view..</a>';
              this.options.autoClose = false;
              this.alertService.success(
                response.message + strLink,
                this.options
              );
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
          () => console.log('Done creating additional charge data..')
        );
    } else {
      const billDataRequest: AdditionalChargeUpdateDataRequest = {
        billId: this.billId,
        chargeTransactionId: this.transactionId,
        additionalChargeAmount: this.form.value['additionalCharge'],
        reasonChange: this.form.value['reason'],
        createdByName: this.userProfile?.firstName || '',
        createdById: this.userProfile?.id || '',
      };
      console.log('billDataRequest :::' + billDataRequest);
      console.log(billDataRequest);
      this.orthodonticBillService
        .createNewAdditionalCharge(billDataRequest)
        .subscribe(
          (response: CustomHttpResponse) => {
            console.log(response);
            if (response.httpStatus == 'CREATED') {
              const strLink =
                '<a href="/bill-records/orthodontic/patients/' +
                this.id +
                '/' +
                this.billId +
                '/' +
                this.dateOfBill +
                '"> Click here to view..</a>';
              this.options.autoClose = false;
              this.alertService.success(
                response.message + strLink,
                this.options
              );
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
          () => console.log('Done creating additional charge update data..')
        );
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
