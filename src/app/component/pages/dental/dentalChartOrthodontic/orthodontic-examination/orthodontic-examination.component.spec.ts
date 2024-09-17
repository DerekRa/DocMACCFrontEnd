import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthodonticExaminationComponent } from './orthodontic-examination.component';

describe('OrthodonticExaminationComponent', () => {
  let component: OrthodonticExaminationComponent;
  let fixture: ComponentFixture<OrthodonticExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrthodonticExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrthodonticExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
