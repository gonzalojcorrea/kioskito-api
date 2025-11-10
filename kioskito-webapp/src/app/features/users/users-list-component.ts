import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActionModalComponent } from '../../shared/modals/action-modal-component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';
import { NotificationService } from '../../shared/notifications/notification.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, TableComponent, ToolbarComponent, MatDialogModule],
  template: `
    <app-toolbar
      title="Usuarios"
      [showAdd]="true"
      (add)="openModal('create')">
    </app-toolbar>

    <app-table
      [columns]="columns"
      [data]="data"
      [actions]="actions"
      [totalItems]="data.length"
      (actionClicked)="onAction($event)">
    </app-table>
  `
})
export class UsersListComponent {
  columns: TableColumn[] = [
    { field: 'fullName', header: 'Nombre', type: 'text' },
    { field: 'email', header: 'Email', type: 'text' },
    { field: 'role', header: 'Rol', type: 'text' },
    { field: 'createdAt', header: 'Fecha Creación', type: 'text' }
  ];

  actions: TableAction[] = [
    { action: 'view', type: ActionDefault.View },
    { action: 'edit', type: ActionDefault.Edit },
    { action: 'delete', type: ActionDefault.Delete }
  ];

  data: User[] = [];

  constructor(
    private svc: UserService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {
    this.refresh();
  }

  refresh() {
    this.svc.getAll().subscribe({
      next: (res) => (this.data = res),
      error: () => this.notify.error('Error cargando usuarios')
    });
  }

  openModal(action: 'create' | 'edit' | 'delete' | 'view', user?: User) {
    // Si es acción 'ver', abrir el modal detallado
    if (action === 'view' && user) {
      this.dialog.open(UserDetailModalComponent, {
        width: '800px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        data: { user }
      });
      return;
    }

    // Si es crear usuario, usar el modal especializado
    if (action === 'create') {
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        width: '600px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        disableClose: false
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (!result) return;

        this.svc.create(result.value).subscribe({
          next: () => {
            this.refresh();
            this.notify.success('Usuario creado correctamente');
          },
          error: () => this.notify.error('Error al crear el usuario')
        });
      });
      return;
    }

    // Para otras acciones (edit, delete), usar el modal genérico
    const dialogRef = this.dialog.open(ActionModalComponent, {
      width: '420px',
      data: {
        entity: 'Usuario',
        action,
        fields: [
          { name: 'fullName', label: 'Nombre Completo', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'password', label: 'Contraseña', type: 'password', required: false },
          { name: 'role', label: 'Rol', type: 'text', required: true }
        ],
        value: user
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      switch (result.action) {
        case 'edit':
          if (user)
            this.svc.update(user.id, result.value).subscribe({
              next: () => {
                this.refresh();
                this.notify.success('Usuario actualizado correctamente');
              },
              error: () => this.notify.error('Error al actualizar el usuario')
            });
          break;

        case 'delete':
          if (user) {
            const confirmed = await this.notify.confirm(
              'Eliminar usuario',
              `¿Estás seguro de eliminar "${user.fullName}"?`
            );
            if (!confirmed) return;

            this.svc.delete(user.id).subscribe({
              next: () => {
                this.refresh();
                this.notify.success('Usuario eliminado correctamente');
              },
              error: () => this.notify.error('Error al eliminar el usuario')
            });
          }
          break;
      }
    });
  }

  onAction(e: { action: string; row: User }) {
    this.openModal(e.action as any, e.row);
  }
}
