import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./home/dashboard-home.component').then(m => m.DashboardHomeComponent)
      },
      {
        path: 'articulos',
        loadComponent: () =>
          import('../articles/article-list-component').then(m => m.ArticlesListComponent)
      },
      // {
      //   path: 'inventarios',
      //   loadComponent: () =>
      //     import('../inventarios/inventario-list.component').then(m => m.InventarioListComponent)
      // },
      { path: '', pathMatch: 'full', redirectTo: 'home' } 
    ]
  }
];
