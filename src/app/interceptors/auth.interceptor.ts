import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Envia las cookies httpOnly (access_token / api_token) en cada peticion al backend
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const isAuthRequest = req.url.endsWith('/login') || req.url.endsWith('/logout-user') || req.url.endsWith('/api-token');

  const cleanedHeaders = req.headers.has('Authorization')
    ? req.headers.delete('Authorization')
    : req.headers;

  const requestWithCredentials = req.clone({
    withCredentials: true,
    headers: cleanedHeaders,
  });

  return next(requestWithCredentials).pipe(
    catchError((error: HttpErrorResponse) => {
      // sesion expirada: el backend ya no acepta el api_token
      if (error.status === 401 && !isAuthRequest && auth.isLoggedIn()) {
        auth.clearSession();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
