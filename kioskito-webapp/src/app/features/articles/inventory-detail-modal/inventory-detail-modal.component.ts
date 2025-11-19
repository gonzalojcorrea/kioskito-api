import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Inventory } from '../../../models/inventory.model';
import { Transaction } from '../../../models/transaction.model';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-inventory-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './inventory-detail-modal.component.html',
  styleUrls: ['./inventory-detail-modal.component.css']
})
export class InventoryDetailModalComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = true;
  description = '';
  displayedColumns: string[] = ['date', 'transactionType', 'quantity', 'unitCost', 'totalAmount', 'userName', 'note'];

  constructor(
    public dialogRef: MatDialogRef<InventoryDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inventory: Inventory },
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
    // Aquí podrías cargar la descripción desde el servicio si está disponible
    this.description = ''; // Por ahora vacío, se puede cargar del backend
  }

  loadTransactions(): void {
    this.loading = true;
    this.inventoryService.getTransactions(this.data.inventory.inventoryId).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // No mostramos error, simplemente dejamos la tabla vacía
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  getStatusClass(status: string): string {
    return status === 'Activo' ? 'status-active' : 'status-inactive';
  }

  getTransactionTypeClass(type: string): string {
    const typeMap: { [key: string]: string } = {
      'Entrada': 'type-in',
      'Salida': 'type-out',
      'Ajuste': 'type-adjustment',
      'Compra': 'type-purchase',
      'Venta': 'type-sale',
      'Devolución': 'type-return'
    };
    return typeMap[type] || 'type-default';
  }

  getTotalAmount(transaction: Transaction): number {
    return transaction.quantity * transaction.unitCost;
  }
}
