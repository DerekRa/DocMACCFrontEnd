import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalChargeHistoryComponent } from './additional-charge-history.component';

describe('AdditionalChargeHistoryComponent', () => {
  let component: AdditionalChargeHistoryComponent;
  let fixture: ComponentFixture<AdditionalChargeHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalChargeHistoryComponent]
    });
    fixture = TestBed.createComponent(AdditionalChargeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
