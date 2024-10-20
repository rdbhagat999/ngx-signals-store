import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { moderatorAccessGuard } from './moderator-access.guard';

describe('moderatorAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => moderatorAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
