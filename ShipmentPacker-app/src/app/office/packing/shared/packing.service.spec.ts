import { TestBed, inject } from '@angular/core/testing';

import { PackingService } from './packing.service';

describe('PackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackingService]
    });
  });

  it('should be created', inject([PackingService], (service: PackingService) => {
    expect(service).toBeTruthy();
  }));
});
