import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

export interface ActionField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean' | 'textarea';
  required?: boolean;
  options?: string[];
}

export interface ActionModalData {
  entity: string;
  action: 'create' | 'edit' | 'delete' | 'view';
  fields: ActionField[];
  value?: any;
}

@Component({
  selector: 'app-action-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.css']
})
export class ActionModalComponent implements OnInit {
  form!: FormGroup;
  title = '';
  actionLabel = '';
  isReadOnly = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionModalData
  ) {}

  ngOnInit(): void {
    const group: Record<string, FormControl> = {};
    this.data.fields.forEach(f => {
      group[f.name] = new FormControl(
        this.data.value ? this.data.value[f.name] : '',
        f.required ? Validators.required : []
      );
    });
    this.form = this.fb.group(group);

    // Configurar título, botón y modo
    switch (this.data.action) {
      case 'create':
        this.title = `Nuevo ${this.data.entity}`;
        this.actionLabel = 'Guardar';
        break;
      case 'edit':
        this.title = `Editar ${this.data.entity}`;
        this.actionLabel = 'Actualizar';
        break;
      case 'delete':
        this.title = `Eliminar ${this.data.entity}`;
        this.actionLabel = 'Eliminar';
        this.isReadOnly = true;
        this.form.disable();
        break;
      case 'view':
        this.title = `Detalle de ${this.data.entity}`;
        this.actionLabel = 'Cerrar';
        this.isReadOnly = true;
        this.form.disable();
        break;
    }
  }

  submit() {
    // En modo view no devolvemos nada (solo cerramos)
    if (this.data.action === 'view') {
      this.dialogRef.close(null);
      return;
    }

    if (this.data.action === 'delete' || this.form.valid) {
      this.dialogRef.close({
        action: this.data.action,
        value: this.form.getRawValue()
      });
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
