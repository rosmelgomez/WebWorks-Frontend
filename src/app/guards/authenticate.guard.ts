import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authenticateGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const validateRoles = () => {
    const requiredRoles = route.data['role'] as Array<string> | undefined;
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const userRole = authService.getRole() || '';
    return requiredRoles.includes(userRole) ? true : router.createUrlTree(['/']);
  };

  // la sesion es valida mientras el backend acepte el api_token
  return authService.apiToken().pipe(
    map(() => validateRoles()),
    catchError(() => {
      authService.clearSession();
      return of(router.createUrlTree(['/login']));
    }),
  );
};
