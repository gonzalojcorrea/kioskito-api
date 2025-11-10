import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.css']
})
export class UserDetailModalComponent implements OnInit {
  user!: User;

  roleLabels: { [key: string]: string } = {
    'Admin': 'Administrador',
    'Manager': 'Gerente',
    'Operator': 'Operador',
    'User': 'Usuario'
  };

  roleColors: { [key: string]: string } = {
    'Admin': '#ff5252',
    'Manager': '#ff9800',
    'Operator': '#2196f3',
    'User': '#4caf50'
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user: User }) {
    this.user = data.user;
  }

  ngOnInit(): void {}

  getRoleLabel(role: string): string {
    return this.roleLabels[role] || role;
  }

  getRoleColor(role: string): string {
    return this.roleColors[role] || '#999';
  }
}

