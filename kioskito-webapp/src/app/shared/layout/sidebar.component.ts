import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    <div class="sidebar-container">
      
      <!-- Logo -->
      <div class="logo-section">
        <img src="assets/logo/logo.png" alt="Kioskito" class="logo" />
      </div>

      <!-- Menú principal -->
      <mat-nav-list class="sidebar-list">
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

      <!-- Logout -->
      <div class="logout-section">
        <a mat-list-item (click)="logout.emit()">
          <mat-icon>logout</mat-icon>
          <span>Cerrar sesión</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      background: linear-gradient(180deg, #0f2b4c, #1a3d66);
      color: #fff;
    }

    .sidebar-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .logo-section {
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo {
      width: 120px;
      height: auto;
    }

    .sidebar-list {
      flex: 1;
      padding: 0;
    }

    .logout-section {
      padding: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    a.mat-list-item {
      border-radius: 6px;
      margin: 4px 8px;
      font-weight: 500;
      color: #fff !important;
    }

    a.mat-list-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    a.active {
      background: rgba(255, 255, 255, 0.2);
      border-left: 4px solid #42a5f5;
      color: #fff !important;
    }

    mat-icon {
      margin-right: 12px;
      color: #fff !important;
    }

    .group-title {
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
      padding: 12px 16px 4px;
      color: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* 🔥 Alineación de icono + label */
    ::ng-deep .mat-mdc-list-item .mdc-list-item__content {
      display: flex !important;
      align-items: center !important;
      gap: 12px;
    }

    ::ng-deep .mat-mdc-list-item .mdc-list-item__primary-text {
      display: flex;
      align-items: center;
      color: #fff !important;
    }
  `]
})
export class SidebarComponent {
  @Input() items: NavItem[] = [];
  @Output() logout = new EventEmitter<void>();
}
