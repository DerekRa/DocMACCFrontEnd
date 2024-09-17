import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTreatmentPrescriptionComponent } from './add-update-treatment-prescription.component';

describe('AddUpdateTreatmentPrescriptionComponent', () => {
  let component: AddUpdateTreatmentPrescriptionComponent;
  let fixture: ComponentFixture<AddUpdateTreatmentPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateTreatmentPrescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateTreatmentPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
