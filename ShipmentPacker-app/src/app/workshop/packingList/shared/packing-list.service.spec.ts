import { TestBed, inject } from '@angular/core/testing';

import { PackingListService } from './packing-list.service';

describe('PackingListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackingListService]
    });
  });

  it('should be created', inject([PackingListService], (service: PackingListService) => {
    expect(service).toBeTruthy();
  }));
});
