import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInformedConsentComponent } from './add-informed-consent.component';

describe('AddInformedConsentComponent', () => {
  let component: AddInformedConsentComponent;
  let fixture: ComponentFixture<AddInformedConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInformedConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInformedConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
