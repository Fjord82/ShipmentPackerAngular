import { TestBed, inject } from '@angular/core/testing';

import { PackingDetailService } from './packing-detail.service';

describe('PackingDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackingDetailService]
    });
  });

  it('should be created', inject([PackingDetailService], (service: PackingDetailService) => {
    expect(service).toBeTruthy();
  }));
});
