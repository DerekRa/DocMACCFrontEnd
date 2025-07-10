import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillHistoryComponent } from './bill-history.component';

describe('BillHistoryComponent', () => {
  let component: BillHistoryComponent;
  let fixture: ComponentFixture<BillHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillHistoryComponent]
    });
    fixture = TestBed.createComponent(BillHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
