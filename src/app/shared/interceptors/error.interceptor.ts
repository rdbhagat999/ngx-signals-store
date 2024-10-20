import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ToastMessageService } from '../services/toast-message.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError, throwError } from 'rxjs';
import { UserStore } from '../../store/users.store';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('errorInterceptor', req.method, req.url);
  const toastrService = inject(ToastMessageService);
  const userStore = inject(UserStore);

  function showError(message: string) {
    console.log(`Error: ${message}`);
    toastrService.errorMessage({ message });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse | Error) => {
      if (err instanceof HttpErrorResponse) {
        console.log('Server-side error');
        if ([401, 403].includes(err.status)) {
          showError(err.error.message);
          // auto logout if 401 or 403 response returned from api
          userStore.handleLogout();
        } else if (err.status == 0) {
          console.log(err.status);
          if (!window.navigator.onLine) {
            showError('Please check your internet connection.');
          }
        } else if (err.status == 404) {
          showError('Not found');
        } else {
          console.log(err);
          showError(err.error.message);
        }
      } else {
        console.log('Client-side error');
      }
      return throwError(() => err);
    })
  );
};
