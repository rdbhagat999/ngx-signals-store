import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class StorageService {
  constructor() {}

  getItem(key: string): any {}

  setItem(key: string, value: any): void {}

  removeItem(key: string): void {}

  removeAllItems(): void {}
}
