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
import { AmountPaymentRequest } from 'src/app/model/interface/billModel/intraOralBill/amount-payment-request';
import { BillBreakdown } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdown';
import { BillBreakdownResponse } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdown-response';
import { BillBreakdwonRequest } from 'src/app/model/interface/billModel/intraOralBill/bill-breakdwon-request';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { IntraoralBillService } from 'src/app/service/billRecord/intraoral-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-payment-procedure',
  templateUrl: './payment-procedure.component.html',
  styleUrls: ['./payment-procedure.component.scss'],
})
export class PaymentProcedureComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.dateOfProcedure = this.route.snapshot.params['dateofProcedure'];
    this.procedureNumber = this.route.snapshot.params['procedureNumber'];
    this.onGetProfileModel();
    this.onGetTableData();
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  constructor(
    private profileModelService: ProfileModelService,
    private intraoralBillService: IntraoralBillService,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private formBuilder: FormBuilder,
    private readonly keycloak: KeycloakService,
  ) {}

  public id: any;
  public profileModel: ProfileModel | undefined;
  public billBreakdown: BillBreakdownResponse | any = {};
  public breakdown: BillBreakdown | any = {};
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
    payment: new FormControl(''),
    note: new FormControl(''),
  });

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  private onGetTableData() {
    const billBreakdwonRequest: BillBreakdwonRequest = {
      profileId: this.id,
      dateOfProcedure: this.dateOfProcedure,
    };

    this.intraoralBillService
      .getBillTotalBreakdown(billBreakdwonRequest)
      .subscribe((response: BillBreakdownResponse) => {
        this.billBreakdown = response;

        const getProcedure = Number(this.procedureNumber) - 1;
        for (let i = 0; i < this.billBreakdown.billBreakdowns.length; i++) {
          if (i == getProcedure) {
            this.breakdown = this.billBreakdown.billBreakdowns[i];
          }
        }
        this.form = this.formBuilder.group({
          payment: [this.breakdown.balance, [Validators.required]],
          note: [
            '',
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255),
            ],
          ],
        });
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const amountPaymentRequest: AmountPaymentRequest = {
      profileId: this.id,
      paymentAmount: this.form.value['payment'],
      note: this.form.value['note'],
      category: this.breakdown.category,
      procedureDone: this.breakdown.procedureDone,
      toothNumbers: this.breakdown.toothNumbers,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      dateOfProcedure: this.dateOfProcedure,
    };

    this.intraoralBillService
      .createAmountPayment(amountPaymentRequest)
      .subscribe(
        (response: CustomHttpResponse) => {
          if (response.httpStatus == 'CREATED') {
            const strLink =
              '<a href="/bill-records/intraoral/patients/' +
              this.id +
              '/' +
              this.dateOfProcedure +
              '"> Click here to view..</a>';
            this.options.autoClose = false;
            this.alertService.success(response.message + strLink, this.options);
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
