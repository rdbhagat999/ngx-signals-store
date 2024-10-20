import {
  computed,
  effect,
  inject,
  InjectionToken,
  signal,
  Signal,
} from '@angular/core';
import { User } from './user.model';
import {
  getState,
  patchState,
  signalState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserService } from '../shared/services/user.service';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  pipe,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  Observable,
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { ACCESS_TOKEN_KEY, AUTH_USER_KEY } from '../utils/constants';

type UserStoreState = {
  users: User[];
  isLoading: boolean;
  isLoggedIn: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
  authUser: User | null;
};

const initialState: UserStoreState = {
  users: [],
  isLoading: false,
  isLoggedIn: false,
  filter: { query: '', order: 'asc' },
  authUser: null,
} satisfies UserStoreState;

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ users, filter }) => ({
    usersCount: computed(() => users().length),
    sortedUsers: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return users().toSorted(
        (a, b) => direction * a.username.localeCompare(b.username)
      );
    }),
  })),
  withMethods(
    (
      store,
      router = inject(Router),
      sessionStorageService = inject(SessionStorageService),
      userService = inject(UserService)
    ) => ({
      async loadAll(): Promise<void> {
        patchState(store, { isLoading: true });

        const users = await userService.getAll();
        patchState(store, { users, isLoading: false });
      },
      loadByQuery: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return userService.getByQuery(query).pipe(
              tapResponse({
                next: (users) => patchState(store, { users, isLoading: false }),
                error: (err) => {
                  patchState(store, { isLoading: false });
                  console.error(err);
                },
              })
            );
          })
        )
      ),
      loadAuthUserDetails: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((_) => {
            return userService.fetchAuthUserDetails().pipe(
              tapResponse({
                next: (authUser) =>
                  patchState(store, { authUser, isLoading: false }),
                error: (err) => {
                  patchState(store, { isLoading: false });
                  console.error(err);
                },
              })
            );
          })
        )
      ),
      handleLogout(): void {
        this.updateAuthstate(null, false);
        userService.handleLogout();
      },
      updateAuthstate(authUser: User | null, isLoggedIn: boolean): void {
        console.log('before updateAuthstate', getState(store));
        patchState(store, (state) => ({ ...state, authUser, isLoggedIn }));

        store.isLoggedIn() ? this.loadAuthUserDetails() : null;
        console.log('after updateAuthstate', getState(store));
      },
      updateQuery(query: string): void {
        patchState(store, (state) => ({ filter: { ...state.filter, query } }));
      },
      updateOrder(order: 'asc' | 'desc'): void {
        patchState(store, (state) => ({ filter: { ...state.filter, order } }));
      },
      loginUser: rxMethod<{ username: string; password: string }>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return userService.authenticate(query).pipe(
              tapResponse({
                next: (authUser) => {
                  patchState(store, {
                    authUser,
                    isLoggedIn: true,
                  });
                  sessionStorageService.setItem(
                    ACCESS_TOKEN_KEY,
                    authUser.accessToken
                  );

                  sessionStorageService.setItem(AUTH_USER_KEY, authUser);

                  return query;
                },
                error: (err) => {
                  patchState(store, { isLoggedIn: false, isLoading: false });
                  console.error(err);
                },
              })
            );
          }),
          switchMap((_) => {
            return userService.fetchAuthUserDetails().pipe(
              tapResponse({
                next: (u) => {
                  const authUser = {
                    id: u.id,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    gender: u.gender,
                    email: u.email,
                    username: u.username,
                    password: u.password,
                    birthDate: u.birthDate,
                    role: u.role,
                    image: u.image,
                  } satisfies User;

                  patchState(store, {
                    authUser,
                    isLoggedIn: true,
                    isLoading: false,
                  });

                  sessionStorageService.setItem(AUTH_USER_KEY, authUser);
                  return router.navigate(['/']);
                },
                error: (err) => {
                  patchState(store, { isLoggedIn: false, isLoading: false });
                  console.error(err);
                },
              })
            );
          })
        )
      ),
    })
  ),
  withHooks({
    onInit(store) {
      effect(() => {
        // 👇 The effect is re-executed on state change.
        const state = getState(store);
        console.log('state', state);
      });
    },
  })
);
