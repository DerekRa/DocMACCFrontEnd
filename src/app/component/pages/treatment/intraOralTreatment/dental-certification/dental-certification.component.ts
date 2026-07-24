import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { CertificationGetRequest } from 'src/app/model/interface/treatmentPlanModel/certification-get-request';
import { CertificationRequest } from 'src/app/model/interface/treatmentPlanModel/certification-request';
import { CertificationResponse } from 'src/app/model/interface/treatmentPlanModel/certification-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ExportPdfService } from 'src/app/service/print/export-pdf.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { DentalCertificateService } from 'src/app/service/treatmentPlan/dental-certificate.service';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { GlobalLoadingService } from 'src/app/service/loading/global-loading.service';

@Component({
  selector: 'app-dental-certification',
  templateUrl: './dental-certification.component.html',
  styleUrls: ['./dental-certification.component.scss'],
})
export class DentalCertificationComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.id = this.route.snapshot.params['id'];
    this.dateOfProcedure = this.route.snapshot.params['dateofProcedure'];
    this.onGetProfileModel();
    this.onGetData();
  }

  constructor(
    private profileModelService: ProfileModelService,
    private dentalCertificateService: DentalCertificateService,
    private exportPdfService: ExportPdfService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public alertService: AlertService,
    private readonly keycloak: KeycloakService,
    private loadingService: GlobalLoadingService,
  ) {}

  public id: any;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public dateOfProcedure: string = '';
  public profileModel: ProfileModel | undefined;
  public certificationData: CertificationResponse | undefined;
  public newDataToInsert: boolean = false;
  public updateCertificate: boolean = false;
  public submitted: boolean = false;
  public percentDone: number = 0;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    diagnosis: new FormControl(''),
    recommendations: new FormControl(''),
    dateOfProcedure: new FormControl(''),
  });

  public onGetProfileModel(): void {
    this.profileModelService.getProfileModel(this.id).subscribe((response) => {
      this.profileModel = response;
    });
  }

  public onGetData() {
    const certificationRequest: CertificationGetRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      dateOfProcedure: this.dateOfProcedure,
    };
    this.dentalCertificateService
      .getCertification(certificationRequest)
      .subscribe(
        (response) => {
          this.certificationData = response;
          if (this.certificationData?.createdByName == null) {
            this.newDataToInsert = true;
          } else {
            this.newDataToInsert = false;
          }
          this.validationOnFields();
        },
        (error: any) => {
          this.certificationData = error;
          if (this.certificationData?.createdByName == null) {
            this.newDataToInsert = true;
          } else {
            this.newDataToInsert = false;
          }
          this.validationOnFields();
        },
      );
  }

  public updateCertification() {
    this.updateCertificate = !this.updateCertificate;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public printPDFCertificate() {
    this.loadingService.loadingOn();
    this.percentDone = 0;

    this.exportPdfService
      .getExportPDFCertificate(
        this.id,
        this.dateOfProcedure,
        this.userProfile?.firstName || '',
        this.userProfile?.id || '',
      )
      .subscribe({
        next: (response: any) => {
          if (
            response.type === HttpEventType.DownloadProgress &&
            typeof response.total === 'number' &&
            response.total > 0
          ) {
            this.percentDone = Math.round(
              (100 * response.loaded) / response.total,
            );
            console.log('Download progress:', this.percentDone + '%');
            this.loadingService.setProgress(this.percentDone);
          }

          if (response.type === HttpEventType.Response && response.body) {
            this.percentDone = 100;
            this.loadingService.setProgress(100);
            this.loadingService.loadingOff();

            const file = new Blob([response.body], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = fileURL;
            a.target = '_blank';
            a.download = this.profileModel?.name?.lastName
              ? this.profileModel?.name?.lastName +
                this.profileModel?.name?.firstName +
                this.profileModel?.name?.middleName +
                'Certification' +
                this.dateOfProcedure +
                '.pdf'
              : 'blankpage.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(fileURL);
          }
        },
        error: () => {
          this.percentDone = 0;
          this.loadingService.loadingOff();
        },
      });
  }

  private validationOnFields() {
    this.form = this.fb.group({
      diagnosis: [
        this.certificationData?.diagnosis,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(1000),
        ],
      ],
      recommendations: [
        this.certificationData?.recommendations,
        [Validators.minLength(2), Validators.maxLength(1000)],
      ],
      dateOfProcedure: [this.dateOfProcedure, Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.form.value['dateOfProcedure'] = this.dateOfProcedure;
    if (this.form.invalid) {
      return;
    }
    if (this.form.value['diagnosis'] == '') {
      return;
    }

    // CertificationRequest
    const certificationRequest: CertificationRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      dateOfProcedure: this.dateOfProcedure,
      diagnosis: this.form.value['diagnosis'],
      recommendations: this.form.value['recommendations'],
    };
    if (this.newDataToInsert) {
      this.dentalCertificateService
        .createCertification(certificationRequest)
        .subscribe(
          (response: CustomHttpResponse) => {
            if (response.httpStatus == 'CREATED') {
              this.options.autoClose = false;
              this.alertService.success(response.message);
              this.onGetData();
              this.updateCertification();
            }
          },
          (error: any) => {
            const errorResponse: CustomHttpResponse = error['error'];
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
        );
    } else {
      this.dentalCertificateService
        .updateCertification(certificationRequest)
        .subscribe(
          (response: CustomHttpResponse) => {
            if (response.httpStatus == 'OK') {
              this.options.autoClose = false;
              this.alertService.success(response.message);
              this.onGetData();
              this.updateCertification();
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
}
