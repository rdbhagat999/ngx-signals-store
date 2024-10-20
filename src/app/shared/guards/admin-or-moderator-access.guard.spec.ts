import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminOrModeratorAccessGuard } from './admin-or-moderator-access.guard';

describe('adminOrModeratorAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminOrModeratorAccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
