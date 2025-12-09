import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ClosureConfirmData {
  customerName: string;
  totalAmount: number;
  totalSold: number;
  totalReturned: number;
  totalPending: number;
  createNewConsignment: boolean;
}

/**
 * Diálogo de confirmación antes de cerrar una consignación
 * Muestra un resumen de lo que se va a procesar
 */
@Component({
  selector: 'app-closure-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="confirm-dialog">
      <div class="dialog-header">
        <mat-icon class="header-icon">warning</mat-icon>
        <h2 mat-dialog-title>Confirmar Cierre de Consignación</h2>
      </div>

      <mat-dialog-content class="dialog-content">
        <p class="confirmation-text">
          ¿Está seguro de cerrar esta consignación? Esta acción no se puede deshacer.
        </p>

        <div class="summary-section">
          <h3>Resumen del Cierre</h3>
          
          <div class="summary-item">
            <mat-icon>person</mat-icon>
            <div class="item-content">
              <span class="item-label">Cliente:</span>
              <span class="item-value">{{ data.customerName }}</span>
            </div>
          </div>

          <div class="summary-item">
            <mat-icon>shopping_cart</mat-icon>
            <div class="item-content">
              <span class="item-label">Artículos Vendidos:</span>
              <span class="item-value">{{ data.totalSold }}</span>
            </div>
          </div>

          <div class="summary-item">
            <mat-icon>keyboard_return</mat-icon>
            <div class="item-content">
              <span class="item-label">Artículos Devueltos:</span>
              <span class="item-value">{{ data.totalReturned }}</span>
            </div>
          </div>

          <div class="summary-item" *ngIf="data.totalPending > 0">
            <mat-icon>pending</mat-icon>
            <div class="item-content">
              <span class="item-label">Artículos Pendientes:</span>
              <span class="item-value">{{ data.totalPending }}</span>
            </div>
          </div>

          <div class="summary-item highlight">
            <mat-icon>attach_money</mat-icon>
            <div class="item-content">
              <span class="item-label">Total a Cobrar:</span>
              <span class="item-value">{{ data.totalAmount | currency:'USD':'symbol':'1.2-2' }}</span>
            </div>
          </div>

          <div class="alert-info" *ngIf="data.createNewConsignment && data.totalPending > 0">
            <mat-icon>info</mat-icon>
            <p>Se creará automáticamente una nueva consignación con los {{ data.totalPending }} artículos pendientes.</p>
          </div>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-stroked-button (click)="onCancel()" class="btn-cancel">
          <mat-icon>close</mat-icon>
          Cancelar
        </button>
        <button mat-raised-button color="primary" (click)="onConfirm()" class="btn-confirm">
          <mat-icon>check_circle</mat-icon>
          Confirmar y Cerrar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      width: 100%;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin: -24px -24px 0 -24px;
    }

    .header-icon {
      font-size: 36px;
      width: 36px;
      height: 36px;
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }

    .dialog-content {
      padding: 24px !important;
    }

    .confirmation-text {
      font-size: 15px;
      color: #666;
      margin: 0 0 24px 0;
      text-align: center;
    }

    .summary-section {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 12px;
    }

    .summary-section h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .summary-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      margin-bottom: 8px;
      background: white;
      border-radius: 8px;
    }

    .summary-item mat-icon {
      color: #667eea;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .item-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
    }

    .item-label {
      font-size: 12px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
    }

    .item-value {
      font-size: 16px;
      font-weight: 700;
      color: #333;
    }

    .summary-item.highlight {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin-top: 12px;
    }

    .summary-item.highlight mat-icon {
      color: white;
    }

    .summary-item.highlight .item-label,
    .summary-item.highlight .item-value {
      color: white;
    }

    .summary-item.highlight .item-value {
      font-size: 22px;
    }

    .alert-info {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-top: 16px;
      padding: 12px;
      background: #e3f2fd;
      border-left: 4px solid #2196f3;
      border-radius: 4px;
    }

    .alert-info mat-icon {
      color: #2196f3;
      font-size: 20px;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .alert-info p {
      margin: 0;
      font-size: 13px;
      color: #1565c0;
    }

    .dialog-actions {
      padding: 16px 24px !important;
      gap: 12px;
      justify-content: flex-end;
      border-top: 1px solid #e0e0e0;
      margin: 24px -24px -24px -24px;
    }

    .dialog-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }

    .btn-cancel {
      color: #666;
      border: 1px solid #ddd;
    }

    .btn-cancel:hover {
      background-color: #f0f0f0;
    }

    .btn-confirm {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-confirm:hover {
      background: linear-gradient(135deg, #5568d3 0%, #663a8f 100%);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  `]
})
export class ClosureConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ClosureConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClosureConfirmData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
