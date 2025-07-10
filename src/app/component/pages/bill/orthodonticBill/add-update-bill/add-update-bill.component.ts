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
import { BillDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/bill-data-request';
import { OrthodonticBillDataResponse } from 'src/app/model/interface/billModel/orthodonticBill/orthodontic-bill-data-response';
import { UpdateBillDataRequest } from 'src/app/model/interface/billModel/orthodonticBill/update-bill-data-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { OrthodonticBillService } from 'src/app/service/billRecord/orthodontic-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-add-update-bill',
  templateUrl: './add-update-bill.component.html',
  styleUrls: ['./add-update-bill.component.scss'],
})
export class AddUpdateBillComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];

    this.onGetProfileModel();
    this.updateCheckUrlPath();
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
    private router: Router,
    public alertService: AlertService,
    private formBuilder: FormBuilder,
    private readonly keycloak: KeycloakService
  ) {}
  public id: any;
  public billId: any = 0;
  public dateOfBill: any = '';
  public profileModel: ProfileModel | undefined;
  public billData: OrthodonticBillDataResponse | any = {};
  public urlLocation: string = 'add-new';
  // public breakdown: BillBreakdown | any = {};
  public dateOfProcedure: string = '';
  public procedureNumber: string = '';
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public submitted = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    billName: new FormControl(''),
    totalBill: new FormControl(''),
    reason: new FormControl(''),
  });
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
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
  private updateCheckUrlPath() {
    const urlPathName = window.location.pathname;
    console.log('urlPathName = ' + urlPathName);
    this.urlLocation = urlPathName.split('/')[5];
    if (
      !(
        this.urlLocation == 'add-from-view-record' ||
        this.urlLocation == 'add-record'
      )
    ) {
      this.urlLocation = urlPathName.split('/')[7];
      this.billId = this.route.snapshot.params['billId'];
      this.dateOfBill = this.route.snapshot.params['dateOfBill'];
    }
  }
  private onGetTableData() {
    console.log('this.urlLocation==' + this.urlLocation);

    if (this.billId !== 0) {
      this.orthodonticBillService.getBill(this.id, this.billId).subscribe(
        (response: OrthodonticBillDataResponse) => {
          console.log('response for OrthodonticBillDataResponse');
          console.log(response);
          this.billData = response;
          this.form = this.formBuilder.group({
            totalBill: [this.billData.totalBill, [Validators.required]],
            billName: [
              this.billData.billName,
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
        () => console.log('Done getting bill data..')
      );
    } else {
      this.form = this.formBuilder.group({
        totalBill: ['', [Validators.required]],
        billName: [
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
  onSubmit() {
    this.submitted = true;
    console.log('form value =-=-= ' + JSON.stringify(this.form.value));
    // console.log('form value periodontalScreeningTMDRequestList =-=-= ' + JSON.stringify(this.form.value.periodontalScreeningTMDRequestList));
    // console.log('form value occlusion =-=-= ' + JSON.stringify(this.form.value.occlusion));
    // console.log('form value appliances =-=-= ' + JSON.stringify(this.form.value.appliances));
    if (this.form.invalid) {
      return;
    }

    console.log(
      "this.form.value['billName'] ===" + this.form.value['billName']
    );
    if (this.billId == 0) {
      const billDataRequest: BillDataRequest = {
        profileId: this.id,
        billName: this.form.value['billName'],
        totalBill: this.form.value['totalBill'],
        createdByName: this.userProfile?.firstName || '',
        createdById: this.userProfile?.id || '',
      };
      console.log('billDataRequest :::' + billDataRequest);
      console.log(billDataRequest);
      this.orthodonticBillService.createBill(billDataRequest).subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
          if (response.httpStatus == 'CREATED') {
            const strLink =
              '<a href="/bill-records/orthodontic/patients/' +
              this.id +
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
        () => console.log('Done creating bill data..')
      );
    } else {
      // update now on the bill history
      const billDataRequest: UpdateBillDataRequest = {
        billId: this.billId,
        billName: this.form.value['billName'],
        totalBill: this.form.value['totalBill'],
        createdByName: this.userProfile?.firstName || '',
        createdById: this.userProfile?.id || '',
        reasonChanged: this.form.value['reason'],
      };

      console.log('billDataRequest :::' + billDataRequest);
      console.log(billDataRequest);
      this.orthodonticBillService.createNewBill(billDataRequest).subscribe(
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
        () => console.log('Done creating new bill data..')
      );
    }
  }
  viewBillHistory() {
    if (this.billId !== undefined) {
      // bill-records/orthodontic/patients/:id/:billId/:dateOfBill/history
      this.router.navigate([
        'bill-records/orthodontic/patients/',
        this.id,
        this.billId,
        this.dateOfBill,
        'history',
      ]);
    }
  }
}
