import { CanActivateFn } from '@angular/router';
import { UserStore } from '../../store/users.store';
import { inject } from '@angular/core';

export const adminOrModeratorAccessGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);
  const role = userStore.authUser()?.role;

  console.log(role);

  if (
    userStore.authUser()?.role == 'admin' ||
    userStore.authUser()?.role == 'moderator'
  ) {
    return true;
  }

  return false;
};
