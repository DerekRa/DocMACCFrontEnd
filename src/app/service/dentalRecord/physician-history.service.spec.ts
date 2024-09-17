import { TestBed } from '@angular/core/testing';

import { PhysicianHistoryService } from './physician-history.service';

describe('PhysicianHistoryService', () => {
  let service: PhysicianHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicianHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
