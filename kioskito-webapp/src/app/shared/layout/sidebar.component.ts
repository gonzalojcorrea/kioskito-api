import { Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

export interface NavItem {
  label: string;     // Texto a mostrar
  icon?: string;     // Icono de Angular Material (ej: "home", "inventory_2")
  path?: string;     // Ruta (relativa al layout)
  children?: NavItem[]; // Submenú opcional
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      <ng-container *ngFor="let item of items">
        
        <!-- Item simple -->
        <a mat-list-item
           *ngIf="!item.children?.length"
           [routerLink]="item.path"
           routerLinkActive="active">
          <mat-icon *ngIf="item.icon">{{ item.icon }}</mat-icon>
          <span>{{ item.label }}</span>
        </a>

        <!-- Grupo con hijos -->
        <div *ngIf="item.children?.length">
          <p class="group-title">
            <mat-icon *ngIf="item.icon">{{ item.icon }}</mat-icon>
            {{ item.label }}
          </p>
          <mat-nav-list>
            <a mat-list-item
               *ngFor="let child of item.children"
               [routerLink]="child.path"
               routerLinkActive="active">
              <mat-icon *ngIf="child.icon">{{ child.icon }}</mat-icon>
              <span>{{ child.label }}</span>
            </a>
          </mat-nav-list>
        </div>
      </ng-container>
    </mat-nav-list>
  `,
  styles: [`
    :host { display: block; }
    a.active { background: rgba(0,0,0,0.1); }
    mat-icon { margin-right: 8px; }
    .group-title {
      font-weight: 600;
      margin: 8px 0 4px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class SidebarComponent {
  @Input() items: NavItem[] = [];
}
