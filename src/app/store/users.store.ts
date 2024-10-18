import { computed, inject, InjectionToken } from '@angular/core';
import { User } from './user.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserService } from '../services/user.service';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs';

type UserStoreState = {
  users: User[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: UserStoreState = {
  users: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
} satisfies UserStoreState;

const USER_STATE = new InjectionToken<UserStoreState>('UserStoreState', {
  // 👇 Providing `UserStore` at the root level.
  providedIn: 'root',
  factory: () => initialState,
});

export const UserStore = signalStore(
  withState(() => inject(USER_STATE)),
  withComputed(({ users, filter }) => ({
    usersCount: computed(() => users().length),
    sortedUsers: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return users().toSorted(
        (a, b) => direction * a.username.localeCompare(b.username)
      );
    }),
  })),
  withMethods((store, userService = inject(UserService)) => ({
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
    updateQuery(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
  }))
);
