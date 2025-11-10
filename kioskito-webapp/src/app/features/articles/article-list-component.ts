import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { InventoryService } from '../../services/inventory.service';
import { ArticleService } from '../../services/article.service';
import { Inventory } from '../../models/inventory.model';
import { ActionModalComponent } from '../../shared/modals/action-modal-component';
import { InventoryDetailModalComponent } from './inventory-detail-modal/inventory-detail-modal.component';
import { AddArticleModalComponent } from './add-article-modal/add-article-modal.component';
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
      [data]="data"
      [actions]="actions"
      [totalItems]="data.length"
      (actionClicked)="onActionFromTable($event)">
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
      },
      error: () => this.notify.error('Error cargando inventario')
    });
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
        width: '600px',
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

    // Para otras acciones (edit, delete), usar el modal genérico
    const dialogRef = this.dialog.open(ActionModalComponent, {
      width: '500px',
      data: {
        entity: 'Artículo',
        action,
        fields: [
          { name: 'name', label: 'Nombre', type: 'text', required: true },
          { name: 'description', label: 'Descripción', type: 'text' },
          { name: 'sku', label: 'SKU', type: 'text' },
          { name: 'salePrice', label: 'Precio Venta', type: 'number' },
          { name: 'consignmentPrice', label: 'Precio Consignación', type: 'number' },
          { name: 'unitCost', label: 'Costo Unitario', type: 'number', required: true },
          { name: 'initialQuantity', label: 'Cantidad Inicial', type: 'number', required: true },
          { name: 'minStock', label: 'Stock Mínimo', type: 'number', required: true },
          { name: 'status', label: 'Estado', type: 'boolean' }
        ],
        value: inventory ? {
          name: inventory.articleName,
          sku: inventory.sku,
          lastPurchasePrice: inventory.lastPurchasePrice,
          salePrice: inventory.salePrice,
          consignmentPrice: inventory.consignmentPrice,
          quantity: inventory.quantity,
          status: inventory.status === 'Activo'
        } : undefined
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      switch (result.action) {
        case 'create':
          this.articleSvc.create(result.value).subscribe({
            next: () => {
              this.refresh();
              this.notify.success('Artículo creado correctamente');
            },
            error: () => this.notify.error('Error al crear el artículo')
          });
          break;

        case 'edit':
          if (inventory)
            this.articleSvc.update(inventory.articleId, result.value).subscribe({
              next: () => {
                this.refresh();
                this.notify.success('Artículo actualizado correctamente');
              },
              error: () => this.notify.error('Error al actualizar el artículo')
            });
          break;

        case 'delete':
          if (inventory) {
            const confirmed = await this.notify.confirm(
              'Eliminar artículo',
              `¿Estás seguro de eliminar "${inventory.articleName}"?`
            );
            if (!confirmed) return;

            this.articleSvc.delete(inventory.articleId).subscribe({
              next: () => {
                this.refresh();
                this.notify.success('Artículo eliminado correctamente');
              },
              error: () => this.notify.error('Error al eliminar el artículo')
            });
          }
          break;
      }
    });
  }

  /** 🔹 Interacción desde la tabla */
  onActionFromTable(event: { action: string; row: Inventory }) {
    this.openModal(event.action as any, event.row);
  }
}
