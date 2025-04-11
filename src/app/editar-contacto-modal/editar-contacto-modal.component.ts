import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Contacto } from '../servicios/contacto.service';

@Component({
  selector: 'app-editar-contacto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './editar-contacto-modal.component.html',
  styleUrl: './editar-contacto-modal.component.css',
})
export class EditarContactoModalComponent {
  nombre: string;
  telefono: string;

  constructor(
    public dialogRef: MatDialogRef<EditarContactoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contacto
  ) {
    this.nombre = data.nombre;
    this.telefono = data.telefono;
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }

  guardar(): void {
    this.dialogRef.close({
      ...this.data,
      nombre: this.nombre,
      telefono: this.telefono,
    });
  }
}
