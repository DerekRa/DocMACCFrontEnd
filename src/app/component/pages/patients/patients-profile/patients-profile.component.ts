import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Name } from 'src/app/model/interface/profileModel/name';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { ProfileModelList } from 'src/app/model/interface/profileModel/profile-model-list';
import { ActiveProfiles } from 'src/app/model/interface/shared/active-profiles';
import { OrthodonticBillService } from 'src/app/service/billRecord/orthodontic-bill.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';
import { IntraoralExaminationService } from 'src/app/service/dentalRecord/intraoral-examination.service';
import { OrthodonticExaminationService } from 'src/app/service/dentalRecord/orthodontic-examination.service';
import { MedicalHistoryService } from 'src/app/service/medicalHistory/medical-history.service';

@Component({
  selector: 'app-patients-profile',
  templateUrl: './patients-profile.component.html',
  styleUrls: ['./patients-profile.component.scss'],
})
export class PatientsProfileComponent implements OnInit {
  private profileModel: ProfileModel = {
    imgLink: 'assets/images/img2x2.png',
    name: {
      firstName: 'Panda',
      lastName: 'Gabriel',
      middleName: 'Lowkey',
      nickName: 'Durant',
    },
    sex: 'MALE',
    birthday: '1994-02-01',
    religion: 'Roman Catholic',
    nationality: 'Filipino',
    occupation: 'Script Writer',
    contactDetail: {
      contactNumber: {
        homeNumber: 'na',
        officeNumber: 'na',
        cellNumber: '096171235209',
        faxNumber: 'na',
      },
      emailAddress: 'testEmail@test.com',
      homeAddress:
        '#777 landas  street sample address on buenlag pangasinan 2342',
    },
    dentalInsurance: 'n/a',
    firstDentalVisit: '2020-12-04',
    createdByName: 'kezer',
    createdById: 'test12344',
  };

  private profileModelUpdate: ProfileModel = {
    id: 12,
    imgLink: 'assets/images/img2x2.png',
    name: {
      id: 12,
      firstName: 'Laurenz',
      lastName: 'Lacson',
      middleName: 'Pingson',
      nickName: 'Jigsawer',
    },
    sex: 'MALE',
    birthday: '1994-02-01',
    religion: 'Mormons',
    nationality: 'Filipino',
    occupation: 'Cleaner',
    dentalInsurance: 'n/a',
    firstDentalVisit: '2022-12-04',
    minor: {
      id: 12,
      parentsGuardian: 'Louisa Bangs',
      parentsGuardianOccupation: 'Baby Sitter',
      referralName: 'San Pedro',
      reasonDentalConsultation: 'Ouchy Teeth',
    },
    createdByName: 'kezer',
    createdById: 'test12344',
    status: 'Not',
    contactDetail: {
      id: 12,
      contactNumber: {
        id: 12,
        homeNumber: 'naa',
        officeNumber: 'naa',
        cellNumber: '096171182939',
        faxNumber: 'na',
      },
      emailAddress: 'tesskkiul@test.com',
      homeAddress:
        '#744 landas street purok 123 sample address on Buenlag Imbutido Caloocan San Fabian Pangasinan 2342 Philippines',
    },
  };
  public paginationNumOne: number | any;
  public paginationNumTwo: number | any;
  public paginationNumThree: number | any;
  public paginationTotalNum: number | any;
  public paginationTotalNumRound: number | any;
  public paginationTotalItems: number | any;
  public previousLinkDisable: boolean = true;
  public nextLinkDisable: boolean = true;
  public paginationDotdot: boolean = false;
  public paginationTotal: boolean = false;
  public orderByAscDesc: boolean = false;
  public paginationCurrentPage: number | any;
  public paginationSize: number = 10;
  public page: number = 1;
  public count: number = 10;
  public pageSize: number = 6;
  public itemNameSearch: string = '**';
  public sortBy: string = 'lastName';
  public orderBy: string = 'DESC';
  public urlLocation: string = 'patients';
  public medicalHistoryCollection: any[] = [];
  public intraOralCollection: any[] = [];
  public orthodonticExamCollection: any[] = [];
  public orthodonticBillCollection: any[] = [];

  public profileModelList: ProfileModelList | any;
  public nameListLength: Name[] | any;
  public nameList: Name[] | any;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(
    private profileModelService: ProfileModelService,
    private medicalHistoryService: MedicalHistoryService,
    private intraoralExaminationService: IntraoralExaminationService,
    private orthodonticExaminationService: OrthodonticExaminationService,
    private orthodonticBillService: OrthodonticBillService,
    private router: Router,
    private readonly keycloak: KeycloakService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    this.onGetTableData();
  }

