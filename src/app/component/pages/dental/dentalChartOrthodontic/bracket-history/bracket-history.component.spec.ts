import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketHistoryComponent } from './bracket-history.component';

describe('BracketHistoryComponent', () => {
  let component: BracketHistoryComponent;
  let fixture: ComponentFixture<BracketHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BracketHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BracketHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
