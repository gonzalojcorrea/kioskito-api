import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableColumn } from './tableColumn';

export interface TableAction {
  icon: string;
  label: string;
  action: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
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
}
export { TableColumn };

