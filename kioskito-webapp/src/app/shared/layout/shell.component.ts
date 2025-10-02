import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { SidebarComponent, NavItem } from './sidebar.component';

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
        <app-sidebar [items]="items"></app-sidebar>
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
    .toolbar { position: sticky; top: 0; z-index: 100; }
    .spacer { flex: 1 1 auto; }
    .content { padding: 16px; }
    .view-title { font-weight: 600; font-size: 18px; }
  `]
})
export class ShellComponent {
  @Input() title = 'Kioskito';
  @Input() items: NavItem[] = [];
}
