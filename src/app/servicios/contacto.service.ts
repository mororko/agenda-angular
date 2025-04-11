import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Contacto {
  nombre: string;
  telefono: string;
}

const STORAGE_KEY = 'agenda-contactos';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private contactos: Contacto[] = [];

  private contactosSubject = new BehaviorSubject<Contacto[]>(this.contactos);

  constructor() {
    this.cargarDesdeLocalStorage();
  }

  private cargarDesdeLocalStorage(): void {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (datosGuardados) {
      this.contactos = JSON.parse(datosGuardados);
      this.contactosSubject.next([...this.contactos]);
    }
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.contactos));
  }

  getContactos(): Observable<Contacto[]> {
    return this.contactosSubject.asObservable();
  }

  agregarContacto(contacto: Contacto): void {
    this.contactos.push(contacto);
    this.guardarEnLocalStorage();
    this.contactosSubject.next([...this.contactos]);
  }

  eliminarContacto(index: number): void {
    this.contactos.splice(index, 1);
    this.guardarEnLocalStorage();
    this.contactosSubject.next([...this.contactos]);
  }
}
