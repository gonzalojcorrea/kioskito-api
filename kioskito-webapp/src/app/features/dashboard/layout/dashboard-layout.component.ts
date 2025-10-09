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
    { label: 'Artículos', icon: 'move_up', path: 'articulos' },
    { label: 'Inventarios', icon: 'inventory_2', path: 'inventarios' },
    { label: 'Clientes', icon: 'people', path: 'clientes' }
  ];
}
