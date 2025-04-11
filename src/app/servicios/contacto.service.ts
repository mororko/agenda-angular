import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EditarContactoModalComponent } from '../editar-contacto-modal/editar-contacto-modal.component';

export interface Contacto {
  id?: number;
  nombre: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private baseUrl = 'http://localhost:3000/contactos';
  private contactosSubject = new BehaviorSubject<Contacto[]>([]);

  constructor(private http: HttpClient) {
    this.cargarContactosDesdeAPI();
  }
  getContactos(): Observable<Contacto[]> {
    return this.contactosSubject.asObservable();
  }

  cargarContactosDesdeAPI(): void {
    this.http.get<Contacto[]>(this.baseUrl).subscribe((data) => {
      this.contactosSubject.next(data);
    });
  }

  agregarContacto(contacto: Contacto): void {
    this.http
      .post<Contacto>(this.baseUrl, contacto)
      .pipe(tap(() => this.cargarContactosDesdeAPI()))
      .subscribe();
  }

  eliminarContacto(id: number): void {
    this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(
        tap(() => this.cargarContactosDesdeAPI()),
        catchError((err) => {
          console.error('Error al eliminar contacto:', err);
          return of(null);
        })
      )
      .subscribe();
  }

  editarContacto(contacto: Contacto): Observable<Contacto> {
    return this.http
      .put<Contacto>(`${this.baseUrl}/${contacto.id}`, contacto)
      .pipe(tap(() => this.cargarContactosDesdeAPI()));
  }
}
