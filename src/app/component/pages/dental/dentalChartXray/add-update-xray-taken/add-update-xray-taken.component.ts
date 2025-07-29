import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { co } from '@fullcalendar/core/internal-common';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { XrayTakenImageTempRemove } from 'src/app/model/interface/xrayTakenModel/xray-taken-image-temp-remove';
import { XrayTakenPermanentDataRequest } from 'src/app/model/interface/xrayTakenModel/xray-taken-permanent-data-request';
import { XrayTakenTempImageRequest } from 'src/app/model/interface/xrayTakenModel/xray-taken-temp-image-request';
import { XrayTakenTempImageResponse } from 'src/app/model/interface/xrayTakenModel/xray-taken-temp-image-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { PreRequisiteRequirementService } from 'src/app/service/dentalRecord/pre-requisite-requirement.service';

@Component({
  selector: 'app-add-update-xray-taken',
  templateUrl: './add-update-xray-taken.component.html',
  styleUrls: ['./add-update-xray-taken.component.scss'],
})
export class AddUpdateXrayTakenComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.id = this.route.snapshot.params['id'];
      this.dentalChart = this.route.snapshot.params['dentalChart'];
      this.labelName = this.route.snapshot.params['labelName'];
      this.action = this.route.snapshot.params['action'];
      this.setExamType();
      this.onGetTempRemarkAndFiles();
      this.form = this.formBuilder.group({
        remarks: ['', [Validators.minLength(2), Validators.maxLength(1000)]],
      });
      console.log('this.id = ' + this.id);
      console.log('this.dentalChart = ' + this.dentalChart);
      console.log('this.labelName = ' + this.labelName);
      console.log('this.action = ' + this.action);
      console.log('this.userProfile = ' + JSON.stringify(this.userProfile));
    }
  }

  constructor(
    private readonly keycloak: KeycloakService,
    private preRequisiteRequirementService: PreRequisiteRequirementService,
    private profileModelService: ProfileModelService,
    private router: Router,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}
  public id: any;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public dentalChart: any;
  public labelName: any;
  public action: any;
  public examType: any;
  public examinationType: any;
  public remarks: string = '';
  public files: File[] = [];
  public filesSaved: File[] = [];
  public pictures: string[] = [];
  public nameHashTypes: string[] = [];
  public xrayTakenTempImages: XrayTakenTempImageResponse[] = [];
  uploadProgress: number = 0;
  saveFiles = true;
  public submitted = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  public form: FormGroup = new FormGroup({
    remarks: new FormControl(''),
  });
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  @Output() private filesChangeEmiter: EventEmitter<File[]> =
    new EventEmitter();

  @HostBinding('style.background') private background = '#eee';
  @HostBinding('style.border') private borderStyle = '1px dashed';
  @HostBinding('style.border-color') private borderColor = '#696D7D';
  @HostBinding('style.border-radius') private borderRadius = '1px';
  @HostBinding('style.height') private height = '300px';
  @HostBinding('style.min-height') private minHeight = '300px';
  @HostBinding('style.max-height') private maxHeight = '300px';
  @HostBinding('style.min-width') private minWidth = '300px';
  @HostBinding('style.max-width') private maxWidth = '300px';

  private setExamType() {
    if (this.dentalChart == 'intraoral-examination') {
      this.examType = 'Intraoral Examination';
      this.examinationType = 'intraoral_examination';
    }
    if (this.dentalChart == 'orthodontic-examination') {
      this.examType = 'Orthodontic Examination';
      this.examinationType = 'orthodontic_examination';
    }
    console.log('this.examType = ' + this.examType);
  }
  private onGetTempRemarkAndFiles() {
    const getTempImages: XrayTakenTempImageRequest = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      location: 'temp',
      examinationType: this.dentalChart,
      labelName: this.labelName,
    };
    this.preRequisiteRequirementService
      .getXrayTakenTempImages(getTempImages)
      .subscribe(
        (responseTempImges: XrayTakenTempImageResponse[]) => {
          console.log('response -=-=-=-=-=-====');
          console.log(responseTempImges);
          this.xrayTakenTempImages = responseTempImges;
          for (let i = 0; i < this.xrayTakenTempImages.length; i++) {
            const reader = new FileReader();
            var xhr = new XMLHttpRequest();
            xhr.open('GET', this.xrayTakenTempImages[i].imgLink, true);
            xhr.responseType = 'blob';
            xhr.onload = function (e) {
              if (this.status == 200) {
                reader.readAsDataURL(this.response);
                // myBlob is now the blob that the object URL pointed to.
              }
            };
            xhr.send();

            reader.onload = () => {
              if (this.pictures.length > 0) {
                this.pictures[this.pictures.length++] = reader.result as string;
              } else {
                this.pictures[0] = reader.result as string;
              }
            };

            if (this.nameHashTypes.length > 0) {
              this.nameHashTypes[this.nameHashTypes.length++] =
                this.xrayTakenTempImages[i].hashNameType;
            } else {
              this.nameHashTypes[0] = this.xrayTakenTempImages[i].hashNameType;
            }
          }
          if (this.xrayTakenTempImages.length > 0) {
            this.saveFiles = false;
          }
          console.log('pictures length = ' + this.pictures.length);
        },
        (error: any) => {
          console.log('error in getting temp images..');
          console.log(error);
        },
        () => console.log('Done getting profiles..')
      );
  }
  onFileChange(event: any) {
    console.log('file drop here..');
    this.files.push(...event.addedFiles);
    if (this.files.length > 0 && this.files.length < 15) {
      console.log('here inside temp save.');
      this.saveTempRemarkAndFiles();
    } else {
      this.alertService.error(
        'Image upload must not exceed 5 items',
        this.options
      );
      this.files = [];
    }
  }
  private saveTempRemarkAndFiles() {
    if (this.files.length > 0) {
      console.log('this.files.length = ' + this.files.length);
      console.log('this.files:' + JSON.stringify(this.files));
      console.log('this.userProfile:' + JSON.stringify(this.userProfile));
      console.log('this.dentalChart = ' + this.dentalChart);
      console.log('this.labelName = ' + this.labelName);
      console.log('this.id = ' + this.id);
      console.log('this.remarks = ' + this.remarks);

      for (let x = 0; x < this.files.length; x++) {
        console.log('this.files:' + JSON.stringify(this.files));
        const reader = new FileReader();
        const formData = new FormData();
        reader.readAsDataURL(this.files[x]);
        reader.onload = () => {
          formData.append('file', this.files[x]);
          formData.append('profileId', this.id);
          formData.append('createdByName', this.userProfile?.firstName || ''); // update later
          formData.append('createdById', this.userProfile?.id || ''); // update later
          formData.append('location', 'temp');
          formData.append('examinationType', this.dentalChart);
          formData.append('labelName', this.labelName);
          this.preRequisiteRequirementService
            .uploadTempXrayImages(formData)
            .subscribe(
              (response: HttpEvent<CustomHttpResponse>) => {
                switch (response.type) {
                  case HttpEventType.Sent:
                    console.log('Request has been made!');
                    break;
                  case HttpEventType.ResponseHeader:
                    console.log('Response header has been received!');
                    break;
                  case HttpEventType.UploadProgress:
                    var eventTotal = response.total ? response.total : 0;
                    this.uploadProgress = Math.round(
                      (response.loaded / eventTotal) * 100
                    );
                    console.log(`Uploaded! ${this.uploadProgress}%`);
                    break;
                  case HttpEventType.Response:
                    console.log('Image Upload Successfully!');
                    if (this.pictures.length > 0) {
                      this.pictures[this.pictures.length++] =
                        reader.result as string;
                    } else {
                      this.pictures[0] = reader.result as string;
                    }
                    console.log(response);
                    const messageSplit = response?.body?.message
                      ? response?.body?.message.split(':')
                      : [];
                    this.alertService.success(
                      '' + messageSplit[0],
                      this.options
                    );
                    if (this.nameHashTypes.length > 0) {
                      this.nameHashTypes[this.nameHashTypes.length++] =
                        messageSplit[1];
                    } else {
                      this.nameHashTypes[0] = messageSplit[1];
                    }
                    if (this.filesSaved.length > 0) {
                      console.log('file saved x =' + x);
                      this.filesSaved[this.filesSaved.length++] = this.files[x];
                    } else {
                      this.filesSaved[0] = this.files[0];
                    }

                    console.log(
                      'this.filesSaved.length === ' + this.filesSaved.length
                    );
                    setTimeout(() => {
                      this.uploadProgress = 0;
                      if (this.files.length == x + 1) {
                        console.log(
                          'this.filesSaved.length = ' + this.filesSaved.length
                        );
                        console.log('this.files.length ' + this.files.length);
                        this.saveFiles = false;
                        this.files = [];
                      }
                    }, 1500);
                }
              },
              (error: any) => {
                const errorResponse: CustomHttpResponse = error['error'];
                console.log('errorResponse.message = ' + errorResponse.message);
                if (error.status === 417) {
                  console.log('error.statusText = ' + error.statusText);
                  this.alertService.error(
                    'Wrong file format. Only accept .jpg / .png',
                    this.options
                  );
                }
              },
              () => console.log('Done uploading informed consent images..')
            );
        };
      }
    }
  }
  public onSaveFiles() {
    console.log('onSaveFiles called..');
    this.submitted = true;
    if (this.form.invalid) {
      console.log('form is invalid');
      this.alertService.error(
        'Please fill out the remarks correctly.',
        this.options
      );
      return;
    }
    this.remarks = this.form.value.remarks;
    console.log('remarks = ' + this.remarks);
    console.log('this.id = ' + this.id);
    console.log('this.dentalChart = ' + this.dentalChart);
    console.log('this.labelName = ' + this.labelName);
    console.log('this.userProfile = ' + JSON.stringify(this.userProfile));
    console.log('this.files.length = ' + this.files.length);
    console.log('this.pictures.length = ' + this.pictures.length);
    console.log('this.nameHashTypes.length = ' + this.nameHashTypes.length);
    console.log('this.filesSaved.length = ' + this.filesSaved.length);
    console.log(
      'this.xrayTakenTempImages.length = ' + this.xrayTakenTempImages.length
    );
    console.log('this.saveFiles = ' + this.saveFiles);
    console.log('this.pictures.length = ' + this.files.length);
    console.log(
      'this.xrayTakenTempImages.length = ' + this.xrayTakenTempImages.length
    );
    if (this.pictures.length > 0 || this.xrayTakenTempImages.length > 0) {
      console.log('here inside permanent save.');

      const updateDataToPermanent: XrayTakenPermanentDataRequest = {
        xrayTakenId: 0,
        profileId: this.id,
        updatedByName: this.userProfile?.firstName || '',
        updatedById: this.userProfile?.id || '',
        location: 'permanent',
        examinationType: this.dentalChart,
        labelName: this.labelName,
        remarks: this.form.value.remarks,
      };
      this.preRequisiteRequirementService
        .updateXrayTakenImageToPermanent(updateDataToPermanent)
        .subscribe(
          (response: CustomHttpResponse) => {
            console.log(response);
            if (response.httpStatus == 'OK') {
              this.options.autoClose = true;

              const messageSplit = response.message.split('-');

              this.alertService.success(messageSplit[0], this.options);
              this.pictures = [];
              this.files = [];
              this.form.reset();
              this.saveFiles = true;
              // this.router.navigate([
              //     `/dental-records/dental-chart/intraoral-examination/xray-taken/periapical/${this.id}/`,
              //     , 'Add'
              // ]);
              // this.onGetTableData();
              //this.router.navigate(['medical-history/patients']);
              // this.router.navigate(['patients-profile'], { state: { key: response.message } });
            }
          },
          (error: any) => {
            console.log('error in updating to permanent..');
            console.log(error);
            const errorResponse: CustomHttpResponse = error['error'];
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
          () => console.log('Done updating all files to permanent..')
        );
    }
  }
  public onRemove(event: any) {
    //remove also on db
    console.log(event);

    console.log(
      'name hash = ' + this.nameHashTypes[this.pictures.indexOf(event)]
    );
    console.log(this.nameHashTypes.indexOf(event));
    console.log(this.pictures.indexOf(event));
    console.log(this.files.indexOf(event));

    const removeTempImage: XrayTakenImageTempRemove = {
      profileId: this.id,
      createdByName: this.userProfile?.firstName || '',
      createdById: this.userProfile?.id || '',
      location: 'temp',
      examinationType: this.dentalChart,
      labelName: this.labelName,
      nameHashType: this.nameHashTypes[this.pictures.indexOf(event)],
    };

    this.preRequisiteRequirementService
      .deleteXrayTakenTempData(removeTempImage)
      .subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
          if (response.httpStatus == 'OK') {
            this.options.autoClose = true;
            this.alertService.success(response.message, this.options);
            // this.onGetTableData();
            //this.router.navigate(['medical-history/patients']);
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
        () => console.log('Done deletting single file..')
      );

    this.nameHashTypes.splice(this.pictures.indexOf(event), 1);
    this.pictures.splice(this.pictures.indexOf(event), 1);
    this.files.splice(this.pictures.indexOf(event), 1);
  }

  @HostListener('dragover', ['$event']) public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'lightgray';
    this.borderColor = 'cadetblue';
    this.borderStyle = '3px solid';
    this.height = '300px';
    this.minHeight = '300px';
    this.minWidth = '300px';
    this.maxHeight = '300px';
    this.maxWidth = '300px';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
    this.height = '300px';
    this.minHeight = '300px';
    this.minWidth = '300px';
    this.maxHeight = '300px';
    this.maxWidth = '300px';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
    let files = evt.dataTransfer.files;
    let valid_files: Array<File> = files;
    this.filesChangeEmiter.emit(valid_files);
    this.height = '300px';
    this.minHeight = '300px';
    this.minWidth = '300px';
    this.maxHeight = '300px';
    this.maxWidth = '300px';
  }
}
