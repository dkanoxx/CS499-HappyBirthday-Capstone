import { Routes } from '@angular/router';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Dashboard } from './pages/dashboard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.me().pipe(map(() => true), catchError(() => of(router.createUrlTree(['/login']))));
};
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' }
];
