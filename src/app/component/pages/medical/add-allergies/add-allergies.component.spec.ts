import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllergiesComponent } from './add-allergies.component';

describe('AddAllergiesComponent', () => {
  let component: AddAllergiesComponent;
  let fixture: ComponentFixture<AddAllergiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAllergiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
