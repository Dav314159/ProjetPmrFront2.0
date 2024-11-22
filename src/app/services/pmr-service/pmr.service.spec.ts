import { TestBed } from '@angular/core/testing';

import { PmrService } from './pmr.service';

describe('PmrService', () => {
  let service: PmrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
