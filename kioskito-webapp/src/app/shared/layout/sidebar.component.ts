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
      background: linear-gradient(180deg, #1e3a5f 0%, #0f2744 100%);
      color: #fff;
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
    }

    .sidebar-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .sidebar-container::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    .sidebar-container::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }

    .sidebar-container::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .logo-section {
      padding: 24px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logo {
      width: 140px;
      height: auto;
      filter: brightness(1.1) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
    }

    /* 🔹 Usuario conectado */
    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.15);
      font-size: 14px;
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
    }

    .user-info mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
      color: #ffd700;
      filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3));
    }

    .user-name {
      font-weight: 700;
      line-height: 1.3;
      font-size: 15px;
      letter-spacing: 0.3px;
    }

    .user-role {
      font-size: 11px;
      opacity: 0.75;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .sidebar-list {
      flex: 1;
      padding: 12px 0;
    }

    /* 🔹 Logout section */
    .logout-section {
      padding: 12px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(0, 0, 0, 0.1);
    }

    /* 🔹 Logout button */
    .logout-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      color: #fff !important;
      font-weight: 600;
      text-decoration: none;
      border-radius: 10px;
      margin: 4px 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }

    .logout-btn:hover {
      background: linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(211, 47, 47, 0.2) 100%);
      border-color: rgba(244, 67, 54, 0.3);
      transform: translateX(4px);
    }

    .logout-btn mat-icon {
      color: #ff6b6b !important;
      transition: transform 0.3s ease;
    }

    .logout-btn:hover mat-icon {
      transform: rotate(-10deg);
    }

    a.mat-list-item {
      border-radius: 10px;
      margin: 6px 12px;
      font-weight: 500;
      color: #fff !important;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      border: 1px solid transparent;
    }

    a.mat-list-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0;
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.3) 0%, transparent 100%);
      transition: width 0.3s ease;
    }

    a.mat-list-item:hover::before {
      width: 100%;
    }

    a.mat-list-item:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
    }

    a.active {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.25) 100%);
      border-left: 4px solid #667eea;
      color: #ffffff !important;
      font-weight: 700;
      box-shadow: 0 2px 12px rgba(102, 126, 234, 0.3);
    }

    a.active::before {
      width: 100%;
    }

    mat-icon {
      margin-right: 12px;
      color: #b8c7e0 !important;
      transition: all 0.3s ease;
    }

    a.mat-list-item:hover mat-icon {
      color: #fff !important;
      transform: scale(1.1);
    }

    a.active mat-icon {
      color: #ffffff !important;
    }

    .group-title {
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      padding: 16px 20px 8px;
      color: rgba(255, 255, 255, 0.6);
      display: flex;
      align-items: center;
      gap: 8px;
      letter-spacing: 1px;
      margin-top: 8px;
    }

    .group-title mat-icon {
      font-size: 18px;
      opacity: 0.7;
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
      font-weight: 500;
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
