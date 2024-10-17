import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./pages/posts/posts.component').then((m) => m.PostsComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./pages/account/account.component').then(
            (m) => m.AccountComponent
          ),
      },
    ],
  },
];
