import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRequisitesComponent } from './pre-requisites.component';

describe('PreRequisitesComponent', () => {
  let component: PreRequisitesComponent;
  let fixture: ComponentFixture<PreRequisitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRequisitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreRequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
