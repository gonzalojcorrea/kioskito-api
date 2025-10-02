import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ToolbarAction {
  icon: string;
  label: string;
  action: string;
}

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() title = '';
  @Input() showAdd = false;
  @Input() addLabel = 'Nuevo Registro';
  @Input() actions: ToolbarAction[] = [];

  @Output() add = new EventEmitter<void>();
  @Output() actionClicked = new EventEmitter<string>();
}
