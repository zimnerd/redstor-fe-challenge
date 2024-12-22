import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { CollectionsEffects, collectionsReducer, metaReducers, reducers } from 'state-management';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      StoreModule.forRoot(reducers, { metaReducers }),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({
        maxAge: 50, // Retains last 25 states
        logOnly: !isDevMode() // Restrict extension to log-only mode in production
      })
    ),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ collections: collectionsReducer }),
    provideEffects(CollectionsEffects),
    importProvidersFrom(MatDialogModule)
  ]
};
