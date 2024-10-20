import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserStore } from '../../store/users.store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly _fb = new FormBuilder();
  form: FormGroup;

  // private readonly _sessionStorageService = inject(SessionStorageService);
  // private readonly _userService = inject(UserService);
  readonly userStore = inject(UserStore);
  // private readonly _router = inject(Router);

  private readonly subs: Subscription[] = [];

  constructor() {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  handleOnSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  canDeactivate(): boolean {
    if (this.form.invalid) {
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
