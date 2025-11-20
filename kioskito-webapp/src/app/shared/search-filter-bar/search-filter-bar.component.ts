import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

export interface FilterOption {
  label: string;
  value: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
}

@Component({
  selector: 'app-search-filter-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.css']
})
export class SearchFilterBarComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() filters: FilterOption[] = [];
  @Output() searchChanged = new EventEmitter<string>();
  @Output() filterSelected = new EventEmitter<string>();

  searchText: string = '';
  activeFilter: string | null = null;

  onSearchChange() {
    this.searchChanged.emit(this.searchText);
  }

  onFilterClick(filterValue: string) {
    // Toggle: si el filtro está activo, desactivarlo
    if (this.activeFilter === filterValue) {
      this.activeFilter = null;
      this.filterSelected.emit('');
    } else {
      this.activeFilter = filterValue;
      this.filterSelected.emit(filterValue);
    }
  }

  clearSearch() {
    this.searchText = '';
    this.onSearchChange();
  }

  isFilterActive(filterValue: string): boolean {
    return this.activeFilter === filterValue;
  }
}
