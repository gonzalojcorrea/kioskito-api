
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent, TableColumn, TableAction } from '../../shared/table/table.component';
import { ArticlesService } from '../../services/articles.service';
import { Article} from '../../models/article.model';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TableComponent],
  template: `
    <div class="toolbar">
      <h2>Artículos</h2>
      <button mat-raised-button (click)="agregar()">
        <mat-icon>add</mat-icon> Agregar artículo
      </button>
    </div>

    <app-table
      [columns]="columns"
      [data]="data"
      [actions]="actions"
      [totalItems]="data.length"
      (actionClicked)="onAction($event)">
    </app-table>
  `,
  styles: [`
    .toolbar {
      display: flex; align-items: center; justify-content: space-between;
      margin: 16px 0;
    }
  `]
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

  refresh() { this.data = this.svc.getAll(); }

  agregar() {
    // Mock rápido: agrega uno de ejemplo. Luego lo cambiamos por modal + formulario.
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
      // Próximo paso: abrir modal de edición
      console.log('Editar:', e.row);
    }
  }
}
