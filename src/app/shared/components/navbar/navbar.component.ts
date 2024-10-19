import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UserStore } from '../../../store/users.store';
import { SessionStorageService } from '../../../services/session-storage.service';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { User } from '../../../store/user.model';
import { AsyncPipe } from '@angular/common';
import { DeepSignal, getState } from '@ngrx/signals';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  providers: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private readonly _sessionStorageService = inject(SessionStorageService);
  private readonly _router = inject(Router);
  readonly userStore = inject(UserStore);

  authUser: Signal<User | null>; // Signal to hold the authUser

  constructor() {
    this.authUser = this.userStore.authUser;
  }

  ngOnInit() {
    console.log('onInit authUser', this.authUser());
  }

  onBtnClick() {
    console.log('onBtnClick: getState', getState(this.userStore)?.authUser);
    console.log('onBtnClick: authUser', this.authUser());
  }

  handleLogout() {
    this._sessionStorageService.removeItem(ACCESS_TOKEN_KEY);
    this.userStore.updateAuthstate(null, false);
    this._router.navigate(['/login']);
  }
}
