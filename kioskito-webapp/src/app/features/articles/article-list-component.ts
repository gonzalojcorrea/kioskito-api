import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn, TableAction } from '../../shared/table/table.component';
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

  actions: TableAction[] = [
    { icon: 'edit', label: 'Editar', action: 'edit' },
    { icon: 'delete', label: 'Eliminar', action: 'delete' },
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
    if (e.action === 'delete') {
      this.svc.delete(e.row.id).subscribe(() => this.refresh());
    }
    if (e.action === 'edit') {
      console.log('Editar:', e.row);
    }
  }
}
