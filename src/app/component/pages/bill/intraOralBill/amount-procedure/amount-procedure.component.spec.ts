import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountProcedureComponent } from './amount-procedure.component';

describe('AmountProcedureComponent', () => {
  let component: AmountProcedureComponent;
  let fixture: ComponentFixture<AmountProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountProcedureComponent]
    });
    fixture = TestBed.createComponent(AmountProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
