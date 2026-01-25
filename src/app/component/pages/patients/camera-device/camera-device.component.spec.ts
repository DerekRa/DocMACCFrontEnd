import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraDeviceComponent } from './camera-device.component';

describe('CameraDeviceComponent', () => {
  let component: CameraDeviceComponent;
  let fixture: ComponentFixture<CameraDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraDeviceComponent]
    });
    fixture = TestBed.createComponent(CameraDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
