import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { SearchFilterBarComponent, FilterOption } from '../../shared/search-filter-bar/search-filter-bar.component';
import { InventoryService } from '../../services/inventory.service';
import { ArticleService } from '../../services/article.service';
import { Inventory } from '../../models/inventory.model';
import { InventoryDetailModalComponent } from './inventory-detail-modal/inventory-detail-modal.component';
import { AddArticleModalComponent } from './add-article-modal/add-article-modal.component';
import { EditArticleModalComponent } from './edit-article-modal/edit-article-modal.component';
import { DeleteArticleModalComponent } from './delete-article-modal/delete-article-modal.component';
import { NotificationService } from '../../shared/notifications/notification.service';

@Component({
  selector: 'app-articles-list',
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
      placeholder="Buscar por nombre, SKU o código..."
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
      (actionClicked)="onActionFromTable($event)"
      (pageChanged)="onPageChanged($event)">
    </app-table>
  `
})
export class ArticlesListComponent {
  columns: TableColumn[] = [
    { field: 'sku', header: 'SKU', type: 'text' },
    { field: 'articleName', header: 'Nombre Artículo', type: 'text' },
    { field: 'lastPurchasePrice', header: 'P. Compra', type: 'currency' },
    { field: 'salePrice', header: 'P. Venta', type: 'currency' },
    { field: 'consignmentPrice', header: 'P. Consignación', type: 'currency' },
    { field: 'quantity', header: 'Cantidad', type: 'number' },
    { field: 'status', header: 'Estado Inventario', type: 'status' }
  ];

  actions: TableAction[] = [
    { action: 'view', type: ActionDefault.View },
    { action: 'edit', type: ActionDefault.Edit },
    { action: 'delete', type: ActionDefault.Delete }
  ];

  filters: FilterOption[] = [
    { label: 'Stock Bajo', value: 'low-stock', icon: 'warning', color: 'warn' },
    { label: 'Precio Alto', value: 'high-price', icon: 'trending_up', color: 'accent' },
    { label: 'Sin Stock', value: 'no-stock', icon: 'remove_circle', color: 'warn' },
    { label: 'Disponible', value: 'available', icon: 'check_circle', color: 'primary' }
  ];

  data: Inventory[] = [];
  filteredData: Inventory[] = [];
  pagedData: Inventory[] = [];
  pageSize = 10;
  pageIndex = 0;
  searchText = '';
  activeFilter = '';

  constructor(
    private inventorySvc: InventoryService,
    private articleSvc: ArticleService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {
    this.refresh();
  }

  refresh() {
    this.inventorySvc.getAll().subscribe({
      next: (res) => {
        this.data = res;
        this.applyFilters();
      },
      error: () => this.notify.error('Error cargando inventario')
    });
  }

  /** Aplica búsqueda y filtros */
  applyFilters() {
    let result = [...this.data];

    // Aplicar búsqueda por texto
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      result = result.filter(item =>
        item.articleName?.toLowerCase().includes(search) ||
        item.sku?.toLowerCase().includes(search)
      );
    }

    // Aplicar filtro predeterminado
    if (this.activeFilter) {
      switch (this.activeFilter) {
        case 'low-stock':
          result = result.filter(item => item.quantity > 0 && item.quantity <= 10);
          break;
        case 'high-price':
          result = result.filter(item => (item.salePrice || 0) > 1000);
          break;
        case 'no-stock':
          result = result.filter(item => item.quantity === 0);
          break;
        case 'available':
          result = result.filter(item => item.quantity > 0);
          break;
      }
    }

    this.filteredData = result;
    this.pageIndex = 0; // Reset a primera página
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

  /** Actualiza los datos paginados según el índice y tamaño de página */
  updatePagedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.filteredData.slice(start, end);
  }

  /** Maneja el cambio de página/tamaño desde el paginador */
  onPageChanged(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedData();
  }

  /** 🔹 Abre modal según acción (crear, editar, eliminar o ver) */
  openModal(action: 'create' | 'edit' | 'delete' | 'view', inventory?: Inventory) {
    // Si es acción 'ver', abrir el modal detallado
    if (action === 'view' && inventory) {
      this.dialog.open(InventoryDetailModalComponent, {
        width: '900px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        data: { inventory }
      });
      return;
    }

    // Si es crear artículo, usar el modal especializado
    if (action === 'create') {
      const dialogRef = this.dialog.open(AddArticleModalComponent, {
        width: '700px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        disableClose: false
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (!result) return;

        this.articleSvc.create(result.value).subscribe({
          next: () => {
            this.refresh();
            this.notify.success('Artículo creado correctamente');
          },
          error: () => this.notify.error('Error al crear el artículo')
        });
      });
      return;
    }

    // Si es editar artículo, usar el modal de edición
    if (action === 'edit' && inventory) {
      const dialogRef = this.dialog.open(EditArticleModalComponent, {
        width: '700px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        disableClose: false,
        data: { inventory }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (!result) return;

        const updateData = {
          id: inventory.articleId,
          name: result.value.name,
          description: result.value.description || '',
          sku: result.value.sku || '',
          salePrice: result.value.salePrice,
          consignmentPrice: result.value.consignmentPrice || 0
        };

        this.articleSvc.update(inventory.articleId, updateData as any).subscribe({
          next: () => {
            this.refresh();
            this.notify.success('Artículo actualizado correctamente');
          },
          error: () => this.notify.error('Error al actualizar el artículo')
        });
      });
      return;
    }

    // Si es eliminar artículo, usar el modal de confirmación
    if (action === 'delete' && inventory) {
      const dialogRef = this.dialog.open(DeleteArticleModalComponent, {
        width: '500px',
        maxWidth: '95vw',
        disableClose: false,
        data: { inventory }
      });

      dialogRef.afterClosed().subscribe((confirmed) => {
        if (!confirmed) return;

        this.articleSvc.delete(inventory.articleId).subscribe({
          next: () => {
            this.refresh();
            this.notify.success('Artículo eliminado correctamente');
          },
          error: () => this.notify.error('Error al eliminar el artículo')
        });
      });
      return;
    }
  }

  /** 🔹 Interacción desde la tabla */
  onActionFromTable(event: { action: string; row: Inventory }) {
    this.openModal(event.action as any, event.row);
  }
}
