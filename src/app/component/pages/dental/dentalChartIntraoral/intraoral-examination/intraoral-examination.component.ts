import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DentalChartDesignResponse } from 'src/app/model/interface/dentalChartModel/dental-chart-design-response';
import { IntraoralExamination } from 'src/app/model/interface/dentalChartModel/intraoralExaminationModel/intraoral-examination';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { IntraoralExaminationService } from 'src/app/service/dentalRecord/intraoral-examination.service';

@Component({
  selector: 'app-intraoral-examination',
  templateUrl: './intraoral-examination.component.html',
  styleUrls: ['./intraoral-examination.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IntraoralExaminationComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.recordAction = this.route.snapshot.params['record-action'];
    this.onGetTableData('TemporaryTeeth', 'top', 'StatusRight', 'desc');
    this.onGetTableData('TemporaryTeeth', 'top', 'StatusLeft', 'asc');
    this.onGetTableData('PermanentTeeth', 'topCenter', 'StatusRight', 'desc');
    this.onGetTableData('PermanentTeeth', 'topCenter', 'StatusLeft', 'asc');
    this.onGetTableData(
      'PermanentTeeth',
      'bottomCenter',
      'StatusRight',
      'desc'
    );
    this.onGetTableData('PermanentTeeth', 'bottomCenter', 'StatusLeft', 'asc');
    this.onGetTableData('TemporaryTeeth', 'bottom', 'StatusRight', 'desc');
    this.onGetTableData('TemporaryTeeth', 'bottom', 'StatusLeft', 'asc');
    this.onGetProfileModel();
    this.getImageTeeth('addTeeth.png');
    this.getImageToothSurface('default_tooth_surface.png');
    document.documentElement.style.setProperty(
      '--primary-color',
      'rgb(255, 249, 249)'
    );
  }
  constructor(
    private intraoralExaminationService: IntraoralExaminationService,
    private profileModelService: ProfileModelService,
    // private preRequisiteRequirementService: PreRequisiteRequirementService,
    private router: Router,
    private route: ActivatedRoute,
    // public alertService: AlertService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    document.documentElement.style.setProperty(
      '--testbgcolor',
      'rgb(190, 193, 99)'
    );
    this.recordAction = this.route.snapshot.params['record-action'];
  }

  public id: any;
  public recordAction: any;
  public imgLink: any;
  public hashName: any;
  public imgNameOriginal: any;
  public profileModel: ProfileModel | any;

  public imageDetailsTempRightTop: DentalChartDesignResponse[] | any;
  public imageDetailsTempLeftTop: DentalChartDesignResponse[] | any;
  public imageDetailsPermaRightTopCenter: DentalChartDesignResponse[] | any;
  public imageDetailsPermaLeftTopCenter: DentalChartDesignResponse[] | any;
  public imageDetailsPermaRightBottomCenter: DentalChartDesignResponse[] | any;
  public imageDetailsPermaLeftBottomCenter: DentalChartDesignResponse[] | any;
  public imageDetailsTempRightBottom: DentalChartDesignResponse[] | any;
  public imageDetailsTempLeftBottom: DentalChartDesignResponse[] | any;
  public addTeethLink: string = '';
  public defaultToothSurface: string = '';
  public widthImage: string = '34';
  public heightImage: string = '49';
  public widthBigImage: string = '40';
  public heightBigImage: string = '66';
  public widthAddImage: string = '54';
  public heightAddImage: string = '49';
  public intraoralExaminationResponse: IntraoralExamination | undefined;
  public teethNumber: string = '';
  public examType: string = 'Intraoral Examination';
  public examUrl: string = 'intraoral-examination';

  public updateRecordActionToView() {
    this.recordAction = 'view-record';
    console.log(this.recordAction);
  }

  public updateRecordActionToUpdate() {
    this.recordAction = 'add-record';
    console.log(this.recordAction);
  }

  private onGetTableData(
    kindsOfTeeth: string,
    teethArea: string,
    teethPositionStatus: string,
    sorting: string
  ) {
    const urlPathName = window.location.pathname;
    // console.log('urlPathName = ' + urlPathName);

    this.intraoralExaminationService
      .getIntraOralDisplay(
        this.id,
        kindsOfTeeth,
        teethArea,
        teethPositionStatus,
        sorting
      )
      .subscribe(
        (response: DentalChartDesignResponse[]) => {
          if (teethArea == 'top' && teethPositionStatus == 'StatusRight') {
            this.imageDetailsTempRightTop = response;
          }
          if (teethArea == 'top' && teethPositionStatus == 'StatusLeft') {
            this.imageDetailsTempLeftTop = response;
          }
          if (
            teethArea == 'topCenter' &&
            teethPositionStatus == 'StatusRight'
          ) {
            this.imageDetailsPermaRightTopCenter = response;
          }
          if (teethArea == 'topCenter' && teethPositionStatus == 'StatusLeft') {
            this.imageDetailsPermaLeftTopCenter = response;
          }
          if (
            teethArea == 'bottomCenter' &&
            teethPositionStatus == 'StatusRight'
          ) {
            this.imageDetailsPermaRightBottomCenter = response;
          }
          if (
            teethArea == 'bottomCenter' &&
            teethPositionStatus == 'StatusLeft'
          ) {
            this.imageDetailsPermaLeftBottomCenter = response;
          }
          if (teethArea == 'bottom' && teethPositionStatus == 'StatusRight') {
            this.imageDetailsTempRightBottom = response;
          }
          if (teethArea == 'bottom' && teethPositionStatus == 'StatusLeft') {
            this.imageDetailsTempLeftBottom = response;
          }
        },
        (error: any) => console.log(error),
        () => console.log('Done getting default configuration design..')
      );
  }

  public getImageTeeth(image: string) {
    console.log('image : ' + image);
    this.addTeethLink = this.intraoralExaminationService.getImage(image);
  }
  public getImageToothSurface(image: string) {
    console.log('image : ' + image);
    this.defaultToothSurface = this.intraoralExaminationService.getImage(image);
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
  public addUpdateIntralOralExam(teethNumbering: number) {
    console.log('teethNumbering = ' + teethNumbering);
    this.router.navigate([
      `dental-records/dental-chart/intraoral-examination/add-record/${this.id}/update-tooth-condition/${teethNumbering}`,
    ]);
  }
  public teethHistory(teethNumbering: number) {
    console.log('teethNumbering = ' + teethNumbering);
    this.router.navigate([
      `dental-records/dental-chart/intraoral-examination/view-record/${this.id}/procedure/${teethNumbering}/history`,
    ]);
  }
  public teethRecentHistory(teethNumbering: number) {
    console.log('teethNumbering = ' + teethNumbering);
    this.router.navigate([
      `dental-records/dental-chart/intraoral-examination/view-record/${this.id}/procedure/${teethNumbering}/recent`,
    ]);
  }
  public displayCondition(teethNumbering: number) {
    // console.log(teethNumbering)
    // console.log('urlPathName = ' + urlPathName);
    this.intraoralExaminationService
      .getRecentIntraOralExaminationByNumber(this.id, teethNumbering)
      .subscribe(
        (response: IntraoralExamination) => {
          // console.log('response == ' + JSON.stringify(response));
          this.intraoralExaminationResponse = response;
          // console.log('intraoralExaminationResponse == ' + JSON.stringify(this.intraoralExaminationResponse));
          this.teethNumber = '';
          for (
            let i = 0;
            i <
            this.intraoralExaminationResponse?.conditionProcedureGroupings
              ?.conditions.length;
            i++
          ) {
            if (
              this.intraoralExaminationResponse?.conditionProcedureGroupings
                ?.conditions[i].checked
            ) {
              if (this.teethNumber !== '') {
                this.teethNumber +=
                  ', ' +
                  this.intraoralExaminationResponse?.conditionProcedureGroupings
                    ?.conditions[i].name;
              } else {
                this.teethNumber =
                  this.intraoralExaminationResponse?.conditionProcedureGroupings?.conditions[
                    i
                  ].name;
              }
            }
          }
          // console.log(this.teethNumber);
        },
        (error: any) => {
          console.log('error ==' + JSON.stringify(error));
        },
        () => console.log('Done getting Intraoral Examination response..')
      );
  }
}
