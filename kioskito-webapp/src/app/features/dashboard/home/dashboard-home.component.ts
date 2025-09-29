import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `<h2>Dashboard Home</h2><p>Welcome to the dashboard!</p>`
})
export class DashboardHomeComponent {}
