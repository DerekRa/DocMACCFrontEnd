import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraoralBillBreakdownComponent } from './intraoral-bill-breakdown.component';

describe('IntraoralBillBreakdownComponent', () => {
  let component: IntraoralBillBreakdownComponent;
  let fixture: ComponentFixture<IntraoralBillBreakdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntraoralBillBreakdownComponent]
    });
    fixture = TestBed.createComponent(IntraoralBillBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
