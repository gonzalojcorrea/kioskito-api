import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent, NavItem } from './sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, RouterLink,
    MatSidenavModule, MatToolbarModule, MatListModule, MatButtonModule, MatIconModule,
    SidebarComponent
  ],
  template: `
  <mat-sidenav-container class="shell">
    <!-- Sidebar -->
    <mat-sidenav mode="side" opened class="sidenav">
      <app-sidebar [items]="items"></app-sidebar>
    </mat-sidenav>

    <!-- Contenido principal -->
    <mat-sidenav-content>
      <!-- Toolbar superior -->
      <mat-toolbar color="primary" class="toolbar">
        <span class="logo">{{ title }}</span>
        <span class="spacer"></span>
        <a mat-button routerLink="/dashboard/home">Home</a>
        <button mat-button (click)="logout()">Logout ({{ auth.email() }})</button>
      </mat-toolbar>

      <!-- Aquí se cargan las vistas -->
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [`
    .shell { height: 100vh; }
    .sidenav { width: 240px; }
    .toolbar { position: sticky; top: 0; z-index: 100; }
    .spacer { flex: 1 1 auto; }
    .content { padding: 16px; }
  `]
})
export class ShellComponent {
  @Input() title = 'Kioskito';
  @Input() items: NavItem[] = [];

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
