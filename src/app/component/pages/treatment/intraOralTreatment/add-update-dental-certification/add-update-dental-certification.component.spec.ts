import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDentalCertificationComponent } from './add-update-dental-certification.component';

describe('AddUpdateDentalCertificationComponent', () => {
  let component: AddUpdateDentalCertificationComponent;
  let fixture: ComponentFixture<AddUpdateDentalCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateDentalCertificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateDentalCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
