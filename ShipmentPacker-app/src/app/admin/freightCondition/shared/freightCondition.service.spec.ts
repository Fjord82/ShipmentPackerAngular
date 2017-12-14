import { TestBed, inject } from '@angular/core/testing';

import { FreightConditionService } from './freightCondition.service';

describe('FreightConditionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreightConditionService]
    });
  });

  it('should be created', inject([FreightConditionService], (service: FreightConditionService) => {
    expect(service).toBeTruthy();
  }));
});
