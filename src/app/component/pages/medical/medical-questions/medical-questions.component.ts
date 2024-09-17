import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalModel } from 'src/app/model/interface/medicalHistoryModel/medical-model';
import { ImageDetails } from 'src/app/model/interface/preProcedureModel/image-details';
import { DeleteProfileOrMedical } from 'src/app/model/interface/profileModel/delete-profile';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { MedicalHistoryService } from 'src/app/service/medicalHistory/medical-history.service';
import { PreProcedureRequirementService } from 'src/app/service/medicalHistory/pre-procedure-requirement.service';

@Component({
  selector: 'app-medical-questions',
  templateUrl: './medical-questions.component.html',
  styleUrls: ['./medical-questions.component.scss'],
})
export class MedicalQuestionsComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel(this.id);
    this.onGetMedicalModel(this.id);
    this.onGetInformedConsentDisplay(this.id);
    this.onGetMedicalClearanceDisplay(this.id);
  }
  public profileModel: ProfileModel | undefined;
  public medicalModel: MedicalModel | undefined;
  public picture: string = 'assets/images/img2x2.png';
  public id: any;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public imageDetailsIC: ImageDetails[] = [];
  public imageDetailsMC: ImageDetails[] = [];
  public imgLink: any;
  public hashName: any;
  public imgNameOriginal: any;
  constructor(
    private profileModelService: ProfileModelService,
    private medicalHistoryService: MedicalHistoryService,
    private preProcedureRequirementService: PreProcedureRequirementService,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private router: Router
  ) {}
  public onGetProfileModel(id: number): void {
    this.profileModelService.getProfileModel(id).subscribe(
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
  public onGetMedicalModel(id: number): void {
    this.medicalHistoryService.getMedicalModel(id).subscribe(
      (response: MedicalModel) => {
        console.log('res -=-=' + JSON.stringify(response));
        this.medicalModel = response;
        console.log(
          'res model=' + JSON.stringify(this.medicalModel.medicalModel)
        );
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('Done getting single profile..')
    );
  }
  public onGetInformedConsentDisplay(id: number): void {
    this.preProcedureRequirementService
      .getPreProcedureDisplay('informedConsents', 'permanent', this.id)
      .subscribe(
        (response: ImageDetails[]) => {
          console.log('response::' + response);
          this.imageDetailsIC = response;
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done getting display informed consents..')
      );
  }
  public onGetMedicalClearanceDisplay(id: number): void {
    this.preProcedureRequirementService
      .getPreProcedureDisplay('medicalClearance', 'permanent', this.id)
      .subscribe(
        (response: ImageDetails[]) => {
          console.log('response::' + response);
          this.imageDetailsMC = response;
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done getting display medical clearance..')
      );
  }
  public updateViewItem(
    hashNameType: string,
    originalName: string,
    imgLink: string
  ) {
    this.hashName = hashNameType;
    this.imgNameOriginal = originalName;
    this.imgLink = imgLink;
  }
  onViewInformedConsents(id: any) {
    console.log(id);
    this.router.navigate([
      'medical-history/patient/preProcedure',
      'informedConsents',
      id,
    ]);
  }
  onViewMedicalClearances(id: any) {
    console.log(id);
    this.router.navigate([
      'medical-history/patient/preProcedure',
      'medicalClearance',
      id,
    ]);
  }
  onViewPhysicians(id: any) {
    console.log(id);
    this.router.navigate(['medical-history/patient/physicians', id]);
  }
  onUpdateHealthCheck(id: any) {
    console.log(id);
    this.router.navigate(['medical-history/update-patient', id]);
  }
  deleteMedicalModel(id: any) {
    console.log('id to delete == ' + id);
    const deleteProfile: DeleteProfileOrMedical = {
      id: id,
      updatedBy: 'Killua',
    };
    this.medicalHistoryService
      .deleteUpdateMedicalModel(deleteProfile)
      .subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
          if (response.httpStatus == 'OK') {
            this.options.autoClose = true;
            this.alertService.success(response.message, this.options);
            this.router.navigate(['medical-history/patients']);
            // this.router.navigate(['patients-profile'], { state: { key: response.message } });
          }
        },
        (error: any) => {
          console.log(error);
          const errorResponse: CustomHttpResponse = error['error'];
          if (errorResponse.httpStatus == 'BAD_REQUEST') {
            this.alertService.error(errorResponse.message, this.options);
          }
        },
        () => console.log('Done deleting single profile..')
      );
  }
}
