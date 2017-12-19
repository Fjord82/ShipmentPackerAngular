import { TestBed, inject } from '@angular/core/testing';

import { ColliService } from './colli.service';

describe('ColliService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColliService]
    });
  });

  it('should be created', inject([ColliService], (service: ColliService) => {
    expect(service).toBeTruthy();
  }));
});
