import { TestBed, inject } from '@angular/core/testing';

import { ColliItemService } from './colli-item.service';

describe('ColliItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColliItemService]
    });
  });

  it('should be created', inject([ColliItemService], (service: ColliItemService) => {
    expect(service).toBeTruthy();
  }));
});
