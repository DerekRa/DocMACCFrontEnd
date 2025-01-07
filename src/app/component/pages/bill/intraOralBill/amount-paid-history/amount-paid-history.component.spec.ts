import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountPaidHistoryComponent } from './amount-paid-history.component';

describe('AmountPaidHistoryComponent', () => {
  let component: AmountPaidHistoryComponent;
  let fixture: ComponentFixture<AmountPaidHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountPaidHistoryComponent]
    });
    fixture = TestBed.createComponent(AmountPaidHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
