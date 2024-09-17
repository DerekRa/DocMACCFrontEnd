import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraOralTreatmentListDetailsComponent } from './intra-oral-treatment-list-details.component';

describe('IntraOralTreatmentListDetailsComponent', () => {
  let component: IntraOralTreatmentListDetailsComponent;
  let fixture: ComponentFixture<IntraOralTreatmentListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraOralTreatmentListDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntraOralTreatmentListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
