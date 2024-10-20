import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../../store/users.store';

export const adminAccessGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  if (userStore.authUser()?.role !== 'admin') {
    return false;
  }

  return true;
};
