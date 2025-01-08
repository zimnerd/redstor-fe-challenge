import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
  TranslateCompiler,
  TranslateFakeCompiler,
  TranslateParser,
  TranslateDefaultParser,
  MissingTranslationHandler,
  FakeMissingTranslationHandler,
  USE_DEFAULT_LANG,
  ISOLATE_TRANSLATE_SERVICE,
  USE_EXTEND,
  DEFAULT_LANGUAGE
} from '@ngx-translate/core';
import { importProvidersFrom, Injector } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { applicationConfig, StoryFn } from '@storybook/angular';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export const decorators = [
  applicationConfig({
    providers: [
      importProvidersFrom(
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          },
          compiler: {
            provide: TranslateCompiler,
            useFactory: () => new TranslateFakeCompiler()
          },
          parser: {
            provide: TranslateParser,
            useFactory: () => new TranslateDefaultParser()
          },
          missingTranslationHandler: {
            provide: MissingTranslationHandler,
            useFactory: () => new FakeMissingTranslationHandler()
          }
        })
      ),
      TranslateStore,
      { provide: USE_DEFAULT_LANG, useValue: true },
      { provide: ISOLATE_TRANSLATE_SERVICE, useValue: true },
      { provide: USE_EXTEND, useValue: true },
      { provide: DEFAULT_LANGUAGE, useValue: 'en' },
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({}),
          queryParams: of({}),
          fragment: of(''),
          data: of({}),
          snapshot: {
            paramMap: {
              get: (collectionId: string) => null
            }
          }
        }
      }
    ]
  }),
  (storyFn: StoryFn, args: any, context: any) => {
    const story = storyFn(args, context);
    const injector = Injector.create({
      providers: [
        { provide: HttpClient, deps: [] },
        { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
        { provide: TranslateCompiler, useFactory: () => new TranslateFakeCompiler() },
        { provide: TranslateParser, useFactory: () => new TranslateDefaultParser() },
        { provide: MissingTranslationHandler, useFactory: () => new FakeMissingTranslationHandler() },
        { provide: USE_DEFAULT_LANG, useValue: true },
        { provide: ISOLATE_TRANSLATE_SERVICE, useValue: true },
        { provide: USE_EXTEND, useValue: true },
        { provide: DEFAULT_LANGUAGE, useValue: 'en' },
        TranslateService,
        TranslateStore
      ]
    });
    const translate = injector.get(TranslateService);
    translate.setDefaultLang('en');
    translate.use('en');
    return story;
  }
];
