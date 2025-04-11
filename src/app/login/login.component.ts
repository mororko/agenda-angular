import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    const ok = this.auth.login(this.usuario, this.password);
    if (ok) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Credenciales incorrectas';
    }
  }
}
