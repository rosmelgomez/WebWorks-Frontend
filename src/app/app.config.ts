import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// fechas en espanol donde el pipe date recibe el locale 'es'
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    // la app se escribio con Zone.js (Angular 17); desde Angular 21 el modo por defecto es zoneless
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // XHR responde dentro de la zona de Angular; el FetchBackend por defecto corre fuera y no dispara la deteccion de cambios con Zone.js
    provideHttpClient(withXhr(), withInterceptors([authInterceptor]))]
};
