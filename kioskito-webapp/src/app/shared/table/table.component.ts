import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';   // 👈 agregado
import { TableColumn } from './tableColumn';

export interface TableAction {
  action: string;             
  label?: string;              
  icon?: string;               
  type?: ActionDefault;        // 👈 puede ser acción estándar
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
    MatMenuModule              // 👈 agregado
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

  /** 🔥 Devuelve icono según tipo estándar o custom */
  getActionIcon(action: TableAction): string {
    if (action.type === ActionDefault.View) return 'visibility';
    if (action.type === ActionDefault.Edit) return 'edit';
    if (action.type === ActionDefault.Delete) return 'delete';
    return action.icon ?? 'help';
  }

  /** 🔥 Devuelve label según tipo estándar o custom */
  getActionLabel(action: TableAction): string {
    if (action.type === ActionDefault.View) return 'Ver';
    if (action.type === ActionDefault.Edit) return 'Editar';
    if (action.type === ActionDefault.Delete) return 'Eliminar';
    return action.label ?? 'Acción';
  }
}

export { TableColumn };
