import { TestBed } from '@angular/core/testing';

import { OrthodonticExaminationService } from './orthodontic-examination.service';

describe('OrthodonticExaminationService', () => {
  let service: OrthodonticExaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrthodonticExaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
