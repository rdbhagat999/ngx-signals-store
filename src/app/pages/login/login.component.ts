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
import { UserService } from '../../shared/services/user.service';
import { UserStore } from '../../store/users.store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  form: FormGroup;
  private readonly _fb = new FormBuilder();
  readonly router = inject(Router);
  readonly userStore = inject(UserStore);

  isSubmitted = signal(false);

  private readonly subs: Subscription[] = [];

  constructor() {
    this.form = this._fb.group({
      username: ['emilys', Validators.required],
      password: ['emilyspass', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.userStore.authUser()) {
      this.router.navigate(['/']);
    }
  }

  handleOnSubmit() {
    this.isSubmitted.set(false);

    if (this.form.valid) {
      this.isSubmitted.set(true);
      this.userStore.loginUser(this.form.value);
    }
  }

  canDeactivate(): boolean {
    console.log('this.isSubmitted', this.isSubmitted());

    if (!this.isSubmitted() && this.form.dirty) {
      return confirm(
        'Are you sure you want to leave? Unsaved changes will be lost.'
      );
    }
    return true;
  }

  ngOnDestroy(): void {
    if (this.subs?.length) {
      this.subs.forEach((s) => {
        s?.unsubscribe();
      });
    }
  }
}
