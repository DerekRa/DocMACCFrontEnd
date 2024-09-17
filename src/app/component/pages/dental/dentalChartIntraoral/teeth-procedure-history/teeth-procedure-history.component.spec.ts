import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeethProcedureHistoryComponent } from './teeth-procedure-history.component';

describe('TeethProcedureHistoryComponent', () => {
  let component: TeethProcedureHistoryComponent;
  let fixture: ComponentFixture<TeethProcedureHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeethProcedureHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeethProcedureHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
