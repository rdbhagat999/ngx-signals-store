import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserStore } from '../../store/users.store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { ACCESS_TOKEN_KEY } from '../../utils/constants';
import { User } from '../../store/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly _fb = new FormBuilder();
  form: FormGroup;

  // private readonly _sessionStorageService = inject(SessionStorageService);
  // private readonly _userService = inject(UserService);
  readonly userStore = inject(UserStore);
  // private readonly _router = inject(Router);

  private readonly subs: Subscription[] = [];

  constructor() {
    this.form = this._fb.group({
      username: ['emilys', Validators.required],
      password: ['emilyspass', Validators.required],
    });
  }

  ngOnInit(): void {}

  handleOnSubmit() {
    if (this.form.valid) {
      // this.subs.push(
      //   this._userService.authenticate(this.form.value).subscribe({
      //     next: (userResp) => {
      //       console.log('login request next');

      //       this._sessionStorageService.setItem(
      //         ACCESS_TOKEN_KEY,
      //         userResp.accessToken
      //       );

      //       const authUser = {
      //         id: userResp.id,
      //         firstName: userResp.firstName,
      //         lastName: userResp.lastName,
      //         email: userResp.email,
      //         username: userResp.username,
      //         password: userResp.password,
      //         birthDate: userResp.birthDate,
      //         role: userResp.role,
      //         image: userResp.image,
      //       } satisfies User;

      //       this.userStore.updateAuthstate(authUser, true);
      //       // this.userStore.loadAuthUserDetails({ isLoggedIn: true });

      //       this._router.navigate(['/']);
      //     },
      //     error(err) {
      //       console.log('login request error');
      //       console.log(err);
      //     },
      //     complete() {
      //       console.log('login request completed');
      //     },
      //   })
      // );

      this.userStore.loginUser(this.form.value);
    }
  }

  ngOnDestroy(): void {
    if (this.subs?.length) {
      this.subs.forEach((s) => {
        s?.unsubscribe();
      });
    }
  }
}
