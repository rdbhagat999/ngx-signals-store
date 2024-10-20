import { inject } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

export const matchValidator = (
  form: FormGroup,
  compareFieldName: string,
  errorMessage: string
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const compareField = form.get(compareFieldName);

    return control && compareField && control?.value !== compareField?.value
      ? { notMatchError: errorMessage }
      : null;
  };
};

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

export const formPasswordConfirmValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirm_password = control.get('confirm_password');
  return password &&
    confirm_password &&
    password.value !== confirm_password.value
    ? { passwordNotMatchError: true }
    : null;
};
