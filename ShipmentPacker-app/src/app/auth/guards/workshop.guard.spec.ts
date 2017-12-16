import { TestBed, async, inject } from '@angular/core/testing';

import { WorkshopGuard } from './workshop.guard';

describe('WorkshopGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkshopGuard]
    });
  });

  it('should ...', inject([WorkshopGuard], (guard: WorkshopGuard) => {
    expect(guard).toBeTruthy();
  }));
});
