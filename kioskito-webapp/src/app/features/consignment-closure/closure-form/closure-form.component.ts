import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConsignmentClosureService } from '../../../services/consignment-closure.service';
import { NotificationService } from '../../../shared/notifications/notification.service';
import {
  ConsignmentClosureDetail,
  ConsignmentLineFormData,
  CloseConsignmentCommand,
  CloseConsignmentLineDto
} from '../../../models/consignment-closure.model';
import { ClosureConfirmDialogComponent } from '../closure-confirm-dialog/closure-confirm-dialog.component';

/**
 * Componente para el formulario de cierre de consignación
 * Permite editar cantidades vendidas/devueltas con validación en tiempo real
 */
@Component({
  selector: 'app-closure-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './closure-form.component.html',
  styleUrls: ['./closure-form.component.css']
})
export class ClosureFormComponent implements OnInit {
  loading = false;
  consignmentId!: string;
  consignmentDetail!: ConsignmentClosureDetail;
  form!: FormGroup;
  linesFormData: ConsignmentLineFormData[] = [];
  displayedColumns: string[] = ['sku', 'article', 'delivered', 'sold', 'returned', 'pending', 'unitPrice', 'subtotal'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private closureService: ConsignmentClosureService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.consignmentId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadConsignmentDetail();
  }

  /**
   * Inicializa el formulario reactivo
   */
  initForm(): void {
    this.form = this.fb.group({
      lines: this.fb.array([]),
      createNewConsignmentForPending: [false],
      notes: ['']
    });
  }

  /**
   * Carga el detalle de la consignación desde el backend
   */
  loadConsignmentDetail(): void {
    this.loading = true;
    this.closureService.getConsignmentClosureDetail(this.consignmentId).subscribe({
      next: (detail) => {
        this.consignmentDetail = detail;
        this.populateForm();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar detalle:', error);
        this.notificationService.error('Error al cargar el detalle de la consignación');
        this.loading = false;
        this.goBack();
      }
    });
  }

  /**
   * Puebla el formulario con los datos del detalle
   */
  populateForm(): void {
    const linesArray = this.form.get('lines') as FormArray;
    
    this.consignmentDetail.lines.forEach(line => {
      const lineGroup = this.fb.group({
        lineId: [line.lineId],
        soldQtyInput: [line.currentSoldQty, [Validators.required, Validators.min(0)]],
        returnedQtyInput: [line.currentReturnedQty, [Validators.required, Validators.min(0)]]
      });

      // Escuchar cambios para recalcular
      lineGroup.valueChanges.subscribe(() => {
        this.recalculateLineData();
      });

      linesArray.push(lineGroup);

      // Crear datos para la tabla
      this.linesFormData.push({
        ...line,
        soldQtyInput: line.currentSoldQty,
        returnedQtyInput: line.currentReturnedQty,
        hasError: false,
        subtotalSold: line.currentSoldQty * line.unitPrice
      });
    });

    this.recalculateLineData();
  }

  /**
   * Recalcula los datos de cada línea (pendientes, errores, subtotales)
   */
  recalculateLineData(): void {
    const linesArray = this.form.get('lines') as FormArray;

    linesArray.controls.forEach((control, index) => {
      const soldQty = control.get('soldQtyInput')?.value || 0;
      const returnedQty = control.get('returnedQtyInput')?.value || 0;
      const line = this.linesFormData[index];
      const deliveredQty = line.deliveredQty;

      // Validar que no exceda lo entregado
      const total = soldQty + returnedQty;
      line.hasError = total > deliveredQty;
      line.errorMessage = line.hasError 
        ? `La suma de vendidos y devueltos (${total}) excede lo entregado (${deliveredQty})`
        : undefined;

      // Actualizar valores calculados
      line.soldQtyInput = soldQty;
      line.returnedQtyInput = returnedQty;
      line.pendingQty = deliveredQty - soldQty - returnedQty;
      line.subtotalSold = soldQty * line.unitPrice;
    });
  }

  /**
   * Obtiene el FormGroup de una línea específica
   */
  getLineFormGroup(index: number): FormGroup {
    const linesArray = this.form.get('lines') as FormArray;
    return linesArray.at(index) as FormGroup;
  }

  /**
   * Verifica si el formulario tiene errores
   */
  hasErrors(): boolean {
    return this.linesFormData.some(line => line.hasError) || this.form.invalid;
  }

  /**
   * Calcula el total de artículos vendidos
   */
  getTotalSold(): number {
    return this.linesFormData.reduce((sum, line) => sum + line.soldQtyInput, 0);
  }

  /**
   * Calcula el total de artículos devueltos
   */
  getTotalReturned(): number {
    return this.linesFormData.reduce((sum, line) => sum + line.returnedQtyInput, 0);
  }

  /**
   * Calcula el total de artículos pendientes
   */
  getTotalPending(): number {
    return this.linesFormData.reduce((sum, line) => sum + line.pendingQty, 0);
  }

  /**
   * Calcula el monto total a cobrar
   */
  getTotalAmount(): number {
    return this.linesFormData.reduce((sum, line) => sum + line.subtotalSold, 0);
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

  /**
   * Abre el diálogo de confirmación antes de cerrar
   */
  async confirmAndClose(): Promise<void> {
    if (this.hasErrors()) {
      this.notificationService.error('Corrija los errores antes de continuar');
      return;
    }

    const dialogRef = this.dialog.open(ClosureConfirmDialogComponent, {
      width: '500px',
      data: {
        customerName: this.consignmentDetail.customerName,
        totalAmount: this.getTotalAmount(),
        totalSold: this.getTotalSold(),
        totalReturned: this.getTotalReturned(),
        totalPending: this.getTotalPending(),
        createNewConsignment: this.form.get('createNewConsignmentForPending')?.value
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.submitClosure();
      }
    });
  }

  /**
   * Envía el comando de cierre al backend
   */
  submitClosure(): void {
    this.loading = true;

    const command: CloseConsignmentCommand = {
      consignmentId: this.consignmentId,
      lines: this.buildLinesCommand(),
      createNewConsignmentForPending: this.form.get('createNewConsignmentForPending')?.value || false,
      notes: this.form.get('notes')?.value || undefined
    };

    this.closureService.closeConsignment(command).subscribe({
      next: (response) => {
        this.loading = false;
        this.notificationService.success(response.message || 'Consignación cerrada exitosamente');
        this.goBack();
      },
      error: (error) => {
        console.error('Error al cerrar consignación:', error);
        this.notificationService.error(error.error?.message || 'Error al cerrar la consignación');
        this.loading = false;
      }
    });
  }

  /**
   * Construye el array de líneas para el comando
   */
  buildLinesCommand(): CloseConsignmentLineDto[] {
    const linesArray = this.form.get('lines') as FormArray;
    
    return linesArray.controls.map((control, index) => ({
      lineId: control.get('lineId')?.value,
      soldQty: control.get('soldQtyInput')?.value || 0,
      returnedQty: control.get('returnedQtyInput')?.value || 0
    }));
  }

  /**
   * Cancela y vuelve a la lista
   */
  cancel(): void {
    this.goBack();
  }

  /**
   * Navega de vuelta a la lista de clientes
   */
  goBack(): void {
    this.router.navigate(['/dashboard/cierre-consignaciones']);
  }
}
