import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './customer-detail-modal.component.html',
  styleUrls: ['./customer-detail-modal.component.css']
})
export class CustomerDetailModalComponent implements OnInit {
  customer!: Customer;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { customer: Customer }) {
    this.customer = data.customer;
  }

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    return status === 'Activo' ? 'active' : 'inactive';
  }

  getStatusLabel(status: string): string {
    return status === 'Activo' ? 'Activo' : 'Inactivo';
  }
}
