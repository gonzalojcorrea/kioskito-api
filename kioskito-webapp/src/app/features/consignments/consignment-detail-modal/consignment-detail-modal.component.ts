import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Consignment, ConsignmentDetail } from '../../../models/consignment.model';
import { ConsignmentService } from '../../../services/consignment.service';

@Component({
  selector: 'app-consignment-detail-modal',
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
  templateUrl: './consignment-detail-modal.component.html',
  styleUrls: ['./consignment-detail-modal.component.css']
})
export class ConsignmentDetailModalComponent implements OnInit {
  consignmentDetail?: ConsignmentDetail;
  loading = true;
  displayedColumns: string[] = ['sku', 'articleName', 'deliveredQty', 'returnedQty', 'soldQty', 'unitPrice', 'lineTotal'];

  constructor(
    public dialogRef: MatDialogRef<ConsignmentDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { consignment: Consignment },
    private consignmentService: ConsignmentService
  ) {}

  ngOnInit(): void {
    this.loadDetail();
  }

  loadDetail(): void {
    this.loading = true;
    this.consignmentService.getById(this.data.consignment.consignmentId).subscribe({
      next: (detail) => {
        this.consignmentDetail = detail;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Abierta': 'status-active',
      'Cerrada': 'status-completed',
      'Cancelada': 'status-cancelled'
    };
    return statusMap[status] || 'status-default';
  }
}
