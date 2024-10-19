import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

type ToastObj = {
  message: string;
  title?: string;
  timeOut?: number;
};

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  private readonly toastr = inject(ToastrService);

  options = {
    closeButton: true,
    progressBar: true,
    tapToDismiss: true,
    timeOut: 3000,
  };

  constructor() {}

  successMessage({ message = '', title = '', timeOut = 3000 }: ToastObj) {
    this.toastr.success(message, title, {
      ...this.options,
      timeOut,
    });
  }

  errorMessage({ message = '', title = '', timeOut = 3000 }: ToastObj) {
    this.toastr.error(message, title, { ...this.options, timeOut });
  }

  infoMessage({ message = '', title = '', timeOut = 3000 }: ToastObj) {
    this.toastr.info(message, title, { ...this.options, timeOut });
  }

  warnMessage({ message = '', title = '', timeOut = 3000 }: ToastObj) {
    this.toastr.warning(message, title, { ...this.options, timeOut });
  }
}
