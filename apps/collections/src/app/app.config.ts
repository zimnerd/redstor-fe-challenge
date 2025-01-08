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
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateCompiler, TranslateFakeCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Factory function for the translation loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      StoreModule.forRoot(reducers, { metaReducers }),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({
        maxAge: 20, // Retains last 25 states
        logOnly: !isDevMode() // Restrict extension to log-only mode in production
      })
    ),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ collections: collectionsReducer }),
    provideEffects(CollectionsEffects),
    importProvidersFrom(MatDialogModule),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, // Include stack trace for every dispatched action
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If you want the store to update within NgZone
    }),
    ...(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useFactory: () => new TranslateFakeCompiler()
      }
    }).providers ?? [])
  ]
};
