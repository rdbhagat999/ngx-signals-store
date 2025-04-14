import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UserStore } from './store/users.store';
import { SessionStorageService } from './shared/services/session-storage.service';
import { AUTH_USER_KEY } from './utils/constants';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'ngx-signals-store';
  readonly userStore = inject(UserStore);
  readonly sessionStorageService = inject(SessionStorageService);

  constructor() {
    initFlowbite();
    this.userStore.updateAuthstate(
      this.sessionStorageService.getItem(AUTH_USER_KEY),
      this.sessionStorageService.getItem(AUTH_USER_KEY) ? true : false
    );
  }

  ngOnInit(): void {
    // initFlowbite();
  }
}
