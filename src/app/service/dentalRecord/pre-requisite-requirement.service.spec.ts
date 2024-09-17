import { TestBed } from '@angular/core/testing';

import { PreRequisiteRequirementService } from './pre-requisite-requirement.service';

describe('PreRequisiteRequirementService', () => {
  let service: PreRequisiteRequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreRequisiteRequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
