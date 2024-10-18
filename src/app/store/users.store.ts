import { computed, inject, InjectionToken, Signal } from '@angular/core';
import { User } from './user.model';
import {
  getState,
  patchState,
  signalState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserService } from '../services/user.service';
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
import { toObservable } from '@angular/core/rxjs-interop';

const AUTH_USER = {
  id: 2,
  firstName: 'Michael',
  lastName: 'Williams',
  maidenName: '',
  age: 35,
  gender: 'male',
  email: 'michael.williams@x.dummyjson.com',
  phone: '+49 258-627-6644',
  username: 'michaelw',
  password: 'michaelwpass',
  birthDate: '1989-8-10',
  image: 'https://dummyjson.com/icon/michaelw/128',
  bloodGroup: 'B+',
  height: 186.22,
  weight: 76.32,
  eyeColor: 'Red',
  hair: {
    color: 'Green',
    type: 'Straight',
  },
  ip: '12.13.116.142',
  address: {
    address: '385 Fifth Street',
    city: 'Houston',
    state: 'Alabama',
    stateCode: 'AL',
    postalCode: '38807',
    coordinates: {
      lat: 22.815468,
      lng: 115.608581,
    },
    country: 'United States',
  },
  macAddress: '79:15:78:99:60:aa',
  university: 'Ohio State University',
  bank: {
    cardExpire: '02/27',
    cardNumber: '6737807858721625',
    cardType: 'Elo',
    currency: 'SEK',
    iban: '83IDT77FWYLCJVR8ISDACFH0',
  },
  company: {
    department: 'Support',
    name: 'Spinka - Dickinson',
    title: 'Support Specialist',
    address: {
      address: '395 Main Street',
      city: 'Los Angeles',
      state: 'New Hampshire',
      stateCode: 'NH',
      postalCode: '73442',
      coordinates: {
        lat: 79.098326,
        lng: -119.624845,
      },
      country: 'United States',
    },
  },
  ein: '912-602',
  ssn: '108-953-962',
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/97.0.1072.76 Safari/537.36',
  crypto: {
    coin: 'Bitcoin',
    wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
    network: 'Ethereum (ERC20)',
  },
  role: 'admin',
};

type UserStoreState = {
  users: User[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
  authUser: User | null;
};

const initialState: UserStoreState = {
  users: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
  authUser: AUTH_USER,
} satisfies UserStoreState;

const USER_STATE = new InjectionToken<UserStoreState>('UserStoreState', {
  // 👇 Providing `UserStore` at the root level.
  providedIn: 'root',
  factory: () => initialState,
});

export const UserStore = signalStore(
  // withState(() => inject(USER_STATE)),
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
    updateAuthstate(authUser: User | null): void {
      console.log('before updateAuthstate', authUser);
      patchState(store, (state) => ({ ...state, authUser }));
      console.log('after updateAuthstate', store.authUser());
      // store.authUser
    },
    updateQuery(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
  }))
);
