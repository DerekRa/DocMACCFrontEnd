import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicalQuestionsComponent } from './update-medical-questions.component';

describe('UpdateMedicalQuestionsComponent', () => {
  let component: UpdateMedicalQuestionsComponent;
  let fixture: ComponentFixture<UpdateMedicalQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMedicalQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMedicalQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
