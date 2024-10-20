import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { WINDOW } from '../../utils/backend_api';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService implements StorageService {
  private window = inject(WINDOW);

  constructor() {}

  getItem(key: string): any {
    const item = this.window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    try {
      this.window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('[SessionStorageService: setItem]', error);
    }
  }

  removeItem(key: string): void {
    try {
      this.window.sessionStorage.removeItem(key);
    } catch (error) {
      console.log('[SessionStorageService: removeItem]', error);
    }
  }

  removeAllItems(): void {
    try {
      this.window.sessionStorage.clear();
    } catch (error) {
      console.log('[SessionStorageService: removeAllItems]', error);
    }
  }
}
