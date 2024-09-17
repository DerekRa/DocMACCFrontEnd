import { TestBed } from '@angular/core/testing';

import { ProfileModelService } from './profile-model.service';

describe('ProfileModelService', () => {
  let service: ProfileModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
