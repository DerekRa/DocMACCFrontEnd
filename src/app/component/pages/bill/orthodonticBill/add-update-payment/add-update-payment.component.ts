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
import { OrthodonticBillDataResponse } from 'src/app/model/interface/billModel/orthodonticBill/orthodontic-bill-data-response';
import { PaymentDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/payment-data-request';
import { PaymentHistoryResponse } from 'src/app/model/interface/billModel/orthodonticBill/payment-history-response';
import { PaymentUpdateDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/payment-update-data-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { OrthodonticBillService } from 'src/app/service/billRecord/orthodontic-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-add-update-payment',
  templateUrl: './add-update-payment.component.html',
  styleUrls: ['./add-update-payment.component.scss'],
})
export class AddUpdatePaymentComponent implements OnInit {
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
  public billData: PaymentHistoryResponse | any = {};
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
    payment: new FormControl(''),
    note: new FormControl(''),
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
    if (this.urlLocation == 'update-payment') {
      console.log('this.transactionId==' + this.transactionId);
      this.transactionId = this.route.snapshot.params['transactionId'];
      console.log('this.transactionId==' + this.transactionId);
      this.orthodonticBillService.getPayment(this.transactionId).subscribe(
        (response: PaymentHistoryResponse) => {
          console.log('response for PaymentHistoryResponse');
          console.log(response);
          this.billData = response;
          this.form = this.formBuilder.group({
            payment: [this.billData.paymentAmount, [Validators.required]],
            note: [
              this.billData.paymentNote,
              [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(255),
              ],
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
        () => console.log('Done getting payment data..')
      );
    } else {
      this.form = this.formBuilder.group({
        payment: ['', [Validators.required]],
        note: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(255),
          ],
        ],
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

    if (this.urlLocation == 'payment') {
      const billDataRequest: PaymentDataRequest = {
        billId: this.billId,
        payment: this.form.value['payment'],
        note: this.form.value['note'],
        createdByName: this.userProfile?.firstName || '',
        createdById: this.userProfile?.id || '',
      };
      console.log('billDataRequest :::' + billDataRequest);
      console.log(billDataRequest);
      this.orthodonticBillService.createPayment(billDataRequest).subscribe(
        (response: CustomHttpResponse) => {
          console.log('response');
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
            this.alertService.success(response.message + strLink, this.options);
          }
        },
        (error: any) => {
          // console.log(error.status);
          console.log(error);
          // console.log(JSON.stringify(error));
          // const errorResponse: CustomHttpResponse = error['error'];
          // console.log(errorResponse);
          // if (errorResponse.httpStatus == 'BAD_REQUEST') {
          //   this.alertService.error(errorResponse.message, this.options);
          // }
        },
        () => console.log('Done creating payment data..')
      );
    } else {
      const billDataRequest: PaymentUpdateDataRequest = {
        paymentTransactionId: this.transactionId,
        billId: this.billId,
        payment: this.form.value['payment'],
        note: this.form.value['note'],
        reasonChange: this.form.value['reason'],
        createdByName: this.userProfile?.firstName || '',
        createdById: this.userProfile?.id || '',
      };
      console.log('billDataRequest :::' + billDataRequest);
      console.log(billDataRequest);
      this.orthodonticBillService.createNewPayment(billDataRequest).subscribe(
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
            this.alertService.success(response.message + strLink, this.options);
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
        () => console.log('Done creating payment update data..')
      );
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
