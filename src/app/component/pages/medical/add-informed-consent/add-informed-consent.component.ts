import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { PreProcedureRequirementService } from 'src/app/service/medicalHistory/pre-procedure-requirement.service';

@Component({
  selector: 'app-add-informed-consent',
  templateUrl: './add-informed-consent.component.html',
  styleUrls: ['./add-informed-consent.component.scss'],
})
export class AddInformedConsentComponent implements OnInit {
  public id: any;
  public item_name: any;
  public breadcrumb_title: any;
  public picture: string = 'assets/images/img2x2.png';
  public pictures: string[] = [];
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  files: File[] = [];
  uploadProgress: number = 0;
  saveFiles = true;
  hashNames: string[] = [];
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  @Output() private filesChangeEmiter: EventEmitter<File[]> =
    new EventEmitter();

  @HostBinding('style.background') private background = '#eee';
  @HostBinding('style.border') private borderStyle = '2px dashed';
  @HostBinding('style.border-color') private borderColor = '#696D7D';
  @HostBinding('style.border-radius') private borderRadius = '5px';
  @HostBinding('style.height') private height = '500px';
  @HostBinding('style.min-height') private minHeight = '500px';
  @HostBinding('style.max-height') private maxHeight = '500px';
  @HostBinding('style.min-width') private minWidth = '500px';
  @HostBinding('style.max-width') private maxWidth = '500px';

  constructor(
    private readonly keycloak: KeycloakService,
    private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService,
    private preProcedureRequirementService: PreProcedureRequirementService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    this.item_name = this.route.snapshot.params['itemName'];
    this.breadcrumb_title =
      this.item_name == 'informedConsents'
        ? 'Informed Consents'
        : 'Medical Clearance';

    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  @HostListener('dragover', ['$event']) public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = 'lightgray';
    this.borderColor = 'cadetblue';
    this.borderStyle = '3px solid';
    this.height = '400px';
    this.minHeight = '400px';
    this.minWidth = '400px';
    this.maxHeight = '400px';
    this.maxWidth = '400px';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    this.borderColor = '#696D7D';
    this.borderStyle = '2px dashed';
    this.height = '400px';
    this.minHeight = '400px';
    this.minWidth = '400px';
    this.maxHeight = '400px';
    this.maxWidth = '400px';
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
    this.height = '400px';
    this.minHeight = '400px';
    this.minWidth = '400px';
    this.maxHeight = '400px';
    this.maxWidth = '400px';
  }

  onFileChange(event: any) {
    this.files.push(...event.addedFiles);
    if (this.files.length > 0 && this.files.length < 6) {
      this.loopFiles('temp');
    } else {
      this.alertService.error(
        'Image upload must not exceed 5 items',
        this.options,
      );
      this.files = [];
    }
  }

  onRemove(event: any) {
    this.pictures.splice(this.pictures.indexOf(event), 1);
    this.files.splice(this.pictures.indexOf(event), 1);
  }

  onSaveFiles() {
    if (this.files.length > 0) {
      this.saveMultipleFiles('permanent');
    }
  }

  private loopFiles(location: string) {
    for (let x = 0; x < this.files.length; x++) {
      const reader = new FileReader();
      const formData = new FormData();
      reader.readAsDataURL(this.files[x]);
      reader.onload = () => {
        formData.append('file', this.files[x]);
        formData.append('itemName', this.item_name);
        formData.append('location', location);
        formData.append('profileId', this.id);
        formData.append('createdByName', this.userProfile?.firstName || '');
        formData.append('createdById', this.userProfile?.id || '');

        this.preProcedureRequirementService.uploadImages(formData).subscribe(
          (response: HttpEvent<CustomHttpResponse>) => {
            switch (response.type) {
              case HttpEventType.Sent:
                // Request has been made!
                break;
              case HttpEventType.UploadProgress:
                var eventTotal = response.total ? response.total : 0;
                this.uploadProgress = Math.round(
                  (response.loaded / eventTotal) * 100,
                );
                // Uploaded! ${this.uploadProgress}%
                break;
              case HttpEventType.ResponseHeader:
                // Response header has been received!
                break;
              case HttpEventType.DownloadProgress:
                // Download progress has been received!
                break;
              case HttpEventType.Response:
                // Response has been received!
                this.pictures[x] = reader.result as string;
                const messageSplit = response?.body?.message
                  ? response?.body?.message.split(':')
                  : [];
                this.alertService.success('' + messageSplit[0], this.options);
                this.hashNames.push(messageSplit[1]);
                setTimeout(() => {
                  this.uploadProgress = 0;
                  if (location == 'permanent' && this.files.length == x + 1) {
                    this.pictures = [];
                    this.files = [];
                    this.router.navigate([
                      `/medical-history/patient/preProcedure/${this.item_name}`,
                      this.id,
                    ]);
                  }
                  if (location == 'temp' && this.files.length == x + 1) {
                    this.saveFiles = false;
                  }
                }, 1500);
            }
          },
          (error: any) => {
            const errorResponse: CustomHttpResponse = error['error'];
            if (errorResponse.httpStatus == 'BAD_REQUEST') {
              this.alertService.error(errorResponse.message, this.options);
            }
          },
        );
      };
      let loopLength = x + 1;
      if (location == 'permanent' && this.files.length == loopLength) {
        // this.pictures = [];
        // this.files = [];
      }
    }
  }

  private saveMultipleFiles(location: string) {
    if (this.hashNames.length > 0) {
      for (let x = 0; x < this.hashNames.length; x++) {
        const formData = new FormData();
        formData.append('hashNameType', this.hashNames[x]);
        formData.append('itemName', this.item_name);
        formData.append('location', 'permanent');
        formData.append('profileId', this.id);
        formData.append('updatedByName', this.userProfile?.firstName || '');
        formData.append('updatedById', this.userProfile?.id || '');
        this.preProcedureRequirementService.updateImages(formData).subscribe(
          (response: CustomHttpResponse) => {
            if (response.httpStatus == 'OK') {
              this.alertService.success(response.message, this.options);
              if (this.hashNames.length == x + 1) {
                this.router.navigate([
                  `/medical-history/patient/preProcedure/${this.item_name}/`,
                  this.id,
                ]);
              }
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
}
