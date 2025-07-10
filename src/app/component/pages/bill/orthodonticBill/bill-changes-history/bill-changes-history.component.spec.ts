import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillChangesHistoryComponent } from './bill-changes-history.component';

describe('BillChangesHistoryComponent', () => {
  let component: BillChangesHistoryComponent;
  let fixture: ComponentFixture<BillChangesHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillChangesHistoryComponent]
    });
    fixture = TestBed.createComponent(BillChangesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
