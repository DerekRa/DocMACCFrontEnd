import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraOralTreatmentBillListComponent } from './intra-oral-treatment-bill-list.component';

describe('IntraOralTreatmentBillListComponent', () => {
  let component: IntraOralTreatmentBillListComponent;
  let fixture: ComponentFixture<IntraOralTreatmentBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraOralTreatmentBillListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntraOralTreatmentBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
