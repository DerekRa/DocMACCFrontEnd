import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Physician } from 'src/app/model/interface/medicalHistoryModel/physician';
import { PhysicianHistoryService } from 'src/app/service/dentalRecord/physician-history.service';

@Component({
  selector: 'app-physicians',
  templateUrl: './physicians.component.html',
  styleUrls: ['./physicians.component.scss'],
})
export class PhysiciansComponent implements OnInit {
  public id: any;
  public paginationSize: number = 10;
  public page: number = 1;
  public itemNameSearch: string = '**';
  public sortBy: string = 'fullName';
  public orderBy: string = 'DESC';
  public paginationTotalItems: number | any;
  public orderByAscDesc: boolean = false;

  public urlLocation: string = 'medical';

  public physicianList: Physician[] | any;
  public physicianListLength: Physician[] | any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.onGetTableData();
  }

  constructor(
    private physicianHistoryService: PhysicianHistoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

    this.physicianHistoryService
      .getPhysiciansPerPage(
        profileId,
        pageNo,
        pageSize,
        sortBy,
        orderBy,
        itemSearch
      )
      .subscribe(
        (response: Physician[]) => {
          this.physicianList = response;
          this.physicianListLength = response;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );
    this.physicianHistoryService
      .getPhysiciansPerPage(profileId, 0, 10000, sortBy, orderBy, itemSearch)
      .subscribe(
        (response: Physician[]) => {
          this.paginationTotalItems = response.length;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );
  }
  public onChangeShowPage(event: any) {
    this.paginationSize = event.target.value;
    this.onGetTableData();
  }
  public onChangeSearchName(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'searchAllColumns';
    this.onGetTableData();
  }
  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'PhysicianName') {
      this.sortBy = 'physicianName';
    } else if (
      event.target.innerText.replace(/\s/g, '') == 'PhysicianOfficeAddress'
    ) {
      this.sortBy = 'physicianOfficeAddress';
    } else if (
      event.target.innerText.replace(/\s/g, '') == 'PhysicianOfficeNumber'
    ) {
      this.sortBy = 'physicianOfficeNumber';
    } else if (
      event.target.innerText.replace(/\s/g, '') == 'PhysicianSpecialty'
    ) {
      this.sortBy = 'physicianSpecialty';
    }
    this.onGetTableData();
  }
  public onChangePhysicianName(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'fullName';
    this.onGetTableData();
  }
  public onChangePhysicianOfficeAddress(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'officeAddress';
    this.onGetTableData();
  }
  public onChangePhysicianOfficeNumber(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'officeNumber';
    this.onGetTableData();
  }
  public onChangePhysicianSpecialty(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'specialty';
    this.onGetTableData();
  }
  public handlePageChange(event: any) {
    this.page = event;
    this.onGetTableData();
  }
}
