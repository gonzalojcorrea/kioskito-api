import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog">
      <div class="icon-container">
        <mat-icon class="warning-icon">warning</mat-icon>
      </div>

      <h2 class="title">{{ data.title }}</h2>
      <p class="message">{{ data.message }}</p>

      <div class="actions">
        <button (click)="dialogRef.close(false)" class="btn btn-cancel">Cancelar</button>
        <button (click)="dialogRef.close(true)" class="btn btn-confirm">Confirmar</button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 28px 24px;
      border-radius: 18px;
      background: #fff;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
      max-width: 360px;
    }

    .icon-container {
      background-color: #fdecea;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .warning-icon {
      color: #c62828;
      font-size: 24px;
      transform: translateY(-1px);
    }

    .title {
      font-size: 20px;
      font-weight: 700;
      color: #1a3d66;
      margin: 6px 0 8px;
      line-height: 1.2;
    }

    .message {
      font-size: 15px;
      color: #444;
      margin-bottom: 28px;
      line-height: 1.5;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      width: 100%;
    }

    /* 🌟 Estilo base común para todos los botones */
    .btn {
      font-weight: 600;
      color: #fff;
      padding: 10px 22px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
      min-width: 110px;
    }

    .btn:hover {
      transform: translateY(-1px);
    }

    /* 🔹 Cancelar → azul corporativo */
    .btn-cancel {
      background-color: #1a3d66;
      box-shadow: 0 2px 5px rgba(26, 61, 102, 0.3);
    }

    .btn-cancel:hover {
      background-color: #163455;
    }

    /* 🔹 Confirmar → rojo alerta */
    .btn-confirm {
      background-color: #c62828;
      box-shadow: 0 2px 5px rgba(198, 40, 40, 0.25);
    }

    .btn-confirm:hover {
      background-color: #b71c1c;
    }

    /* 🔹 Responsive */
    @media (max-width: 480px) {
      .confirm-dialog {
        max-width: 90vw;
        padding: 20px;
      }

      .icon-container {
        width: 50px;
        height: 50px;
      }

      .warning-icon {
        font-size: 30px;
      }

      .title {
        font-size: 18px;
      }

      .btn {
        padding: 10px 20px;
        min-width: 100px;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}
}