  private onGetTableData() {
    const urlPathName = window.location.pathname;
    this.urlLocation = urlPathName;
    const pageNo = this.page - 1;
    const pageSize = this.paginationSize;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const sortBy = this.sortBy;
    const orderBy = this.orderBy;
    this.medicalHistoryService
      .getActivePatients()
      .subscribe((response: any) => {
        for (const key of response) {
          this.medicalHistoryCollection.push(key.profileId);
        }
      });
    this.intraoralExaminationService
      .getActivePatients()
      .subscribe((response: ActiveProfiles[]) => {
        for (const key of response) {
          this.intraOralCollection.push(key.profileId);
        }
      });
    this.orthodonticExaminationService
      .getActivePatients()
      .subscribe((response: ActiveProfiles[]) => {
        for (const key of response) {
          this.orthodonticExamCollection.push(key.profileId);
        }
      });
    this.orthodonticBillService
      .getPatientsWithRecords()
      .subscribe((response: number[]) => {
        for (const key of response) {
          this.orthodonticBillCollection.push(key);
        }
      });

    this.profileModelService
      .getFullNameListPerPage(pageNo, pageSize, sortBy, orderBy, itemSearch)
      .subscribe((response: any) => {
        this.nameList = response.body;
        this.nameListLength = response.body;
      });
    this.profileModelService
      .getFullNameListPerPage(0, 10000, sortBy, orderBy, itemSearch)
      .subscribe((response: any) => {
        this.paginationTotalItems = response.body.length;
      });
  }

  public onSortPage(event: any) {
    this.orderByAscDesc = this.orderByAscDesc ? false : true;
    this.orderBy = this.orderByAscDesc ? 'ASC' : 'DESC';
    if (event.target.innerText.replace(/\s/g, '') == 'FirstName') {
      this.sortBy = 'firstName';
    } else if (event.target.innerText.replace(/\s/g, '') == 'LastName') {
      this.sortBy = 'lastName';
    } else if (event.target.innerText.replace(/\s/g, '') == 'MiddleName') {
      this.sortBy = 'middleName';
    }
    this.onGetTableData();
  }

  public handlePageChange(event: any) {
    this.page = event;
    this.onGetTableData();
  }

  public onChangeLastName(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'lastName';
    this.onGetTableData();
  }
  public onChangeFirstName(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'firstName';
    this.onGetTableData();
  }
  public onChangeMiddleName(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'middleName';
    this.onGetTableData();
  }
  public onChangeSearchName(event: any) {
    this.itemNameSearch = event.target.value;
    this.sortBy = 'searchAllNames';
    this.onGetTableData();
  }

  public onChangeShowPage(event: any) {
    this.paginationSize = event.target.value;
    this.onGetTableData();
  }
  // Patient Profile
  public viewPatientProfile(id: any) {
    this.router.navigate(['patient-profile', id]);
  }
  // Medical History
  public viewMedicalHistory(id: any) {
    this.router.navigate(['medical-history/patient', id]);
  }

  public addMedicalHistory(id: any) {
    this.router.navigate(['medical-history/add-patient', id]);
  }
  // Intraoral Examination
  public viewIntralOralExam(id: any) {
    this.router.navigate([
      'dental-records/dental-chart/intraoral-examination/view-record',
      id,
    ]);
  }

  public addIntralOralExam(id: any) {
    this.router.navigate([
      'dental-records/dental-chart/intraoral-examination/add-record',
      id,
    ]);
  }
  // Orthodontic Examination
  public viewOrthodonticExam(id: any) {
    this.router.navigate([
      'dental-records/dental-chart/orthodontic-examination/view-record',
      id,
    ]);
  }

  public addOrthodonticExam(id: any) {
    this.router.navigate([
      'dental-records/dental-chart/orthodontic-examination/add-record',
      id,
    ]);
  }
  // Treatment Plan
  public viewIntraOralTreatment(id: any) {
    this.router.navigate(['dental-records/treatment-plan/intraoral', id]);
  }

  public viewOrthodonticTreatment(id: any) {
    this.router.navigate(['dental-records/treatment-plan/orthodontic', id]);
  }
  // Intraoral Bill
  public viewIntraOralBill(id: any) {
    this.router.navigate(['bill-records/intraoral/patients', id]);
  }
  // Orthodontic Bill
  public addOrthodonticBill(id: any) {
    this.router.navigate([
      'bill-records/orthodontic/patients/' + id + '/add-record',
    ]);
  }

  public viewOrthodonticBill(id: any) {
    this.router.navigate(['bill-records/orthodontic/patients', id]);
  }

  public onGetProfileModels(): void {
    this.profileModelService.getProfileModelList().subscribe((response) => {
      // location.reload();
      this.profileModelList = response;
      // console.table(response);
    });
  }
}
