import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BACKEND_API } from './utils/backend_api';
import { authInterceptor } from './shared/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './services/error.interceptor';
// import { GlobalErrorHandlerService } from './services/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    { provide: BACKEND_API, useValue: 'https://dummyjson.com' },
    provideHttpClient(withInterceptors([errorInterceptor, authInterceptor])),
    // { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    provideRouter(routes),
  ],
};
