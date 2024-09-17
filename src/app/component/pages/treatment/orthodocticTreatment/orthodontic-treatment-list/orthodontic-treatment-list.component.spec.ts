import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthodonticTreatmentListComponent } from './orthodontic-treatment-list.component';

describe('OrthodonticTreatmentListComponent', () => {
  let component: OrthodonticTreatmentListComponent;
  let fixture: ComponentFixture<OrthodonticTreatmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrthodonticTreatmentListComponent]
    });
    fixture = TestBed.createComponent(OrthodonticTreatmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
