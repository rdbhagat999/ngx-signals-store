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
import { PostService } from '../services/post.service';
import { Post } from './post.model';

type PostStoreState = {
  posts: Post[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: PostStoreState = {
  posts: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
} satisfies PostStoreState;

const POST_STATE = new InjectionToken<PostStoreState>('PostStoreState', {
  // 👇 Providing `PostssStore` at the root level.
  providedIn: 'root',
  factory: () => initialState,
});

export const PostStore = signalStore(
  withState(() => inject(POST_STATE)),
  // 👇 Accessing previously defined state and computed signals.
  withComputed(({ posts, filter }) => ({
    postsCount: computed(() => posts().length),
    sortedPosts: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return posts().toSorted(
        (a, b) => direction * a.title.localeCompare(b.title)
      );
    }),
  })),
  // 👇 Accessing a store instance with previously defined state, computed signals, and methods.
  withMethods((store, postService = inject(PostService)) => ({
    // 👇 Defining a method to load all posts.
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });

      const posts = await postService.getAll();
      patchState(store, { posts, isLoading: false });
    },
    // 👇 Defining a method to load posts by query.
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return postService.getByQuery(query).pipe(
            tapResponse({
              next: (posts) => patchState(store, { posts, isLoading: false }),
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
