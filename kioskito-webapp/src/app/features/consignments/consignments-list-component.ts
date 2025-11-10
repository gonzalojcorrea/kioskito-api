import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { ConsignmentService } from '../../services/consignment.service';
import { Consignment } from '../../models/consignment.model';
import { NotificationService } from '../../shared/notifications/notification.service';
import { AddConsignmentModalComponent } from './add-consignment-modal/add-consignment-modal.component';
import { ConsignmentDetailModalComponent } from './consignment-detail-modal/consignment-detail-modal.component';

@Component({
  selector: 'app-consignments-list',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ToolbarComponent,
    MatDialogModule
  ],
  template: `
    <app-toolbar
      title="Consignaciones"
      [showAdd]="true"
      addLabel="Nueva Consignación"
      (add)="openAddModal()">
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
export class ConsignmentsListComponent {
  columns: TableColumn[] = [
    { field: 'startDate', header: 'Fecha Inicio', type: 'date' },
    { field: 'endDate', header: 'Fecha Cierre', type: 'date' },
    { field: 'customerName', header: 'Cliente', type: 'text' },
    { field: 'total', header: 'Total', type: 'currency' },
    { field: 'status', header: 'Estado', type: 'status' }
  ];

  actions: TableAction[] = [
    { action: 'view', type: ActionDefault.View },
    { action: 'edit', type: ActionDefault.Edit },
    { action: 'delete', type: ActionDefault.Delete }
  ];

  data: Consignment[] = [];

  constructor(
    private consignmentSvc: ConsignmentService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {
    this.refresh();
  }

  refresh() {
    this.consignmentSvc.getAll().subscribe({
      next: (res) => {
        this.data = res;
      },
      error: () => this.notify.error('Error cargando consignaciones')
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddConsignmentModalComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.consignmentSvc.create(result).subscribe({
          next: () => {
            this.refresh();
            this.notify.success('Consignación creada correctamente');
          },
          error: () => this.notify.error('Error al crear la consignación')
        });
      }
    });
  }

  openDetailModal(consignment: Consignment) {
    this.dialog.open(ConsignmentDetailModalComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { consignment }
    });
  }

  async onAction(event: { action: string; row: Consignment }) {
    const { action, row } = event;

    switch (action) {
      case 'view':
        this.openDetailModal(row);
        break;

      case 'edit':
        // TODO: Implementar edición
        this.notify.error('Funcionalidad en desarrollo');
        break;

      case 'delete':
        const confirmed = await this.notify.confirm(
          'Eliminar consignación',
          `¿Estás seguro de eliminar la consignación del cliente "${row.customerName}"?`
        );
        if (!confirmed) return;

        this.consignmentSvc.delete(row.consignmentId).subscribe({
          next: () => {
            this.refresh();
            this.notify.success('Consignación eliminada correctamente');
          },
          error: () => this.notify.error('Error al eliminar la consignación')
        });
        break;
    }
  }
}
