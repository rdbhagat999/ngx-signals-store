import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserStore } from '../../store/users.store';
import {
  forbiddenNameValidator,
  formPasswordConfirmValidator,
  matchValidator,
} from '../../shared/validators/custom-validators';
import { JsonPipe } from '@angular/common';
import { UsernameAsyncValidator } from '../../shared/validators/async-username-exists-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  providers: [UsernameAsyncValidator],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  readonly userStore = inject(UserStore);
  private readonly subs: Subscription[] = [];

  isSubmitted = signal(false);

  constructor(private usernameAsyncValidator: UsernameAsyncValidator) {
    this.form = new FormGroup(
      {
        username: new FormControl('', {
          validators: [Validators.required, forbiddenNameValidator(/bob/i)],
          asyncValidators: [
            this.usernameAsyncValidator.validate.bind(
              this.usernameAsyncValidator
            ),
          ],
          // updateOn: 'blur',
        }),
        password: new FormControl('', {
          validators: [Validators.required],
        }),
        confirm_password: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      {
        // validators: [formPasswordConfirmValidator],
        // updateOn: 'blur',
      }
    );

    this.form
      .get('confirm_password')
      ?.addValidators(
        matchValidator(this.form, 'password', 'Passwords do not match')
      );
  }

  ngOnInit(): void {
    // this.form
    //   .get('confirm_password')
    //   ?.addValidators([
    //     matchValidator(this.form, 'password', 'Passwords do not match'),
    //   ]);
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  get confirm_password() {
    return this.form.get('confirm_password');
  }

  handleOnSubmit() {
    console.log('this.isSubmitted', this.isSubmitted());
    console.log('username_errors', this.form.get('username')?.errors);
    console.log('password_errors', this.form.get('password')?.errors);
    console.log(
      'confirm_password_errors',
      this.form.get('confirm_password')?.errors
    );
    console.log('form_errors', this.form?.errors);
    console.log('formValid', this.form.valid);

    if (this.form.valid) {
      this.isSubmitted.set(true);

      console.log('status', this.form.status);
      console.log(this.form.value);
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
