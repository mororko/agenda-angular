import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.estaLogueado$.pipe(
    map((logueado) => {
      if (!logueado) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
