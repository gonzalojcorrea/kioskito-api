import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TableColumn, TableAction, ActionDefault } from '../../shared/table/table.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActionModalComponent } from '../../shared/modals/action-modal-component';
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
    { field: 'name', header: 'Nombre', type: 'text' },
    { field: 'email', header: 'Email', type: 'text' },
    { field: 'role', header: 'Rol', type: 'text' },
    { field: 'status', header: 'Estado', type: 'status' }
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
    const dialogRef = this.dialog.open(ActionModalComponent, {
      width: '420px',
      data: {
        entity: 'Usuario',
        action,
        fields: [
          { name: 'name', label: 'Nombre', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'text', required: true },
          { name: 'password', label: 'Contraseña', type: 'password', required: action === 'create' },
          { name: 'role', label: 'Rol', type: 'text', required: true },
          { name: 'status', label: 'Activo', type: 'boolean' }
        ],
        value: user
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;

      switch (result.action) {
        case 'create':
          this.svc.create(result.value).subscribe({
            next: () => {
              this.refresh();
              this.notify.success('Usuario creado correctamente');
            },
            error: () => this.notify.error('Error al crear el usuario')
          });
          break;

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
              `¿Estás seguro de eliminar "${user.name}"?`
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
