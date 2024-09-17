import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XrayTakenComponent } from './xray-taken.component';

describe('XrayTakenComponent', () => {
  let component: XrayTakenComponent;
  let fixture: ComponentFixture<XrayTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XrayTakenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XrayTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
