import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserStore } from '../../store/users.store';

export const moderatorAccessGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);

  if (userStore.authUser()?.role !== 'moderator') {
    return false;
  }

  return true;
};
