import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
  <div class="layout">
    <mat-toolbar color="primary" class="topbar">
      <span class="logo">Kioskito</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/dashboard">Home</a>
      <button mat-button (click)="logout()">Logout ({{ auth.email() }})</button>
    </mat-toolbar>
    <main class="content">
      <router-outlet />
    </main>
  </div>
  `,
  styles: [`
    .layout {display:flex;flex-direction:column;min-height:100vh;}
    .topbar {position:sticky;top:0;z-index:10;}
    .spacer {flex:1 1 auto;}
    .content {flex:1;padding:1rem;}
  `]
})
export class DashboardLayoutComponent {
  constructor(public auth: AuthService) {}
  logout() { this.auth.logout(); }
}
