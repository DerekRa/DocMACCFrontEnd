import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAppointmentComponent } from './add-update-appointment.component';

describe('AddUpdateAppointmentComponent', () => {
  let component: AddUpdateAppointmentComponent;
  let fixture: ComponentFixture<AddUpdateAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateAppointmentComponent]
    });
    fixture = TestBed.createComponent(AddUpdateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
