import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./home/dashboard-home.component').then(m => m.DashboardHomeComponent) }
    ]
  }
];
