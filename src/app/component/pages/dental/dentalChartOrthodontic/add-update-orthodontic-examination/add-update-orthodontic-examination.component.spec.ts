import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOrthodonticExaminationComponent } from './add-update-orthodontic-examination.component';

describe('AddUpdateOrthodonticExaminationComponent', () => {
  let component: AddUpdateOrthodonticExaminationComponent;
  let fixture: ComponentFixture<AddUpdateOrthodonticExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateOrthodonticExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateOrthodonticExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
