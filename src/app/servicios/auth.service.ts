import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private estaLogueadoSubject = new BehaviorSubject<boolean>(
    this.leerEstadoDesdeLocalStorage()
  );

  constructor() {}

  login(usuario: string, password: string): boolean {
    if (usuario === 'admin' && password === '1234') {
      this.estaLogueadoSubject.next(true);
      localStorage.setItem('logueado', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.estaLogueadoSubject.next(false);
    localStorage.removeItem('logueado');
  }

  get estaLogueado$(): Observable<boolean> {
    return this.estaLogueadoSubject.asObservable();
  }

  private leerEstadoDesdeLocalStorage(): boolean {
    return localStorage.getItem('logueado') === 'true';
  }
}
