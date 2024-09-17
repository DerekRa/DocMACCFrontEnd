import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracesHistoryComponent } from './braces-history.component';

describe('BracesHistoryComponent', () => {
  let component: BracesHistoryComponent;
  let fixture: ComponentFixture<BracesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BracesHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BracesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
