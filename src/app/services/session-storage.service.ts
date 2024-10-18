import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService extends StorageService {
  constructor() {
    super();
  }

  override getItem(key: string): any {
    try {
      const item = sessionStorage.getItem(key);
      item ? JSON.parse(item) : null;
    } catch (error) {
      console.log('[SessionStorageService: getItem]', error);
      return null;
    }
  }

  override setItem(key: string, value: any): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('[SessionStorageService: setItem]', error);
    }
  }

  override removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.log('[SessionStorageService: removeItem]', error);
    }
  }

  override removeAllItems(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.log('[SessionStorageService: removeAllItems]', error);
    }
  }
}
