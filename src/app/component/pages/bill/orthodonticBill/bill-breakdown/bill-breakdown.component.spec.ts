import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillBreakdownComponent } from './bill-breakdown.component';

describe('BillBreakdownComponent', () => {
  let component: BillBreakdownComponent;
  let fixture: ComponentFixture<BillBreakdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillBreakdownComponent]
    });
    fixture = TestBed.createComponent(BillBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
