import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class UsernameAsyncValidator implements AsyncValidator {
  private userService = inject(UserService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService
      .validateUsername(control.value)
      .pipe(map((result) => (result ? { usernameExists: true } : null)));
  }
}
