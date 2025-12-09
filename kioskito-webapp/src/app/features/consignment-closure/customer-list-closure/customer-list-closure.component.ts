import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { ConsignmentClosureService } from '../../../services/consignment-closure.service';
import { NotificationService } from '../../../shared/notifications/notification.service';
import { CustomerWithActiveConsignments } from '../../../models/consignment-closure.model';

/**
 * Componente que muestra la lista de clientes con consignaciones activas
 * y permite navegar al cierre de cada consignación
 */
@Component({
  selector: 'app-customer-list-closure',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  templateUrl: './customer-list-closure.component.html',
  styleUrls: ['./customer-list-closure.component.css']
})
export class CustomerListClosureComponent implements OnInit {
  customers: CustomerWithActiveConsignments[] = [];
  loading = false;

  constructor(
    private closureService: ConsignmentClosureService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  /**
   * Carga la lista de clientes con consignaciones activas
   */
  loadCustomers(): void {
    this.loading = true;
    this.closureService.getCustomersWithActiveConsignments().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        this.notificationService.error('Error al cargar clientes con consignaciones activas');
        this.loading = false;
      }
    });
  }

  /**
   * Calcula el total acumulado de todas las consignaciones activas de un cliente
   */
  getTotalConsignments(customer: CustomerWithActiveConsignments): number {
    return customer.activeConsignments.reduce((sum, c) => sum + c.total, 0);
  }

  /**
   * Calcula el total de artículos de todas las consignaciones de un cliente
   */
  getTotalItems(customer: CustomerWithActiveConsignments): number {
    return customer.activeConsignments.reduce((sum, c) => sum + c.totalQuantityDelivered, 0);
  }

  /**
   * Navega al formulario de cierre de una consignación específica
   */
  openClosureForm(consignmentId: string): void {
    this.router.navigate(['/dashboard/cierre-consignaciones/cerrar', consignmentId]);
  }

  /**
   * Formatea una fecha ISO a formato legible
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
