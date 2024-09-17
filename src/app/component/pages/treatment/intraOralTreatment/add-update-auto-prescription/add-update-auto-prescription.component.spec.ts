import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAutoPrescriptionComponent } from './add-update-auto-prescription.component';

describe('AddUpdateAutoPrescriptionComponent', () => {
  let component: AddUpdateAutoPrescriptionComponent;
  let fixture: ComponentFixture<AddUpdateAutoPrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateAutoPrescriptionComponent]
    });
    fixture = TestBed.createComponent(AddUpdateAutoPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
