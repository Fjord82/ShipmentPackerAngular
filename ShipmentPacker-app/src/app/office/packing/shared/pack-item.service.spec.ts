import { TestBed, inject } from '@angular/core/testing';

import { PackItemService } from './pack-item.service';

describe('PackItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackItemService]
    });
  });

  it('should be created', inject([PackItemService], (service: PackItemService) => {
    expect(service).toBeTruthy();
  }));
});
