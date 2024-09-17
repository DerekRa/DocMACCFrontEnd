import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientPaginationRequest } from 'src/app/model/interface/appointmentModel/patient-pagination-request';
import { RegularAppointmentLatestResponse } from 'src/app/model/interface/appointmentModel/regular-appointment-latest-response';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { PatientAppointmentService } from 'src/app/service/home/patient-appointment.service';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.scss'],
})
export class AppointmentHistoryComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onGetProfileModel();
    this.onGetTableData();
  }

  constructor(
    private patientAppointmentService: PatientAppointmentService,
    private profileModelService: ProfileModelService,
    private route: ActivatedRoute
  ) {}

  public id: any;
  public profileModel: ProfileModel | undefined;
  public pageNoDisplay: number = 1;
  public paginationSize: number = 10;
  public paginationTotalItems: number | any;
  public itemNameSearch: string = '**';
  public sortBy: string = 'searchAllColumns';
  public orderBy: string = 'DESC';
  public orderByAscDesc: boolean = false;
  public regularAppointmentData: RegularAppointmentLatestResponse[] = [];

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
    const patientPaginationRequest: PatientPaginationRequest = {
      profileId: this.id,
      pageNo: pageNo,
      pageSize: this.paginationSize,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
      category: 'registered',
    };
    const patientPaginationRequestLength: PatientPaginationRequest = {
      profileId: this.id,
      pageNo: 0,
      pageSize: 10000,
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      findItem: itemSearch,
      category: 'registered',
    };
    this.patientAppointmentService
      .getRegularAppointmentHistory(patientPaginationRequest)
      .subscribe(
        (response: RegularAppointmentLatestResponse[]) => {
          console.log('response');
          console.log(response);
          this.regularAppointmentData = response;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );

    this.patientAppointmentService
      .getRegularAppointmentHistory(patientPaginationRequestLength)
      .subscribe(
        (response: RegularAppointmentLatestResponse[]) => {
          console.log('response for paginationTotalItems');
          console.log(response);
          console.log(response.length);
          this.paginationTotalItems = response.length;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );

    console.log('paginationSize = ' + this.paginationSize);
    console.log('pageNoDisplay = ' + this.pageNoDisplay);
    console.log('paginationTotalItems = ' + this.paginationTotalItems);
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
    if (event.target.innerText.replace(/\s/g, '') == 'ServiceAvailed') {
      this.sortBy = 'serviceToAvail';
    } else if (
      event.target.innerText.replace(/\s/g, '') == 'DateOfAppointment'
    ) {
      this.sortBy = 'rangeDateTimeTo';
    } else if (event.target.innerText.replace(/\s/g, '') == 'ServiceTitle') {
      this.sortBy = 'eventTitle';
    } else if (event.target.innerText.replace(/\s/g, '') == 'DateCreated') {
      this.sortBy = 'createdDate';
    } else if (event.target.innerText.replace(/\s/g, '') == 'In-Charge') {
      this.sortBy = 'createdByName';
    }
    this.onGetTableData();
  }
  public onChangeDateOfAppointment(event: any) {
    console.log('date was changed..');
    this.itemNameSearch = event.target.value;
    console.log('date:' + this.itemNameSearch);
    this.sortBy = 'rangeDateTimeFrom';
    this.onGetTableData();
  }
  public onChangeDateCreated(event: any) {
    console.log('date was changed..');
    this.itemNameSearch = event.target.value;
    console.log('date:' + this.itemNameSearch);
    this.sortBy = 'createdDate';
    this.onGetTableData();
  }
  public onChangeServiceAvailed(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'serviceToAvail';
    this.onGetTableData();
  }
  public onChangeServiceTitle(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'eventTitle';
    this.onGetTableData();
  }
  public onChangeInCharge(event: any) {
    this.itemNameSearch = event.target.value;
    console.log('itemNameSearch');
    console.log(this.itemNameSearch);
    this.sortBy = 'createdByName';
    this.onGetTableData();
  }
  public handlePageChange(event: any) {
    this.pageNoDisplay = event;
    this.onGetTableData();
  }
}
