import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { SearchFilterBarComponent, FilterOption } from '../../shared/search-filter-bar/search-filter-bar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActionModalComponent } from '../../shared/modals/action-modal-component';
import { AddCustomerModalComponent } from './add-customer-modal/add-customer-modal.component';
import { CustomerDetailModalComponent } from './customer-detail-modal/customer-detail-modal.component';
import { NotificationService } from '../../shared/notifications/notification.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { MapCustomersComponent } from './map-customers/map-customers.component';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, TableComponent, SearchFilterBarComponent, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <app-search-filter-bar
      placeholder="Buscar por nombre, email o teléfono..."
      [filters]="filters"
      (searchChanged)="onSearchChanged($event)"
      (filterSelected)="onFilterSelected($event)">
      <div appSearchActions>
        <button mat-raised-button color="primary" (click)="openModal('create')">
          <mat-icon>add</mat-icon> Nuevo Registro
        </button>
        <button mat-raised-button (click)="openMap()">
          <mat-icon>map</mat-icon> Ver Mapa
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
export class CustomersListComponent {
  columns: TableColumn[] = [
    { field: 'name', header: 'Nombre', type: 'text' },
    { field: 'email', header: 'Email', type: 'text' },
    { field: 'phone', header: 'Teléfono', type: 'text' },
    { field: 'address', header: 'Dirección', type: 'text' },
    { field: 'status', header: 'Estado', type: 'status' }
  ];

  actions: TableAction[] = [
    { action: 'view', type: ActionDefault.View },
    { action: 'edit', type: ActionDefault.Edit },
    { action: 'delete', type: ActionDefault.Delete }
  ];

  filters: FilterOption[] = [
    { label: 'Activos', value: 'active', icon: 'check_circle', color: 'primary' },
    { label: 'Inactivos', value: 'inactive', icon: 'cancel', color: 'warn' },
    { label: 'Con deuda', value: 'with-debt', icon: 'account_balance_wallet', color: 'accent' }
  ];

  data: Customer[] = [];
  filteredData: Customer[] = [];
  pagedData: Customer[] = [];
  pageSize = 10;
  pageIndex = 0;
  searchText = '';
  activeFilter = '';

  constructor(
    private svc: CustomerService,
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
      error: () => this.notify.error('Error cargando clientes')
    });
  }

  applyFilters() {
    let result = [...this.data];

    // Aplicar búsqueda por texto
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      result = result.filter(item =>
        item.name?.toLowerCase().includes(search) ||
        item.email?.toLowerCase().includes(search) ||
        item.phone?.toLowerCase().includes(search)
      );
    }

    // Aplicar filtro predeterminado
    if (this.activeFilter) {
      switch (this.activeFilter) {
        case 'active':
          result = result.filter(item => item.status?.toLowerCase() === 'active' || item.status?.toLowerCase() === 'activo');
          break;
        case 'inactive':
          result = result.filter(item => item.status?.toLowerCase() === 'inactive' || item.status?.toLowerCase() === 'inactivo');
          break;
        case 'with-debt':
          // Nota: Este filtro requeriría información adicional del backend
          // Por ahora, lo dejamos como placeholder
          result = result.filter(item => item.status?.toLowerCase() === 'active');
          break;
      }
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

  openModal(action: 'create' | 'edit' | 'delete' | 'view', customer?: Customer) {
    // Si es acción 'ver', abrir el modal detallado
    if (action === 'view' && customer) {
      this.dialog.open(CustomerDetailModalComponent, {
        width: '800px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        data: { customer }
      });
      return;
    }

    // Si es crear cliente, usar el modal especializado
    if (action === 'create') {
      const dialogRef = this.dialog.open(AddCustomerModalComponent, {
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
            this.notify.success('Cliente creado correctamente');
          },
          error: () => this.notify.error('Error al crear el cliente')
        });
      });
      return;
    }

    // Para otras acciones (edit, delete), usar el modal genérico
    const dialogRef = this.dialog.open(ActionModalComponent, {
      width: '420px',
      data: {
        entity: 'Cliente',
        action,
        fields: [
          { name: 'name', label: 'Nombre', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'text', required: true },
          { name: 'phone', label: 'Teléfono', type: 'text' },
          { name: 'address', label: 'Dirección', type: 'text' },
          { name: 'status', label: 'Estado', type: 'boolean' }
        ],
        value: customer
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      switch (result.action) {
        case 'create':
          this.svc.create(result.value).subscribe({
            next: () => {
              this.refresh();
              this.notify.success('Cliente creado correctamente');
            },
            error: () => this.notify.error('Error al crear el cliente')
          });
          break;

        case 'edit':
          if (customer)
            this.svc.update(customer.id, result.value).subscribe({
              next: () => {
                this.refresh();
                this.notify.success('Cliente actualizado correctamente');
              },
              error: () => this.notify.error('Error al actualizar el cliente')
            });
          break;

        case 'delete':
          if (customer) {
            const confirmed = await this.notify.confirm(
              'Eliminar cliente',
              `¿Estás seguro de eliminar a "${customer.name}"?`
            );
            if (!confirmed) return;

            this.svc.delete(customer.id).subscribe({
              next: () => {
                this.refresh();
                this.notify.success('Cliente eliminado correctamente');
              },
              error: () => this.notify.error('Error al eliminar el cliente')
            });
          }
          break;
      }
    });
  }

  /** 🔹 Interacción desde la tabla */
  onAction(e: { action: string; row: Customer }) {
    this.openModal(e.action as any, e.row);
  }

  /** 🔹 Abre el modal con el mapa */
  openMap() {
    if (!this.data.length) {
      return;
    }

    this.dialog.open(MapCustomersComponent, {
      width: '95vw',
      height: '90vh',
      maxWidth: '1400px',
      data: this.data
    });
  }
}
