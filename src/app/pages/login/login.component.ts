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
import { MetaTagService } from '../../meta-tag.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly metaTagService = inject(MetaTagService);
  form!: FormGroup;
  loginRoleForm!: FormGroup;
  private readonly _fb = new FormBuilder();
  readonly router = inject(Router);
  readonly userStore = inject(UserStore);

  isSubmitted = signal(false);

  private readonly subs: Subscription[] = [];

  constructor() {
    this.metaTagService.updateTitle('Login');
    this.metaTagService.updateMetaTag(
      'description',
      'This is the login page of the Angular application.'
    );

    this.form = this._fb.group({
      username: ['logant', Validators.required],
      password: ['logantpass', Validators.required],
    });

    this.initLoginRoleForm();
  }

  ngOnInit(): void {
    if (this.userStore.authUser()) {
      this.router.navigate(['/']);
    }
  }

  initLoginRoleForm() {
    this.loginRoleForm = this._fb.group({
      loginRole: ['user'],
    });

    this.subs.push(
      this.loginRoleForm.valueChanges.subscribe(({ loginRole }) => {
        switch (loginRole) {
          case 'admin':
            this.form.patchValue({
              username: 'emilys',
              password: 'emilyspass',
            });
            break;
          case 'moderator':
            this.form.patchValue({
              username: 'oliviaw',
              password: 'oliviawpass',
            });
            break;
          case 'user':
            this.form.patchValue({
              username: 'logant',
              password: 'logantpass',
            });
            break;
          default:
            this.form.patchValue({
              username: 'logant',
              password: 'logantpass',
            });
            break;
        }
      })
    );
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
