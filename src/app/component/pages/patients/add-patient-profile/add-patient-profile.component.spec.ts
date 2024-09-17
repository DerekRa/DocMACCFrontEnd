import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientProfileComponent } from './add-patient-profile.component';

describe('AddPatientProfileComponent', () => {
  let component: AddPatientProfileComponent;
  let fixture: ComponentFixture<AddPatientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPatientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
