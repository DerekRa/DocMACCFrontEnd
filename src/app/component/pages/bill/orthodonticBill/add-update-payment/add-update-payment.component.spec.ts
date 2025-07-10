import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePaymentComponent } from './add-update-payment.component';

describe('AddUpdatePaymentComponent', () => {
  let component: AddUpdatePaymentComponent;
  let fixture: ComponentFixture<AddUpdatePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdatePaymentComponent]
    });
    fixture = TestBed.createComponent(AddUpdatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
