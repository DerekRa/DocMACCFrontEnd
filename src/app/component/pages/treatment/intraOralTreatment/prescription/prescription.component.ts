import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionPaginationRequest } from 'src/app/model/interface/prescriptionModel/prescription-pagination-request';
import { PrescriptionResponse } from 'src/app/model/interface/prescriptionModel/prescription-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ExportPdfService } from 'src/app/service/clientProfile/export-pdf.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { PrescriptionService } from 'src/app/service/treatmentPlan/prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
})
export class PrescriptionComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.dateOfProcedure = this.route.snapshot.params['dateofProcedure'];
    this.onGetProfileModel();
    this.onGetTableData();
  }

  constructor(
    private profileModelService: ProfileModelService,
    private prescriptionService: PrescriptionService,
    private exportPdfService: ExportPdfService,
    private route: ActivatedRoute,
    private router: Router,
    public alertService: AlertService
  ) {}

  public id: any;
  public profileModel: ProfileModel | undefined;
  public prescriptionData: PrescriptionResponse[] = [];
  public prescriptionDataToRemove: PrescriptionResponse | undefined;
  public dateOfProcedure: string = '';
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public paginationTotalItems: number | any;
  public percentDone: number = 0;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;
  public options = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

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

  private onGetTableData() {
    const pageNo = this.pageNoDisplay - 1;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const prescriptionPaginationRequest: PrescriptionPaginationRequest = {
      profileId: this.id,
      dateOfProcedure: this.dateOfProcedure,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    const prescriptionPaginationRequestLength: PrescriptionPaginationRequest = {
      profileId: this.id,
      dateOfProcedure: this.dateOfProcedure,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
    };
    this.prescriptionService
      .getPrescriptionWithPagination(prescriptionPaginationRequest)
      .subscribe(
        (response: PrescriptionResponse[]) => {
          console.log('response');
          console.log(response);
          this.prescriptionData = response;
        },
        (error: any) => {
          this.prescriptionData = [];
        },
        () => console.log('Done getting profiles..')
      );

    this.prescriptionService
      .getPrescriptionWithPagination(prescriptionPaginationRequestLength)
      .subscribe(
        (response: PrescriptionResponse[]) => {
          console.log('response for paginationTotalItems');
          console.log(response);
          console.log(response.length);
          this.paginationTotalItems = response.length;
        },
        (error: any) => {
          this.prescriptionData = [];
        },
        () => console.log('Done getting prescription..')
      );

    console.log('paginationSize = ' + this.paginationSize);
    console.log('pageNoDisplay = ' + this.pageNoDisplay);
    console.log('paginationTotalItems = ' + this.paginationTotalItems);
  }
  public updateRemovePrescription(prescriptionToRemove: PrescriptionResponse) {
    this.prescriptionDataToRemove = prescriptionToRemove;
  }
  public removePrescription() {
    this.prescriptionService
      .deletePrescription(this.id, this.prescriptionDataToRemove?.id || 0)
      .subscribe(
        (response) => {
          console.log('response on delete');
          console.log(response);
          if (response.httpStatus == 'OK') {
            this.onGetTableData();
            this.alertService.success(response.message, this.options);
          }
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Done deleting prescription..')
      );
  }
  public printPDFPrescription() {
    this.exportPdfService
      .getExportPDFPrescription(this.id, this.dateOfProcedure)
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
              'Prescription' +
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
  public onChangeShowPage(event: any) {
    this.paginationSize = event.target.value;
    this.onGetTableData();
  }
  public onChangeSearchAll(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'searchAllColumns';
    this.onGetTableData();
  }
  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'BrandName') {
      this.sortBy = 'BrandName';
    } else if (event.target.innerText.replace(/\s/g, '') == 'GenericName') {
      this.sortBy = 'GenericName';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Disp.') {
      this.sortBy = 'Dispense';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Dosage') {
      this.sortBy = 'Dosage';
    } else if (event.target.innerText.replace(/\s/g, '') == 'Remarks') {
      this.sortBy = 'Remarks';
    }
    this.onGetTableData();
  }
  public onChangeBrandName(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'BrandName';
    this.onGetTableData();
  }
  public onChangeGenericName(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'GenericName';
    this.onGetTableData();
  }
  public onChangeDispense(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'Dispense';
    this.onGetTableData();
  }
  public onChangeDosage(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'Dosage';
    this.onGetTableData();
  }
  public onChangeRemarks(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'Remarks';
    this.onGetTableData();
  }

  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
}
