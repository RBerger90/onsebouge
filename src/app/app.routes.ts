import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'goals', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },

  {
    path: 'goals',
    loadComponent: () => import('./features/goals/goals-list/goals-list').then((m) => m.GoalsList),
    canActivate: [authGuard],
  },
  {
    path: 'goals/new',
    loadComponent: () =>
      import('./features/goals/goal-create/goal-create').then((m) => m.GoalCreate),
    canActivate: [authGuard],
  },
  {
    path: 'goals/:goalId',
    loadComponent: () =>
      import('./features/goals/goal-detail/goal-detail').then((m) => m.GoalDetail),
    canActivate: [authGuard],
  },

  { path: '**', redirectTo: 'goals' },
];
