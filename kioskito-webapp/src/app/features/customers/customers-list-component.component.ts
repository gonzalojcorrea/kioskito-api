import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActionModalComponent } from '../../shared/modals/action-modal-component';
import { NotificationService } from '../../shared/notifications/notification.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, TableComponent, ToolbarComponent, MatDialogModule],
  template: `
    <app-toolbar
      title="Clientes"
      [showAdd]="true"
      (add)="openModal('create')">
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
    { field: 'status', header: 'Estado', type: 'status' } // ✅ nuevo campo
  ];

  actions: TableAction[] = [
    { action: 'view', type: ActionDefault.View },
    { action: 'edit', type: ActionDefault.Edit },
    { action: 'delete', type: ActionDefault.Delete }
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

  /** 🔹 Abre modal según acción (crear, editar, eliminar o ver) */
  openModal(action: 'create' | 'edit' | 'delete' | 'view', customer?: Customer) {
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
          { name: 'status', label: 'Estado', type: 'boolean' } // ✅ agregado al modal
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
}
