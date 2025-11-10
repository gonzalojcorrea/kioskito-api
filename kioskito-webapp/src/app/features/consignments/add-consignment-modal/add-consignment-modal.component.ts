import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CustomerService } from '../../../services/customer.service';
import { InventoryService } from '../../../services/inventory.service';
import { Customer } from '../../../models/customer.model';
import { Inventory } from '../../../models/inventory.model';
import { CreateConsignmentCommand, CreateConsignmentLine } from '../../../models/consignment.model';

interface ArticleRow extends Inventory {
  selectedQuantity: number;
  selectedPrice: number;
}

@Component({
  selector: 'app-add-consignment-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './add-consignment-modal.component.html',
  styleUrls: ['./add-consignment-modal.component.css']
})
export class AddConsignmentModalComponent implements OnInit {
  form!: FormGroup;
  customers: Customer[] = [];
  articles: ArticleRow[] = [];
  selectedArticles: ArticleRow[] = [];
  displayedColumns: string[] = ['sku', 'articleName', 'stock', 'unitCost', 'consignmentPrice', 'quantity', 'subtotal', 'actions'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddConsignmentModalComponent>,
    private customerService: CustomerService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customerId: ['', Validators.required]
    });

    this.loadCustomers();
    this.loadArticles();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (customers) => {
        this.customers = customers.filter(c => c.status !== 'Inactivo' && c.status !== 'false');
      },
      error: () => console.error('Error cargando clientes')
    });
  }

  loadArticles(): void {
    this.inventoryService.getAll().subscribe({
      next: (inventory) => {
        this.articles = inventory
          .filter(item => item.status === 'Activo' && item.quantity > 0)
          .map(item => ({
            ...item,
            selectedQuantity: 0,
            selectedPrice: item.consignmentPrice || item.salePrice || 0
          }));
      },
      error: () => console.error('Error cargando artículos')
    });
  }

  addArticle(article: ArticleRow): void {
    if (article.selectedQuantity > 0 && article.selectedQuantity <= article.quantity) {
      const existingIndex = this.selectedArticles.findIndex(a => a.articleId === article.articleId);
      
      if (existingIndex >= 0) {
        this.selectedArticles[existingIndex] = { ...article };
      } else {
        this.selectedArticles.push({ ...article });
      }

      // Reset para poder agregar otro
      article.selectedQuantity = 0;
    }
  }

  removeArticle(article: ArticleRow): void {
    const index = this.selectedArticles.findIndex(a => a.articleId === article.articleId);
    if (index >= 0) {
      this.selectedArticles.splice(index, 1);
      this.selectedArticles = [...this.selectedArticles]; // Trigger change detection
    }
  }

  updatePrice(article: ArticleRow, value: string): void {
    article.selectedPrice = parseFloat(value) || 0;
  }

  updateQuantity(article: ArticleRow, value: string): void {
    article.selectedQuantity = parseInt(value) || 0;
  }

  getSubtotal(article: ArticleRow): number {
    return article.selectedQuantity * article.selectedPrice;
  }

  getTotal(): number {
    return this.selectedArticles.reduce((sum, article) => sum + this.getSubtotal(article), 0);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid || this.selectedArticles.length === 0) {
      return;
    }

    const lines: CreateConsignmentLine[] = this.selectedArticles.map(article => ({
      articleId: article.articleId,
      deliveredQty: article.selectedQuantity,
      unitPrice: article.selectedPrice
    }));

    const command: CreateConsignmentCommand = {
      customerId: this.form.value.customerId,
      lines
    };

    this.dialogRef.close(command);
  }
}
