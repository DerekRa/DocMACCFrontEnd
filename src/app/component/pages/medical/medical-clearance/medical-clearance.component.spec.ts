import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalClearanceComponent } from './medical-clearance.component';

describe('MedicalClearanceComponent', () => {
  let component: MedicalClearanceComponent;
  let fixture: ComponentFixture<MedicalClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalClearanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
