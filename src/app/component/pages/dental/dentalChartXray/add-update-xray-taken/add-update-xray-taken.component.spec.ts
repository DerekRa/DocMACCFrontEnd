import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateXrayTakenComponent } from './add-update-xray-taken.component';

describe('AddUpdateXrayTakenComponent', () => {
  let component: AddUpdateXrayTakenComponent;
  let fixture: ComponentFixture<AddUpdateXrayTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateXrayTakenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateXrayTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
