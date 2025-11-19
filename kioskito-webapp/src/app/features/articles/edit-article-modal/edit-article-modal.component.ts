import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Inventory } from '../../../models/inventory.model';

@Component({
  selector: 'app-edit-article-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './edit-article-modal.component.html',
  styleUrls: ['./edit-article-modal.component.css']
})
export class EditArticleModalComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inventory: Inventory }
  ) {}

  ngOnInit(): void {
    const inventory = this.data.inventory;
    this.form = this.fb.group({
      name: [inventory.articleName, Validators.required],
      description: [''],
      sku: [inventory.sku],
      salePrice: [inventory.salePrice, [Validators.required, Validators.min(0)]],
      consignmentPrice: [inventory.consignmentPrice, [Validators.min(0)]]
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close({
      action: 'edit',
      value: this.form.value
    });
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }
}
