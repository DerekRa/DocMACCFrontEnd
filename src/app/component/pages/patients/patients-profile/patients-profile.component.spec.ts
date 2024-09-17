import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsProfileComponent } from './patients-profile.component';

describe('PatientsProfileComponent', () => {
  let component: PatientsProfileComponent;
  let fixture: ComponentFixture<PatientsProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsProfileComponent]
    });
    fixture = TestBed.createComponent(PatientsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
