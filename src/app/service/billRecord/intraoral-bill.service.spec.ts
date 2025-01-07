import { TestBed } from '@angular/core/testing';

import { IntraoralBillService } from './intraoral-bill.service';

describe('IntraoralBillService', () => {
  let service: IntraoralBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntraoralBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
