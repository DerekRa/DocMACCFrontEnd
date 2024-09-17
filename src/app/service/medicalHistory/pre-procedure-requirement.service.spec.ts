import { TestBed } from '@angular/core/testing';

import { PreProcedureRequirementService } from './pre-procedure-requirement.service';

describe('PreProcedureRequirementService', () => {
  let service: PreProcedureRequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreProcedureRequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
