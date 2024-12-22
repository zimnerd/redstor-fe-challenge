import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { UnsplashService } from 'core-services';
import { loadCollections, loadCollectionsSuccess, loadCollectionsFailure } from './collections.actions';

@Injectable()
export class CollectionsEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly unsplash: UnsplashService = inject(UnsplashService);

  loadCollections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCollections),
      switchMap(() =>
        this.unsplash
          .listCollections()
          .pipe(
            map(result =>
              result.type === 'success'
                ? loadCollectionsSuccess({ collections: result.response.results, total: result.response.total, page: 1 })
                : loadCollectionsFailure()
            )
          )
      )
    )
  );
}
