import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
  { path: 'products', loadComponent: () => import('./features/products/products.component').then(m => m.ProductsComponent), canActivate: [AuthGuard] },
  { path: 'todos', loadComponent: () => import('./features/todos/todos.component').then(m => m.TodosComponent), canActivate: [AuthGuard] },
  { path: 'admins', loadComponent: () => import('./features/admins/admins.component').then(m => m.AdminsComponent), canActivate: [AuthGuard] }
];
