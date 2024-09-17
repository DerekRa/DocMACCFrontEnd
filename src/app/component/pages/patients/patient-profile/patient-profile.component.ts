import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
// import { CustomHttpResponse } from 'src/app/model/interface/custom-http-response';
import { MedicalModel } from 'src/app/model/interface/medicalHistoryModel/medical-model';
import { DeleteProfileOrMedical } from 'src/app/model/interface/profileModel/delete-profile';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ExportPdfService } from 'src/app/service/clientProfile/export-pdf.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { MedicalHistoryService } from 'src/app/service/medicalHistory/medical-history.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  public profileModel: ProfileModel | undefined;
  public medicalModel: MedicalModel | undefined;
  public percentDone: number = 0;
  public id: any;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  constructor(
    private profileModelService: ProfileModelService,
    private medicalHistoryService: MedicalHistoryService,
    private exportPdfService: ExportPdfService,
    public alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel(this.id);
    this.onGetMedicalModel(this.id);
  }

  public deletePatientProfile(id: any) {
    const deleteProfile: DeleteProfileOrMedical = {
      id: id,
      updatedBy: 'Killua',
    };
    this.profileModelService.deleteProfileModel(deleteProfile).subscribe(
      (response: CustomHttpResponse) => {
        console.log(response);
        if (response.httpStatus == 'OK') {
          this.options.autoClose = true;
          this.alertService.success(response.message, this.options);
          this.router.navigate(['patients-profile']);
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

  public updatePatientProfile(id: any) {
    this.router.navigate(['update-patient-profile', id]);
  }

  public onGetProfileModel(id: number): void {
    this.profileModelService.getProfileModel(id).subscribe(
      (response) => {
        console.log('res=' + JSON.stringify(response));
        this.profileModel = response;
        this.profileModel.age =
          this.computeAgeEvent(this.profileModel.birthday) + ' years old';
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
        console.log('res=' + JSON.stringify(response));
        this.medicalModel = response;
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        console.log('medical data = ' + this.medicalModel);
        console.log('Done getting single profile..');
      }
    );
  }

  public printPDFProfile(id: any) {
    this.exportPdfService.getExportPDFProfile(id).subscribe(
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
            '.pdf'
          : 'blankpage.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('Done getting pdf profile..')
    );
  }

  computeAgeEvent(bday: string) {
    const dob = new Date(bday);
    //calculate month difference from current date in time
    const month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    const age_dt = new Date(month_diff);

    //extract year from date
    const year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    return Math.abs(year - 1970);
  }
}
