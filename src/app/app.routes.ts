import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { adminAccessGuard } from './shared/guards/admin-access.guard';
import { canDeactivateComponentGuard } from './shared/guards/can-deactivate-component.guard';

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
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        canDeactivate: [canDeactivateComponentGuard],
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        canDeactivate: [canDeactivateComponentGuard],
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users.component').then((m) => m.UsersComponent),
        canActivate: [authGuard, adminAccessGuard],
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./pages/posts/posts.component').then((m) => m.PostsComponent),
        canActivate: [authGuard],
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'admin-dashboard',
        loadComponent: () =>
          import('./pages/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
        canActivate: [authGuard, adminAccessGuard],
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./pages/account/account.component').then(
            (m) => m.AccountComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },
];
