import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageDetails } from 'src/app/model/interface/preProcedureModel/image-details';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { PreProcedureRequirementService } from 'src/app/service/medicalHistory/pre-procedure-requirement.service';

@Component({
  selector: 'app-informed-consents',
  templateUrl: './informed-consents.component.html',
  styleUrls: ['./informed-consents.component.scss'],
})
export class InformedConsentsComponent implements OnInit {
  public id: any;
  public item_name: any;
  public breadcrumb_title: any;
  public imgName: any;
  public imgLink: any;
  public hashName: any;
  public imgNameDelete: any;
  public imgNameOriginal: any;
  public urlLocation: string = 'medical';
  // public item_name: string = 'informedConsents';
  public location: string = 'permanent';
  public page: number = 1;
  public paginationSize: number = 10;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public paginationTotalItems: number | any;
  public orderByAscDesc: boolean = false;

  public imageDetails: ImageDetails[] | any;
  public profileModel: ProfileModel | any;

  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

  constructor(
    private preProcedureRequirementService: PreProcedureRequirementService,
    private profileModelService: ProfileModelService,
    private router: Router,
    private route: ActivatedRoute,
    public alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.item_name = this.route.snapshot.params['itemName'];
    this.breadcrumb_title =
      this.item_name == 'informedConsents'
        ? 'Informed Consents'
        : 'Medical Clearance';
    this.onGetTableData();
    this.onGetProfileModel(this.id);
  }

  private onGetTableData() {
    const urlPathName = window.location.pathname;
    // console.log('urlPathName = ' + urlPathName);
    this.urlLocation = urlPathName;
    const pageNo = this.page - 1;
    const pageSize = this.paginationSize;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const sortBy = this.sortBy;
    const orderBy = this.orderBy;
    const profileId = this.id;

    this.preProcedureRequirementService
      .getPreProcedureRequirementPerPage(
        this.item_name,
        this.location,
        profileId,
        pageNo,
        pageSize,
        sortBy,
        orderBy,
        itemSearch
      )
      .subscribe(
        (response: ImageDetails[]) => {
          this.imageDetails = response;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );
    this.preProcedureRequirementService
      .getPreProcedureRequirementPerPage(
        this.item_name,
        this.location,
        profileId,
        0,
        10000,
        sortBy,
        orderBy,
        itemSearch
      )
      .subscribe(
        (response: ImageDetails[]) => {
          this.paginationTotalItems = response.length;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );
  }
  private onGetProfileModel(id: number): void {
    this.profileModelService.getProfileModel(id).subscribe(
      (response) => {
        this.profileModel = response;
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('Done getting single profile..')
    );
  }
  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'Name') {
      this.sortBy = 'originalName';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Date') {
      this.sortBy = 'createdAt';
    }
    this.onGetTableData();
  }
  public onChangeOriginalName(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'originalName';
    this.onGetTableData();
  }
  public onChangeCreatedDate(event: any) {
    console.log('date was changed..');
    this.itemNameSearch = event.target.value;
    console.log('date:' + this.itemNameSearch);
    this.sortBy = 'createdDate';
    this.onGetTableData();
  }
  public onChangeShowPage(event: any) {
    this.paginationSize = event.target.value;
    this.onGetTableData();
  }
  public handlePageChange(event: any) {
    this.page = event;
    this.onGetTableData();
  }
  public updateDeleteItem(hashNameType: string, originalName: string) {
    this.imgNameDelete = hashNameType;
    this.imgNameOriginal = originalName;
    console.log('hashname: deleted :' + this.imgNameDelete);
    console.log('imgNameOriginal: ' + this.imgNameOriginal);
  }
  public deletePreProcedureRequirement() {
    this.preProcedureRequirementService
      .deletePreProcedureRequirement(
        'informedConsents',
        'permanent',
        this.imgNameDelete
      )
      .subscribe(
        (response: CustomHttpResponse) => {
          console.log(response);
          if (response.httpStatus == 'OK') {
            this.options.autoClose = true;
            this.alertService.success(response.message, this.options);
            this.onGetTableData();
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
    console.log('hashname: deleted :' + this.imgNameDelete);
    console.log('imgNameOriginal: ' + this.imgNameOriginal);
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
  public updateDisplay(hashName: string) {
    console.log('hashName :' + hashName);
    const formData = new FormData();
    formData.append('hashName', hashName);
    formData.append('itemName', this.item_name);
    formData.append('location', 'permanent');
    formData.append('updatedBy', this.id);
    this.preProcedureRequirementService.updateDisplayImage(formData).subscribe(
      (response: CustomHttpResponse) => {
        console.log(response);
        if (response.httpStatus == 'OK') {
          this.alertService.success(response.message, this.options);
        }
      },
      (error: any) => {
        console.log(error);
        const errorResponse: CustomHttpResponse = error['error'];
        if (errorResponse.httpStatus == 'BAD_REQUEST') {
          this.alertService.error(errorResponse.message, this.options);
        }
      },
      () => console.log('Done updating single image..')
    );
  }
}
