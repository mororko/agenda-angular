import { Component, OnInit } from '@angular/core';
import { Contacto, ContactoService } from '../servicios/contacto.service';
import { FormularioContactoComponent } from '../formulario-contacto/formulario-contacto.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarContactoModalComponent } from '../editar-contacto-modal/editar-contacto-modal.component';
import { EliminarContactoModalComponent } from '../eliminar-contacto-modal/eliminar-contacto-modal.component';
import { CommonModule, AsyncPipe } from '@angular/common';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ContactoComponent,
    FormularioContactoComponent,
    EditarContactoModalComponent,
    EliminarContactoModalComponent,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  contactos$!: Observable<Contacto[]>;

  // contactos$ = this.contactoService.getContactos();

  constructor(
    private contactoService: ContactoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.contactos$ = this.contactoService.getContactos();
  }
  agregarContacto(contacto: { nombre: string; telefono: string }) {
    this.contactoService.agregarContacto(contacto);
    this.snackBar.open('✅ Contacto agregado', 'Cerrar', { duration: 3000 });
  }
  eliminarContacto(contacto: Contacto): void {
    const dialogRef = this.dialog.open(EliminarContactoModalComponent, {
      data: { nombre: contacto.nombre },
    });
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado && contacto.id) {
        this.contactoService.eliminarContacto(contacto.id);
        this.snackBar.open('🗑️ Contacto eliminado', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
  editarContacto(contacto: Contacto): void {
    const dialogRef = this.dialog.open(EditarContactoModalComponent, {
      data: { ...contacto },
    });
    dialogRef.afterClosed().subscribe((actualizado) => {
      if (actualizado && actualizado.id) {
        this.contactoService.editarContacto(actualizado).subscribe(() => {
          this.snackBar.open('✏️ Contacto actualizado', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    });
  }
}
