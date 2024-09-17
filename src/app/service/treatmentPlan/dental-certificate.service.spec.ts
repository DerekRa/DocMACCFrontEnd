import { TestBed } from '@angular/core/testing';

import { DentalCertificateService } from './dental-certificate.service';

describe('DentalCertificateService', () => {
  let service: DentalCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DentalCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
