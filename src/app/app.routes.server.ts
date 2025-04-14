import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { UserService } from './shared/services/user.service';
import { PostService } from './shared/services/post.service';
import { ProductService } from './shared/services/product.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  // {
  //   path: 'users/:id',
  //   renderMode: RenderMode.Prerender,
  //   fallback: PrerenderFallback.Server,
  //   async getPrerenderParams() {
  //     const service = inject(UserService);
  //     const usersResp = await service.getAll();
  //     const users = usersResp.map((user) => ({
  //       id: `${user.id}`,
  //     }));

  //     return users ? users : [];
  //   },
  // },
  // {
  //   path: 'posts/:id',
  //   renderMode: RenderMode.Prerender,
  //   fallback: PrerenderFallback.Server,
  //   async getPrerenderParams() {
  //     const service = inject(PostService);
  //     const postsResp = await service.getAll();
  //     const posts = postsResp.map((user) => ({
  //       id: `${user.id}`,
  //     }));

  //     return posts ? posts : [];
  //   },
  // },
  // {
  //   path: 'products/:id',
  //   renderMode: RenderMode.Prerender,
  //   fallback: PrerenderFallback.Server,
  //   async getPrerenderParams() {
  //     const service = inject(ProductService);
  //     const productsResp = await service.getAll();
  //     const products = productsResp.map((product) => ({
  //       id: `${product.id}`,
  //     }));

  //     return products ? products : [];
  //   },
  // },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
