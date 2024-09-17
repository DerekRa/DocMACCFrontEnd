import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XrayTakenDisplayComponent } from './xray-taken-display.component';

describe('XrayTakenDisplayComponent', () => {
  let component: XrayTakenDisplayComponent;
  let fixture: ComponentFixture<XrayTakenDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XrayTakenDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XrayTakenDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
