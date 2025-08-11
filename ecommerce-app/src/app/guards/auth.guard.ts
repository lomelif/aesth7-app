// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const authService = inject(AuthService);

  const token = authService.getToken();

  if (token && authService.isTokenValid(token)) {
    return true;
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return router.createUrlTree(['/login']);
  }
};
