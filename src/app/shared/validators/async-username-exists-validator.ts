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
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService
      .validateUsername(control.value)
      .pipe(map((result) => (result ? { usernameExists: true } : null)));
  }
}
