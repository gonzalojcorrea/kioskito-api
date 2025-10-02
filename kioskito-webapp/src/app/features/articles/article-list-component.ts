import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn, TableAction } from '../../shared/table/table.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { ArticlesService } from '../../services/articles.service';
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
    { field: 'codigo', header: 'Código' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'categoria', header: 'Categoría' },
    { field: 'precio', header: 'Precio' },
    { field: 'activo', header: 'Activo' },
  ];

  actions: TableAction[] = [
    { icon: 'edit', label: 'Editar', action: 'edit' },
    { icon: 'delete', label: 'Eliminar', action: 'delete' },
  ];

  data: Article[] = [];

  constructor(private svc: ArticlesService) {
    this.refresh();
  }

  refresh() {
    this.data = this.svc.getAll();
  }

  agregar() {
    const nuevo: Article = {
      codigo: Math.floor(Math.random() * 9000) + 1000,
      nombre: 'Nuevo artículo',
      categoria: 'General',
      precio: 0,
      activo: true,
      fechaAlta: new Date().toISOString()
    };
    this.svc.add(nuevo);
    this.refresh();
  }

  onAction(e: { action: string, row: Article }) {
    if (e.action === 'delete') {
      this.svc.remove(e.row.codigo);
      this.refresh();
    }
    if (e.action === 'edit') {
      console.log('Editar:', e.row);
    }
  }
}
