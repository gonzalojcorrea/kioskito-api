import { Routes } from '@angular/router';

export const CONSIGNMENT_CLOSURE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./customer-list-closure/customer-list-closure.component').then(
        m => m.CustomerListClosureComponent
      )
  },
  {
    path: 'cerrar/:id',
    loadComponent: () =>
      import('./closure-form/closure-form.component').then(
        m => m.ClosureFormComponent
      )
  }
];
