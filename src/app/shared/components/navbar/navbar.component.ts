import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
// import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { UserStore } from '../../../store/users.store';
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
  readonly userStore = inject(UserStore);

  authUser: Signal<User | null>; // Signal to hold the authUser

  constructor() {
    this.authUser = this.userStore.authUser;
  }

  ngOnInit() {
    console.log('onInit authUser', this.authUser());
  }

  handleLogout() {
    this.userStore.handleLogout();
  }
}
