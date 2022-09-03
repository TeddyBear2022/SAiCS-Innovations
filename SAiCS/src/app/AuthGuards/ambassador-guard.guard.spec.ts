import { TestBed } from '@angular/core/testing';

import { AmbassadorGuardGuard } from './ambassador-guard.guard';

describe('AmbassadorGuardGuard', () => {
  let guard: AmbassadorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AmbassadorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
