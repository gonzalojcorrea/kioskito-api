import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { ToolbarComponent, ToolbarAction } from '../../shared/toolbar/toolbar.component';
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
  imports: [CommonModule, TableComponent, ToolbarComponent, MatDialogModule],
  template: `
    <app-toolbar
      title="Clientes"
      [showAdd]="true"
      [actions]="toolbarActions"
      (add)="openModal('create')"
      (actionClicked)="onToolbarAction($event)">
    </app-toolbar>

    <app-table
      [columns]="columns"
      [data]="data"
      [actions]="actions"
      [totalItems]="data.length"
      (actionClicked)="onAction($event)">
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

  /** 🔹 Acciones extras del toolbar */
  toolbarActions: ToolbarAction[] = [
    { icon: 'map', label: 'Ver mapa', action: 'view-map' }
  ];

  data: Customer[] = [];

  constructor(
    private svc: CustomerService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {
    this.refresh();
  }

  refresh() {
    this.svc.getAll().subscribe({
      next: (res) => (this.data = res),
      error: () => this.notify.error('Error cargando clientes')
    });
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

  /** 🔹 Maneja las acciones personalizadas del toolbar */
  onToolbarAction(action: string) {
    if (action === 'view-map') this.openMap();
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
