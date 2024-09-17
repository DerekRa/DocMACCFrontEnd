import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Name } from 'src/app/model/interface/profileModel/name';
import { ProfileModel } from 'src/app/model/interface/profileModel/profile-model';
import { ProfileModelList } from 'src/app/model/interface/profileModel/profile-model-list';
import { ActiveProfiles } from 'src/app/model/interface/shared/active-profiles';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
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
    createdBy: 'kenzer',
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
    createdBy: 'kenzer',
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
  public orthodonticCollection: any[] = [];

  public profileModelList: ProfileModelList | any;
  public nameListLength: Name[] | any;
  public nameList: Name[] | any;

  constructor(
    private profileModelService: ProfileModelService,
    private medicalHistoryService: MedicalHistoryService,
    private intraoralExaminationService: IntraoralExaminationService,
    private orthodonticExaminationService: OrthodonticExaminationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.onPostProfileModel();
    // this.onPutProfileModel();
    // this.onDeleteProfileModel();
    // const value = this.route.paramMap.pipe(map((params: ParamMap) => params.get('state')));
    // console.log('value == ' + value);
    // console.log('value getCurrentNavigation == ' + this.router.getCurrentNavigation()?.extras.state);
    // console.log('value history == ' + history.state);

    // console.log(JSON.stringify(history.state['key']));
    // console.log(JSON.stringify(value));
    // this.onGetProfileModels();
    // this.onGetPagination();
    this.onGetTableData();
    // this.onGetProfileModel();
  }

  private onGetTableData() {
    const urlPathName = window.location.pathname;
    console.log('urlPathName = ' + urlPathName);
    this.urlLocation = urlPathName;
    const pageNo = this.page - 1;
    const pageSize = this.paginationSize;
    const itemSearch = this.itemNameSearch == '' ? '**' : this.itemNameSearch;
    const sortBy = this.sortBy;
    const orderBy = this.orderBy;
    this.medicalHistoryService.getActivePatients().subscribe(
      (response: any) => {
        for (const key of response) {
          this.medicalHistoryCollection.push(key.profileId);
        }
      },
      (error: any) => console.log(error),
      () => console.log('Done getting medical history with records..')
    );
    this.intraoralExaminationService.getActivePatients().subscribe(
      (response: ActiveProfiles[]) => {
        for (const key of response) {
          this.intraOralCollection.push(key.profileId);
        }
      },
      (error: any) => console.log(error),
      () => console.log('Done getting intral oral with records..')
    );
    this.orthodonticExaminationService.getActivePatients().subscribe(
      (response: ActiveProfiles[]) => {
        for (const key of response) {
          this.orthodonticCollection.push(key.profileId);
        }
      },
      (error: any) => console.log(error),
      () => console.log('Done getting orthodontic with records..')
    );

    this.profileModelService
      .getFullNameListPerPage(pageNo, pageSize, sortBy, orderBy, itemSearch)
      .subscribe(
        (response: any) => {
          console.log('response');
          console.log(response);
          console.log('-----=-=-=-=----');
          this.nameList = response.body;
          console.log(this.nameList);
          this.nameListLength = response.body;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );
    this.profileModelService
      .getFullNameListPerPage(0, 10000, sortBy, orderBy, itemSearch)
      .subscribe(
        (response: any) => {
          console.log('response');
          console.log(response);
          console.log('-----=-=-=-=----');
          this.paginationTotalItems = response.body.length;
        },
        (error: any) => console.log(error),
        () => console.log('Done getting profiles..')
      );
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

  public viewPatientProfile(id: any) {
    console.log(id);
    this.router.navigate(['patient-profile', id]);
  }

  public viewMedicalHistory(id: any) {
    console.log(id);
    this.router.navigate(['medical-history/patient', id]);
  }

  public addMedicalHistory(id: any) {
    console.log(id);
    this.router.navigate(['medical-history/add-patient', id]);
  }
  public viewIntralOralExam(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/intraoral-examination/view-record',
      id,
    ]);
  }
  public addIntralOralExam(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/intraoral-examination/add-record',
      id,
    ]);
  }
  public viewOrthodonticExam(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/orthodontic-examination/view-record',
      id,
    ]);
  }
  public addOrthodonticExam(id: any) {
    console.log(id);
    this.router.navigate([
      'dental-records/dental-chart/orthodontic-examination/add-record',
      id,
    ]);
  }
  public viewIntraOralTreatment(id: any) {
    console.log(id);
    this.router.navigate(['dental-records/treatment-plan/intraoral', id]);
  }
  public viewOrthodonticTreatment(id: any) {
    console.log(id);
    this.router.navigate(['dental-records/treatment-plan/orthodontic', id]);
  }

  public onGetProfileModels(): void {
    this.profileModelService.getProfileModelList().subscribe(
      (response) => {
        // location.reload();
        this.profileModelList = response;
        // console.table(response);
      },
      (error: any) => console.log(error),
      () => console.log('Done getting profiles..')
    );
  }

  public onPostProfileModel(): void {
    this.profileModelService.createProfileModel(this.profileModel).subscribe(
      (response: CustomHttpResponse) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done create single profile..')
    );
  }

  public onPutProfileModel(): void {
    this.profileModelService
      .updateProfileModel(this.profileModelUpdate)
      .subscribe(
        (response: CustomHttpResponse) => console.log(response),
        (error: CustomHttpResponse) => console.log(error),
        () => console.log('Done updating single profile..')
      );
  }

  // public onDeleteProfileModel(): void {
  //     this.profileModelService.deleteProfileModel(6).subscribe(
  //         (response: CustomHttpResponse) => console.log(response),
  //         (error: CustomHttpResponse) => console.log(error),
  //         () => console.log('Done deleting single profile..')
  //     );
  // }
}
