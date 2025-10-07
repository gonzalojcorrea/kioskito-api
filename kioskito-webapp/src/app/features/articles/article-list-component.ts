import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActionModalComponent } from '../../shared/modals/action-modal-component';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, TableComponent, ToolbarComponent, MatDialogModule],
  template: `
    <app-toolbar
      title="Artículos"
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
export class ArticlesListComponent {
  columns: TableColumn[] = [
    { field: 'name', header: 'Nombre', type: 'text' },
    { field: 'sku', header: 'SKU', type: 'text' },
    { field: 'salePrice', header: 'Precio Venta', type: 'currency' },
    { field: 'consignmentPrice', header: 'Precio Consignación', type: 'currency' },
    { field: 'isActive', header: 'Estado', type: 'status' }
  ];

  actions: TableAction[] = [
    { action: 'view', type: ActionDefault.View },
    { action: 'edit', type: ActionDefault.Edit },
    { action: 'delete', type: ActionDefault.Delete }
  ];

  data: Article[] = [];

  constructor(private svc: ArticleService, private dialog: MatDialog) {
    this.refresh();
  }

  refresh() {
    this.svc.getAll().subscribe({
      next: (res) => this.data = res,
      error: (err) => console.error('Error cargando artículos', err)
    });
  }

  /** 🔹 Abre modal según acción (crear, editar, eliminar o ver) */
  openModal(action: 'create' | 'edit' | 'delete' | 'view', article?: Article) {
    const dialogRef = this.dialog.open(ActionModalComponent, {
      data: {
        entity: 'Artículo',
        action,
        fields: [
          { name: 'name', label: 'Nombre', type: 'text', required: true },
          { name: 'sku', label: 'SKU', type: 'text' },
          { name: 'salePrice', label: 'Precio Venta', type: 'number' },
          { name: 'consignmentPrice', label: 'Precio Consignación', type: 'number' },
          { name: 'isActive', label: 'Activo', type: 'boolean' }
        ],
        value: article
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      switch (result.action) {
        case 'create':
          this.svc.create(result.value).subscribe(() => this.refresh());
          break;
        case 'edit':
          if (article)
            this.svc.update(article.id, result.value).subscribe(() => this.refresh());
          break;
        case 'delete':
          if (article)
            this.svc.delete(article.id).subscribe(() => this.refresh());
          break;
      }
    });
  }

  /** 🔹 Interacción desde la tabla */
  onAction(e: { action: string, row: Article }) {
    switch (e.action) {
      case 'view':
        this.openModal('view', e.row);
        break;
      case 'edit':
        this.openModal('edit', e.row);
        break;
      case 'delete':
        this.openModal('delete', e.row);
        break;
    }
  }
}
