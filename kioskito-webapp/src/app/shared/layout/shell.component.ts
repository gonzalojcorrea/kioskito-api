import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { SidebarComponent, NavItem } from './sidebar.component';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    SidebarComponent
  ],
  template: `
    <mat-sidenav-container class="shell">
      <!-- Sidebar -->
      <mat-sidenav mode="side" opened class="sidenav">
        <app-sidebar [items]="items" (logout)="logout()"></app-sidebar>
      </mat-sidenav>

      <!-- Contenido principal -->
      <mat-sidenav-content>
        <mat-toolbar color="primary" class="toolbar">
          <span class="view-title">{{ title }}</span>
          <span class="spacer"></span>
        </mat-toolbar>

        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .shell { height: 100vh; }
    .sidenav { width: 240px; }
    .toolbar { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; }
    .spacer { flex: 1 1 auto; }
    .content { padding: 16px; background: #f5f6fa; height: calc(100vh - 64px); overflow: auto; }
    .view-title { font-weight: 600; font-size: 18px; }
    .user-info { display: flex; align-items: center; gap: 6px; font-weight: 500; }
    .user-info mat-icon { font-size: 20px; }
  `]
})
export class ShellComponent {
  @Input() title = 'Kioskito';
  @Input() items: NavItem[] = [];

  userName = '';

  constructor(private auth: AuthService) {
    const user = this.auth.getUser();
    this.userName = user?.name || '';
  }

  logout() {
    this.auth.logout();
  }
}
