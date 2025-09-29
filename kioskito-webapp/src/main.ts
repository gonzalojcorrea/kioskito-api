import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMaterial } from './app/shared/material.imports';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(),
    provideAnimations(),
    provideMaterial()
  ]
}).catch(err => console.error(err));
