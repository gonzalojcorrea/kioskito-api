import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, TableComponent, ToolbarComponent],
  template: `
    <app-toolbar
      title="Artículos"
      [showAdd]="true"
      (add)="agregar()">
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
    { field: 'status', header: 'Estado', type: 'status' }
  ];

  // 🔥 Acciones: usando el enum ActionDefault
  actions: TableAction[] = [
    { action: 'view', type: ActionDefault.View },
    { action: 'edit', type: ActionDefault.Edit },
    { action: 'delete', type: ActionDefault.Delete },
    // Ejemplo extra (custom)
    { action: 'duplicate', label: 'Prueba', icon: 'content_copy' }
  ];

  data: Article[] = [];

  constructor(private svc: ArticleService) {
    this.refresh();
  }

  refresh() {
    this.svc.getAll().subscribe({
      next: (res) => this.data = res,
      error: (err) => console.error('Error cargando artículos', err)
    });
  }

  agregar() {
    const nuevo: Article = {
      id: '', // lo genera el back
      name: 'Nuevo artículo',
      sku: 'SKU' + Math.floor(Math.random() * 1000),
      salePrice: 0,
      consignmentPrice: 0,
      isActive: true
    };
    this.svc.create(nuevo).subscribe(() => this.refresh());
  }

  onAction(e: { action: string, row: Article }) {
    switch (e.action) {
      case 'view':
        console.log('Ver detalle:', e.row);
        break;
      case 'edit':
        console.log('Editar:', e.row);
        break;
      case 'delete':
        this.svc.delete(e.row.id).subscribe(() => this.refresh());
        break;
      case 'duplicate':
        console.log('Duplicar artículo:', e.row);
        break;
    }
  }
}
