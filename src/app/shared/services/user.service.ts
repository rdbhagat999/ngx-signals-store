import { inject, Injectable } from '@angular/core';
import { LoginResponse, User } from '../../store/user.model';
import { delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BACKEND_API } from '../../utils/backend_api';
import { SessionStorageService } from './session-storage.service';
import { ACCESS_TOKEN_KEY, AUTH_USER_KEY } from '../../utils/constants';
import { Router } from '@angular/router';

const USER_DATA: User[] = [
  {
    id: 1,
    firstName: 'Emily',
    lastName: 'Johnson',
    gender: 'female',
    email: 'emily.johnson@x.dummyjson.com',
    username: 'emilys',
    password: 'emilyspass',
    birthDate: '1996-5-30',
    image: 'https://dummyjson.com/icon/emilys/128',
    role: 'admin',
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Williams',
    gender: 'male',
    email: 'michael.williams@x.dummyjson.com',
    username: 'michaelw',
    password: 'michaelwpass',
    birthDate: '1989-8-10',
    image: 'https://dummyjson.com/icon/michaelw/128',
    role: 'admin',
  },
  {
    id: 3,
    firstName: 'Sophia',
    lastName: 'Brown',
    gender: 'male',
    email: 'sophia.brown@x.dummyjson.com',
    username: 'sophiab',
    password: 'sophiabpass',
    birthDate: '1982-11-6',
    image: 'https://dummyjson.com/icon/sophiab/128',
    role: 'admin',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _http = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _backend_url = inject(BACKEND_API);
  private readonly _sessionStorageService = inject(SessionStorageService);

  private existingUsernames = ['emilys', 'superman', 'joker', 'luthor'];

  validateUsername(value: string) {
    return of(
      this.existingUsernames.some(
        (a) => a?.toLowerCase() === value?.toLowerCase()
      )
    ).pipe(delay(1000));
  }

  constructor() {}

  async getAll() {
    return Promise.resolve([...USER_DATA]);
  }

  getByQuery(query: string) {
    if (query) {
      return of([...USER_DATA].filter((u) => u.username === query));
    }
    return of([...USER_DATA]);
  }

  fetchAuthUserDetails() {
    return this._http.get<User>(`${this._backend_url}/auth/me`);
  }

  authenticate(loginRequestParams: { username: string; password: string }) {
    return this._http.post<LoginResponse>(
      `${this._backend_url}/auth/login`,
      loginRequestParams
    );
  }

  async handleLogout() {
    this._sessionStorageService.removeItem(ACCESS_TOKEN_KEY);
    this._sessionStorageService.removeItem(AUTH_USER_KEY);
    this._router.navigate(['/login']);
  }
}
