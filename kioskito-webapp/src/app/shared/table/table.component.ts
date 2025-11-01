import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TableColumn } from './tableColumn';

export interface TableAction {
  action: string;
  label?: string;
  icon?: string;
  type?: ActionDefault;
}

export enum ActionDefault {
  View = 1,
  Edit = 2,
  Delete = 3
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() pageSize = 10;
  @Input() totalItems = 0;

  @Output() actionClicked = new EventEmitter<{ action: string, row: any }>();
  @Output() pageChanged = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  displayedColumns: string[] = [];
  sortState: { column: string, direction: 'asc' | 'desc' | '' } = { column: '', direction: '' };

  ngOnChanges() {
    this.displayedColumns = this.columns.map(c => c.field);
    if (this.actions.length > 0) {
      this.displayedColumns.push('actions');
    }
  }

  onAction(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }

  onPageChange(event: any) {
    this.pageChanged.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }

  /** 🔹 Ordenamiento visual y funcional */
  sortColumn(col: any) {
    if (this.sortState.column === col.field) {
      this.sortState.direction =
        this.sortState.direction === 'asc'
          ? 'desc'
          : this.sortState.direction === 'desc'
          ? ''
          : 'asc';
    } else {
      this.sortState = { column: col.field, direction: 'asc' };
    }

    if (this.sortState.direction) {
      const dir = this.sortState.direction === 'asc' ? 1 : -1;
      this.data = [...this.data.sort((a, b) =>
        (a[col.field] > b[col.field] ? dir : -dir)
      )];
    } else {
      this.data = [...this.data];
    }
  }

  getSortIcon(field: string): string {
    if (this.sortState.column !== field) return 'unfold_more';
    if (this.sortState.direction === 'asc') return 'arrow_upward';
    if (this.sortState.direction === 'desc') return 'arrow_downward';
    return 'unfold_more';
  }

  /** 🔹 Icono de acción */
  getActionIcon(action: TableAction): string {
    if (action.type === ActionDefault.View) return 'visibility';
    if (action.type === ActionDefault.Edit) return 'edit';
    if (action.type === ActionDefault.Delete) return 'delete';
    return action.icon ?? 'help';
  }

  /** 🔹 Etiqueta de acción */
  getActionLabel(action: TableAction): string {
    if (action.type === ActionDefault.View) return 'Ver';
    if (action.type === ActionDefault.Edit) return 'Editar';
    if (action.type === ActionDefault.Delete) return 'Eliminar';
    return action.label ?? 'Acción';
  }
}

export { TableColumn };
