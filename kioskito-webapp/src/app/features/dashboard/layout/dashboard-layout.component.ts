import { Component } from '@angular/core';
import { ShellComponent } from '../../../shared/layout/shell.component';
import { NavItem } from '../../../shared/layout/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [ShellComponent],
  template: `<app-shell [title]="''" [items]="menu"></app-shell>`
})
export class DashboardLayoutComponent {
  menu: NavItem[] = [
    { label: 'Inventario', icon: 'inventory_2', path: 'articulos' },
    { label: 'Clientes', icon: 'groups', path: 'clientes' },
    { label: 'Usuarios', icon: 'people', path: 'usuarios' }
  ];
}
