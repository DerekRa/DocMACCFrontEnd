import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePrescriptionComponent } from './add-update-prescription.component';

describe('AddUpdatePrescriptionComponent', () => {
  let component: AddUpdatePrescriptionComponent;
  let fixture: ComponentFixture<AddUpdatePrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdatePrescriptionComponent]
    });
    fixture = TestBed.createComponent(AddUpdatePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
