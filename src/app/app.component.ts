import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './contacto/contacto.component';
import { FormularioContactoComponent } from './formulario-contacto/formulario-contacto.component';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EliminarContactoModalComponent } from './eliminar-contacto-modal/eliminar-contacto-modal.component';
import { ContactoService, Contacto } from './servicios/contacto.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

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
    AsyncPipe,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  contactos$!: Observable<Contacto[]>;

  constructor(
    private contactoService: ContactoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contactos$ = this.contactoService.getContactos();
  }

  agregarContacto(contacto: { nombre: string; telefono: string }) {
    this.contactoService.agregarContacto(contacto);
    this.snackBar.open('✅ Contacto agregado', 'Cerrar', { duration: 3000 });
  }

  eliminarContacto(index: number, contacto: { nombre: string }) {
    const dialogRef = this.dialog.open(EliminarContactoModalComponent, {
      data: { nombre: contacto.nombre },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.contactoService.eliminarContacto(index);
        this.snackBar.open('🗑️ Contacto eliminado', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
