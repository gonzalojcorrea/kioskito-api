import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { SearchFilterBarComponent, FilterOption } from '../../shared/search-filter-bar/search-filter-bar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActionModalComponent } from '../../shared/modals/action-modal-component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';
import { NotificationService } from '../../shared/notifications/notification.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, TableComponent, SearchFilterBarComponent, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <app-search-filter-bar
      placeholder="Buscar por nombre, email o rol..."
      [filters]="filters"
      (searchChanged)="onSearchChanged($event)"
      (filterSelected)="onFilterSelected($event)">
      <div appSearchActions>
        <button mat-raised-button color="primary" (click)="openModal('create')">
          <mat-icon>add</mat-icon> Nuevo Registro
        </button>
      </div>
    </app-search-filter-bar>

    <app-table
      [columns]="columns"
      [data]="pagedData"
      [actions]="actions"
      [totalItems]="filteredData.length"
      [pageSize]="pageSize"
      (actionClicked)="onAction($event)"
      (pageChanged)="onPageChanged($event)">
    </app-table>
  `
})
export class UsersListComponent {
  columns: TableColumn[] = [
    { field: 'fullName', header: 'Nombre', type: 'text' },
    { field: 'email', header: 'Email', type: 'text' },
    { field: 'role', header: 'Rol', type: 'text' },
    { field: 'createdAt', header: 'Fecha Creación', type: 'text' }
  ];

  actions: TableAction[] = [
    { action: 'view', type: ActionDefault.View },
    { action: 'edit', type: ActionDefault.Edit },
    { action: 'delete', type: ActionDefault.Delete }
  ];

  filters: FilterOption[] = [
    { label: 'Administradores', value: 'admin', icon: 'admin_panel_settings', color: 'warn' },
    { label: 'Empleados', value: 'employee', icon: 'badge', color: 'primary' },
    { label: 'Vendedores', value: 'seller', icon: 'shopping_cart', color: 'accent' },
    { label: 'Supervisores', value: 'supervisor', icon: 'supervised_user_circle', color: 'primary' }
  ];

  data: User[] = [];
  filteredData: User[] = [];
  pagedData: User[] = [];
  pageSize = 10;
  pageIndex = 0;
  searchText = '';
  activeFilter = '';

  constructor(
    private svc: UserService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {
    this.refresh();
  }

  refresh() {
    this.svc.getAll().subscribe({
      next: (res) => {
        this.data = res;
        this.applyFilters();
      },
      error: () => this.notify.error('Error cargando usuarios')
    });
  }

  applyFilters() {
    let result = [...this.data];

    // Aplicar búsqueda por texto
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      result = result.filter(item =>
        item.fullName?.toLowerCase().includes(search) ||
        item.email?.toLowerCase().includes(search) ||
        item.role?.toLowerCase().includes(search)
      );
    }

    // Aplicar filtro predeterminado
    if (this.activeFilter) {
      result = result.filter(item =>
        item.role?.toLowerCase() === this.activeFilter.toLowerCase()
      );
    }

    this.filteredData = result;
    this.pageIndex = 0;
    this.updatePagedData();
  }

  onSearchChanged(searchText: string) {
    this.searchText = searchText;
    this.applyFilters();
  }

  onFilterSelected(filterValue: string) {
    this.activeFilter = filterValue;
    this.applyFilters();
  }

  updatePagedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.filteredData.slice(start, end);
  }

  onPageChanged(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  openModal(action: 'create' | 'edit' | 'delete' | 'view', user?: User) {
    // Si es acción 'ver', abrir el modal detallado
    if (action === 'view' && user) {
      this.dialog.open(UserDetailModalComponent, {
        width: '800px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        data: { user }
      });
      return;
    }

    // Si es crear usuario, usar el modal especializado
    if (action === 'create') {
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        width: '600px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        disableClose: false
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (!result) return;

        this.svc.create(result.value).subscribe({
          next: () => {
            this.refresh();
            this.notify.success('Usuario creado correctamente');
          },
          error: () => this.notify.error('Error al crear el usuario')
        });
      });
      return;
    }

    // Para otras acciones (edit, delete), usar el modal genérico
    const dialogRef = this.dialog.open(ActionModalComponent, {
      width: '420px',
      data: {
        entity: 'Usuario',
        action,
        fields: [
          { name: 'fullName', label: 'Nombre Completo', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'password', label: 'Contraseña', type: 'password', required: false },
          { name: 'role', label: 'Rol', type: 'text', required: true }
        ],
        value: user
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      switch (result.action) {
        case 'edit':
          if (user)
            this.svc.update(user.id, result.value).subscribe({
              next: () => {
                this.refresh();
                this.notify.success('Usuario actualizado correctamente');
              },
              error: () => this.notify.error('Error al actualizar el usuario')
            });
          break;

        case 'delete':
          if (user) {
            const confirmed = await this.notify.confirm(
              'Eliminar usuario',
              `¿Estás seguro de eliminar "${user.fullName}"?`
            );
            if (!confirmed) return;

            this.svc.delete(user.id).subscribe({
              next: () => {
                this.refresh();
                this.notify.success('Usuario eliminado correctamente');
              },
              error: () => this.notify.error('Error al eliminar el usuario')
            });
          }
          break;
      }
    });
  }

  onAction(e: { action: string; row: User }) {
    this.openModal(e.action as any, e.row);
  }
}
