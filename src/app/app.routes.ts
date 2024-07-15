import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './login/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./todoList/components/home/home.page').then(m => m.HomePage),
  },
  {
      path: 'login',
      canActivate: [loginGuard],
      loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
      path: '**',
      redirectTo: 'login',
  },
];
