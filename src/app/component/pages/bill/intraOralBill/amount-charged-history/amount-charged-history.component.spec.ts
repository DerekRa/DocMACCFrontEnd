import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountChargedHistoryComponent } from './amount-charged-history.component';

describe('AmountChargedHistoryComponent', () => {
  let component: AmountChargedHistoryComponent;
  let fixture: ComponentFixture<AmountChargedHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountChargedHistoryComponent]
    });
    fixture = TestBed.createComponent(AmountChargedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
