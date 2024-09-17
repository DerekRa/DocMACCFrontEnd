import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalCertificationComponent } from './dental-certification.component';

describe('DentalCertificationComponent', () => {
  let component: DentalCertificationComponent;
  let fixture: ComponentFixture<DentalCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentalCertificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentalCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
