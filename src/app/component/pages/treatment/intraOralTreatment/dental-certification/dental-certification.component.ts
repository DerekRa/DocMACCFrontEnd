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
import { ExportPdfService } from 'src/app/service/clientProfile/export-pdf.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { DentalCertificateService } from 'src/app/service/treatmentPlan/dental-certificate.service';

@Component({
  selector: 'app-dental-certification',
  templateUrl: './dental-certification.component.html',
  styleUrls: ['./dental-certification.component.scss'],
})
export class DentalCertificationComponent implements OnInit {
  ngOnInit(): void {
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
    public alertService: AlertService
  ) {}
  public id: any;
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
  public onGetData() {
    const certificationRequest: CertificationGetRequest = {
      profileId: this.id,
      createdBy: 10, //coming soon on user management
      dateOfProcedure: this.dateOfProcedure,
    };
    this.dentalCertificateService
      .getCertification(certificationRequest)
      .subscribe(
        (response) => {
          this.certificationData = response;
          console.log('this.certificationData = ' + this.certificationData);
          console.log(this.certificationData);
          if (this.certificationData?.createdAt == null) {
            this.newDataToInsert = true;
          } else {
            this.newDataToInsert = false;
          }
          this.validationOnFields();
        },
        (error: any) => {
          console.log('error');
          console.log(error);
          this.certificationData = error;
          console.log('this.certificationData = ' + this.certificationData);
          console.log(this.certificationData);
          if (this.certificationData?.createdAt == null) {
            this.newDataToInsert = true;
          } else {
            this.newDataToInsert = false;
          }
          this.validationOnFields();
        },
        () => console.log('Done getting certificationData..')
      );
  }
  public updateCertification() {
    this.updateCertificate = !this.updateCertificate;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  public printPDFCertificate() {
    this.exportPdfService
      .getExportPDFCertificate(this.id, this.dateOfProcedure, 10)
      .subscribe(
        (response: any) => {
          if (response.type === HttpEventType.DownloadProgress) {
            this.percentDone = Math.round(
              (100 * response.loaded) / response.total
            );
            console.log(`Downloaded ${this.percentDone}%`);
          }
          var file = new Blob([response], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          // if you want to open PDF in new tab
          // window.open(response);
          var a = document.createElement('a');
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
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done getting pdf certification..')
      );
  }
  private validationOnFields() {
    this.form = this.fb.group({
      diagnosis: [
        this.certificationData?.diagnosis,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      ],
      recommendations: [
        this.certificationData?.recommendations,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      ],
      dateOfProcedure: [this.dateOfProcedure, Validators.required],
    });
  }
  onSubmit(): void {
    this.submitted = true;
    console.log('form value =-=-= ' + JSON.stringify(this.form.value));
    console.log(JSON.stringify(this.form.value));
    console.log(JSON.stringify(this.form.value['diagnosis']));
    console.log(JSON.stringify(this.form.value['recommendations']));
    console.log('dateOfProcedure = ' + this.form.value['dateOfProcedure']);
    this.form.value['dateOfProcedure'] = this.dateOfProcedure;
    console.log('dateOfProcedure = ' + this.form.value['dateOfProcedure']);
    if (this.form.invalid) {
      console.log('return empty diag and reom 000');
      return;
    }
    if (
      this.form.value['diagnosis'] == '' ||
      this.form.value['recommendations'] == ''
    ) {
      console.log('return empty diag and reom');
      return;
    }

    // CertificationRequest
    const certificationRequest: CertificationRequest = {
      profileId: this.id,
      createdBy: 10, // update soon on user management
      dateOfProcedure: this.dateOfProcedure,
      diagnosis: this.form.value['diagnosis'],
      recommendations: this.form.value['recommendations'],
    };
    if (this.newDataToInsert) {
      console.log('save');
      this.dentalCertificateService
        .createCertification(certificationRequest)
        .subscribe(
          (response: CustomHttpResponse) => {
            console.log(response);
            if (response.httpStatus == 'CREATED') {
              this.options.autoClose = false;
              this.alertService.success(response.message);
              this.onGetData();
              this.updateCertification();
            }
          },
          (error: any) => {
            console.log(error);
            const errorResponse: CustomHttpResponse = error['error'];
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
          () => console.log('Done saving certification..')
        );
    } else {
      console.log('update');
      this.dentalCertificateService
        .updateCertification(certificationRequest)
        .subscribe(
          (response: CustomHttpResponse) => {
            console.log(response);
            if (response.httpStatus == 'OK') {
              this.options.autoClose = false;
              this.alertService.success(response.message);
              this.onGetData();
              this.updateCertification();
            }
          },
          (error: any) => {
            console.log(error);
            const errorResponse: CustomHttpResponse = error['error'];
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
          () => console.log('Done updating certification..')
        );
    }
  }
}
