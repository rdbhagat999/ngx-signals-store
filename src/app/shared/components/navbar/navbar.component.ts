import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserStore } from '../../../store/users.store';
import { User } from '../../../store/user.model';
import { AsyncPipe } from '@angular/common';

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

  readonly navLinks = signal([
    { path: '/', label: 'Home' },
    { path: '/posts', label: 'Posts' },
    { path: '/products', label: 'Products' },
    { path: '/users', label: 'Users' },
    { path: '/admin-dashboard', label: 'Admin Only' },
    { path: '/moderator-dashboard', label: 'Moderator Only' },
    // { path: '/account', label: 'Account' },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
  ]);

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
