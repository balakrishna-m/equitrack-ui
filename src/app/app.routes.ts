import { Routes } from '@angular/router';

import { authGuard } from './core/guards/authGuard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },

  {
    path: 'signup',
    loadComponent: () => import('./features/auth/signup/signup').then((m) => m.Signup),
  },

  // Protected area (layout)
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),

    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },

      {
        path: 'portfolio',
        loadComponent: () => import('./features/portfolio/portfolio').then((m) => m.Portfolio),
      },

      {
        path: 'watchlist',
        loadComponent: () => import('./features/watchlist/watchlist').then((m) => m.Watchlist),
      },

      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
      },

      //   {
      //     path: 'transactions',
      //     loadComponent: () =>
      //       import('./features/transactions/transactions')
      //         .then(m => m.Transactions),
      //   },
    ],
  },

  // Catch-all
  {
    path: '**',
    redirectTo: 'login',
  },
];
