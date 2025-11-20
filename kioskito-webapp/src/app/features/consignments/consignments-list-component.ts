import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { SearchFilterBarComponent, FilterOption } from '../../shared/search-filter-bar/search-filter-bar.component';
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
    SearchFilterBarComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <app-search-filter-bar
      placeholder="Buscar por cliente o ID..."
      [filters]="filters"
      (searchChanged)="onSearchChanged($event)"
      (filterSelected)="onFilterSelected($event)">
      <div appSearchActions>
        <button mat-raised-button color="primary" (click)="openAddModal()">
          <mat-icon>add</mat-icon> Nueva Consignación
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

  filters: FilterOption[] = [
    { label: 'Activas', value: 'active', icon: 'play_circle', color: 'primary' },
    { label: 'Completadas', value: 'completed', icon: 'check_circle', color: 'accent' },
    { label: 'Canceladas', value: 'cancelled', icon: 'cancel', color: 'warn' },
    { label: 'Próximas a vencer', value: 'expiring', icon: 'schedule', color: 'warn' }
  ];

  data: Consignment[] = [];
  filteredData: Consignment[] = [];
  pagedData: Consignment[] = [];
  pageSize = 10;
  pageIndex = 0;
  searchText = '';
  activeFilter = '';

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
        this.applyFilters();
      },
      error: () => this.notify.error('Error cargando consignaciones')
    });
  }

  applyFilters() {
    let result = [...this.data];

    // Aplicar búsqueda por texto
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      result = result.filter(item =>
        item.customerName?.toLowerCase().includes(search) ||
        item.consignmentId?.toLowerCase().includes(search)
      );
    }

    // Aplicar filtro predeterminado
    if (this.activeFilter) {
      const now = new Date();
      const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      switch (this.activeFilter) {
        case 'active':
          result = result.filter(item => item.status?.toLowerCase() === 'active' || item.status?.toLowerCase() === 'activa');
          break;
        case 'completed':
          result = result.filter(item => item.status?.toLowerCase() === 'completed' || item.status?.toLowerCase() === 'completada');
          break;
        case 'cancelled':
          result = result.filter(item => item.status?.toLowerCase() === 'cancelled' || item.status?.toLowerCase() === 'cancelada');
          break;
        case 'expiring':
          result = result.filter(item => {
            if (!item.endDate) return false;
            const endDate = new Date(item.endDate);
            return endDate >= now && endDate <= sevenDaysFromNow;
          });
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
