import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
// ApplicationConfig
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
