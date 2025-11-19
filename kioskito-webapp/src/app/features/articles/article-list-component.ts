import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
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
    ToolbarComponent,
    MatDialogModule
  ],
  template: `
    <app-toolbar
      title="Inventario"
      [showAdd]="true"
      (add)="openModal('create')">
    </app-toolbar>

    <app-table
      [columns]="columns"
      [data]="pagedData"
      [actions]="actions"
      [totalItems]="data.length"
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

  data: Inventory[] = [];
  pagedData: Inventory[] = [];
  pageSize = 10;
  pageIndex = 0;

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
        this.updatePagedData();
      },
      error: () => this.notify.error('Error cargando inventario')
    });
  }

  /** Actualiza los datos paginados según el índice y tamaño de página */
  updatePagedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.data.slice(start, end);
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
