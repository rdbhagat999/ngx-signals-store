import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { UserStore } from '../../store/users.store';
import { GenderTitlePipe } from '../../shared/pipes/gender-title.pipe';
import { User } from '../../store/user.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account',
    imports: [GenderTitlePipe],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  readonly userStore = inject(UserStore);
  readonly router = inject(Router);

  authUser: any = {};

  constructor() {
    if (!this.userStore.authUser()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (this.userStore.authUser()) {
      this.authUser = this.userStore.authUser();
    }
  }
}
