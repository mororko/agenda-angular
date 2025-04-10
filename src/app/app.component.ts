import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './contacto/contacto.component';
import { FormularioContactoComponent } from './formulario-contacto/formulario-contacto.component';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EliminarContactoModalComponent } from './eliminar-contacto-modal/eliminar-contacto-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    ContactoComponent,
    FormularioContactoComponent,
    MatSnackBarModule,
    MatDialogModule,
    EliminarContactoModalComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  contactos = [
    { nombre: 'Juan', telefono: '123456789' },
    { nombre: 'Maria', telefono: '987654321' },
    { nombre: 'Pedro', telefono: '456789123' },
    { nombre: 'Ana', telefono: '321654987' },
  ];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  agregarContacto(contacto: { nombre: string; telefono: string }) {
    this.contactos.push(contacto);

    this.snackBar.open('✅ Contacto agregado con éxito', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-exito'],
    });
  }

  eliminarContacto(index: number, contacto: { nombre: string }) {
    const dialogRef = this.dialog.open(EliminarContactoModalComponent, {
      data: { nombre: contacto.nombre },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.contactos.splice(index, 1);
        this.snackBar.open('Contacto eliminado', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
