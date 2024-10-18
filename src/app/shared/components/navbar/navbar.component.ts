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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  providers: [UserStore],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private readonly _sessionStorageService = inject(SessionStorageService);
  private readonly _router = inject(Router);
  readonly userStore = inject(UserStore);

  authUser: Signal<User | null> = signal(null); // Signal to hold the authUser

  constructor() {
    this.authUser = this.userStore.authUser;

    toObservable(this.userStore.authUser).subscribe((u) => {
      console.log('uuuuuuuuu', u);
    });

    effect(() => {
      this.authUser = this.userStore.authUser;
      console.log('constructor user', this.authUser());
    });
  }

  ngOnInit() {
    console.log('onInit user', this.authUser());
  }

  onBtnClick() {
    console.log('onBtnClick: user', this.userStore.authUser());
  }

  handleLogout() {
    this._sessionStorageService.removeItem(ACCESS_TOKEN_KEY);
    this.userStore.updateAuthstate(null);
    this._router.navigate(['/login']);
  }
}
