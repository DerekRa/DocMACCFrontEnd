import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraOralTreatmentListComponent } from './intra-oral-treatment-list.component';

describe('IntraOralTreatmentListComponent', () => {
  let component: IntraOralTreatmentListComponent;
  let fixture: ComponentFixture<IntraOralTreatmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraOralTreatmentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntraOralTreatmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
