import { ErrorHandler, inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor() {}

  showError(message: string) {
    console.log(`Error: ${message}`);
    // TODO: Add toast message service
  }

  handleError(err: any): void {
    console.log('GlobalErrorHandlerService');

    if (err instanceof HttpErrorResponse) {
      console.log('HttpErrorResponse');
      console.log(err.status, err.error.message);
    } else {
      console.log('NOT HttpErrorResponse');
      this.showError(err.message);
    }
  }
}
