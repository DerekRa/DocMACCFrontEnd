import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientProfileComponent } from './update-patient-profile.component';

describe('UpdatePatientProfileComponent', () => {
  let component: UpdatePatientProfileComponent;
  let fixture: ComponentFixture<UpdatePatientProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePatientProfileComponent]
    });
    fixture = TestBed.createComponent(UpdatePatientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
