import { HttpInterceptorFn } from '@angular/common/http';
import { ACCESS_TOKEN_KEY } from '../utils/constants';
import { SessionStorageService } from '../services/session-storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('authInterceptor', req.method, req.url);
  const _sessionStorageService = inject(SessionStorageService);

  const accessToken = _sessionStorageService.getItem(ACCESS_TOKEN_KEY);

  const cloneReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (req.url.includes('/auth/')) {
    return next(cloneReq);
  }

  return next(req);
};
