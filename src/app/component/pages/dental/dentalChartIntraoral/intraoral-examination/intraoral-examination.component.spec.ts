import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraoralExaminationComponent } from './intraoral-examination.component';

describe('IntraoralExaminationComponent', () => {
  let component: IntraoralExaminationComponent;
  let fixture: ComponentFixture<IntraoralExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraoralExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntraoralExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
