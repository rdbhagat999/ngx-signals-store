import { computed, inject, InjectionToken } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from './product.model';

type ProductStoreState = {
  products: Product[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ProductStoreState = {
  products: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
} satisfies ProductStoreState;

const POST_STATE = new InjectionToken<ProductStoreState>('ProductStoreState', {
  // 👇 Providing `ProductsStore` at the root level.
  providedIn: 'root',
  factory: () => initialState,
});

export const ProductStore = signalStore(
  withState(() => inject(POST_STATE)),
  // 👇 Accessing previously defined state and computed signals.
  withComputed(({ products, filter }) => ({
    productsCount: computed(() => products().length),
    sortedProducts: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return products().toSorted(
        (a, b) => direction * a.title.localeCompare(b.title)
      );
    }),
  })),
  // 👇 Accessing a store instance with previously defined state, computed signals, and methods.
  withMethods((store, productService = inject(ProductService)) => ({
    // 👇 Defining a method to load all products.
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });

      const products = await productService.getAll();
      patchState(store, { products, isLoading: false });
    },
    // 👇 Defining a method to load products by query.
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return productService.getByQuery(query as string).pipe(
            tapResponse({
              next: (products) =>
                patchState(store, { products, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
    updateQuery(query: string): void {
      // 👇 Updating state using the `patchState` function.
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
  }))
);
