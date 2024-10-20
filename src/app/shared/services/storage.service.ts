export interface StorageService {
  getItem(key: string): any;

  setItem(key: string, value: any): void;

  removeItem(key: string): void;

  removeAllItems(): void;
}
