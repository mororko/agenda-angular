import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './contacto/contacto.component';
import { FormularioContactoComponent } from './formulario-contacto/formulario-contacto.component';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EliminarContactoModalComponent } from './eliminar-contacto-modal/eliminar-contacto-modal.component';
// import { ContactoService, Contacto } from './servicios/contacto.service';
import { AsyncPipe } from '@angular/common';
// import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditarContactoModalComponent } from './editar-contacto-modal/editar-contacto-modal.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    // ContactoComponent,
    // FormularioContactoComponent,
    MatSnackBarModule,
    MatDialogModule,
    // EliminarContactoModalComponent,
    // EditarContactoModalComponent,
    // AsyncPipe,
    MatButtonModule,
    MatIconModule,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

//implements OnInit
export class AppComponent {
  ngOnInit(): void {
    console.log('API URL actual:', environment.apiUrl);
  }
}
