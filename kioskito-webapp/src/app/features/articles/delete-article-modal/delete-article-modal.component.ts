import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Inventory } from '../../../models/inventory.model';

@Component({
  selector: 'app-delete-article-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './delete-article-modal.component.html',
  styleUrls: ['./delete-article-modal.component.css']
})
export class DeleteArticleModalComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inventory: Inventory }
  ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
