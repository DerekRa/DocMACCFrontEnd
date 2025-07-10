import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAdditionalChargeComponent } from './add-update-additional-charge.component';

describe('AddUpdateAdditionalChargeComponent', () => {
  let component: AddUpdateAdditionalChargeComponent;
  let fixture: ComponentFixture<AddUpdateAdditionalChargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateAdditionalChargeComponent]
    });
    fixture = TestBed.createComponent(AddUpdateAdditionalChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
