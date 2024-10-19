import { HttpInterceptorFn } from '@angular/common/http';
import { ACCESS_TOKEN_KEY } from '../utils/constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('authInterceptor', req.method, req.url);

  const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

  const cloneReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken ? JSON.parse(accessToken) : ''}`,
    },
  });

  if (req.url.includes('/auth/me')) {
    return next(cloneReq);
  }

  return next(req);
};
