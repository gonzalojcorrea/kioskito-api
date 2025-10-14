import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../notifications/notification.service';
import { AuthService } from '../../core/auth/auth.service';

export interface NavItem {
  label: string;
  icon?: string;
  path?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  template: `
    <div class="sidebar-container">
      
      <!-- 🔹 Logo -->
      <div class="logo-section">
        <img src="assets/logo/logo.png" alt="Kioskito" class="logo" />
      </div>

      <!-- 🔹 Usuario conectado -->
      <div class="user-info" *ngIf="userName">
        <mat-icon>person</mat-icon>
        <div>
          <div class="user-name">{{ userName }}</div>
          <div class="user-role">{{ userRole }}</div>
        </div>
      </div>

      <!-- 🔹 Menú principal -->
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

      <!-- 🔹 Logout -->
      <mat-nav-list class="logout-section">
        <a class="logout-btn" (click)="confirmLogout()">
          <mat-icon>logout</mat-icon>
          <span>Cerrar sesión</span>
        </a>
      </mat-nav-list>
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

    /* 🔹 Usuario conectado */
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      font-size: 14px;
      color: #fff;
    }

    .user-info mat-icon {
      font-size: 22px;
      color: #fff;
    }

    .user-name {
      font-weight: 600;
      line-height: 1.2;
    }

    .user-role {
      font-size: 12px;
      opacity: 0.8;
    }

    .sidebar-list {
      flex: 1;
      padding: 0;
    }

    /* 🔹 Logout section */
    .logout-section {
      padding: 8px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* 🔹 Logout button (ahora actúa como link, con cursor y hover igual que los demás) */
    .logout-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      color: #fff !important;
      font-weight: 500;
      text-decoration: none;
      border-radius: 6px;
      margin: 4px 8px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .logout-btn:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    .logout-btn mat-icon {
      color: #fff !important;
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

  userName = '';
  userRole = '';

  constructor(private notify: NotificationService, private auth: AuthService) {
    const user = this.auth.getUser();
    this.userName = user?.name || '';
    this.userRole = user?.role || '';
  }

  async confirmLogout() {
    const confirmed = await this.notify.confirm(
      'Cerrar sesión',
      '¿Estás seguro de salir del sistema?'
    );
    if (confirmed) this.logout.emit();
  }
}
