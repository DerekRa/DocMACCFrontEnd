import { TestBed } from '@angular/core/testing';

import { OrthodonticBillService } from './orthodontic-bill.service';

describe('OrthodonticBillService', () => {
  let service: OrthodonticBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrthodonticBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
