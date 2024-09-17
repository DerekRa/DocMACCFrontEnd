import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateIntraoralExaminationComponent } from './add-update-intraoral-examination.component';

describe('AddUpdateIntraoralExaminationComponent', () => {
  let component: AddUpdateIntraoralExaminationComponent;
  let fixture: ComponentFixture<AddUpdateIntraoralExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateIntraoralExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateIntraoralExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
