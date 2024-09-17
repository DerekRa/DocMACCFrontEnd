import { TestBed } from '@angular/core/testing';

import { IntraoralExaminationService } from './intraoral-examination.service';

describe('IntraoralExaminationService', () => {
  let service: IntraoralExaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntraoralExaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
