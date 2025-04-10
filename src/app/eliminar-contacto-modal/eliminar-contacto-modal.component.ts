import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-eliminar-contacto-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './eliminar-contacto-modal.component.html',
  styleUrl: './eliminar-contacto-modal.component.css',
})
export class EliminarContactoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarContactoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
