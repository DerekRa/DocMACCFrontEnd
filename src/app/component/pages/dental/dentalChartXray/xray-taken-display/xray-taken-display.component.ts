import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { XrayTakenDisplayDataRequest } from 'src/app/model/interface/xrayTakenModel/xray-taken-display-data-request';
import { XrayTakenImageDetails } from 'src/app/model/interface/xrayTakenModel/xray-taken-image-details';
import { PreRequisiteRequirementService } from 'src/app/service/dentalRecord/pre-requisite-requirement.service';

@Component({
  selector: 'app-xray-taken-display',
  templateUrl: './xray-taken-display.component.html',
  styleUrls: ['./xray-taken-display.component.scss'],
})
export class XrayTakenDisplayComponent implements OnInit, OnChanges {
  constructor(
    // private IntraoralExaminationService: IntraoralExaminationService,
    // private profileModelService: ProfileModelService,
    private preRequisiteRequirementService: PreRequisiteRequirementService,
    private router: Router,
    private route: ActivatedRoute // public alertService: AlertService, // private fb: FormBuilder
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('this.recordAction changes = ' + this.recordAction);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.setExamType();
    this.onGetXrayTakenDisplay('Periapical');
    this.onGetXrayTakenDisplay('Panoramic');
    this.onGetXrayTakenDisplay('CephaloMetric');
    this.onGetXrayTakenDisplay('OcclusalUpper');
    this.onGetXrayTakenDisplay('OcclusalLower');
    this.onGetXrayTakenDisplay('Others');
  }
  @Input('idData') id: any;
  @Input('recordData') recordAction: any;
  @Input('examTypeData') examType: any;
  @Input('examUrlData') examUrl: any;
  @Input('profileData') profileModel: ProfileModel | any;
  @Output() dialogDisplayData = new EventEmitter<string[]>();
  public imgLink: any;
  public hashName: any;
  public imgNameOriginal: any;
  public examLink: any;
  public examinationType: any;
  public periapicalImageDetails: XrayTakenImageDetails | undefined;
  public panoramicImageDetails: XrayTakenImageDetails | undefined;
  public cephaloMetricImageDetails: XrayTakenImageDetails | undefined;
  public occlusalUpperImageDetails: XrayTakenImageDetails | undefined;
  public occlusalLowerImageDetails: XrayTakenImageDetails | undefined;
  public othersImageDetails: XrayTakenImageDetails | undefined;
  public picture: string = 'assets/images/img2x2.png';

  private setExamType() {
    if (this.examUrl == 'intraoral-examination') {
      this.examinationType = 'intraoral_examination';
    }
    if (this.examUrl == 'orthodontic-examination') {
      this.examinationType = 'orthodontic_examination';
    }
    this.examinationType = this.examUrl;
  }
  public onGetXrayTakenDisplay(labelName: string): void {
    const formData = new FormData();
    const displayDataRequest: XrayTakenDisplayDataRequest = {
      profileId: this.id,
      location: 'permanent',
      examinationType: this.examinationType,
      labelName: labelName,
    };
    this.preRequisiteRequirementService
      .getXrayTakenDisplay(displayDataRequest)
      .subscribe(
        (response: XrayTakenImageDetails) => {
          switch (labelName) {
            case 'Periapical':
              this.periapicalImageDetails = response;
              break;
            case 'Panoramic':
              this.panoramicImageDetails = response;
              break;
            case 'CephaloMetric':
              this.cephaloMetricImageDetails = response;
              break;
            case 'OcclusalUpper':
              this.occlusalUpperImageDetails = response;
              break;
            case 'OcclusalLower':
              this.occlusalLowerImageDetails = response;
              break;
            case 'Others':
              this.othersImageDetails = response;
              break;
            default:
              console.log('no found label name.');
          }
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done getting display Periapical data..')
      );
  }
  onViewPeriapicalHistory(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/xray-taken/' + this.examUrl + '/Periapical',
      id,
    ]);
  }
  onViewPanoramicHistory(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/xray-taken/' + this.examUrl + '/Panoramic',
      id,
    ]);
  }
  onViewCephaloMetricHistory(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/xray-taken/' +
        this.examUrl +
        '/CephaloMetric',
      id,
    ]);
  }
  onViewOcclusalUpperHistory(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/xray-taken/' +
        this.examUrl +
        '/OcclusalUpper',
      id,
    ]);
  }
  onViewOcclusalLowerHistory(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/xray-taken/' +
        this.examUrl +
        '/OcclusalLower',
      id,
    ]);
  }
  onViewOthersHistory(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/xray-taken/' + this.examUrl + '/Others',
      id,
    ]);
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
}
