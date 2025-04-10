import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-contacto.component.html',
  styleUrl: './formulario-contacto.component.css',
})
export class FormularioContactoComponent {
  nombre = '';
  telefono = '';

  @Output() contactoAgregado = new EventEmitter<{
    nombre: string;
    telefono: string;
  }>();

  agregarContacto(): void {
    if (this.nombre.trim() && this.telefono.trim()) {
      this.contactoAgregado.emit({
        nombre: this.nombre,
        telefono: this.telefono,
      });
      this.nombre = '';
      this.telefono = '';
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
