import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CollectionsActions from './collections.actions';
import { UnsplashService } from 'core-services';

@Injectable()
export class CollectionsEffects {
  loadCollections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.loadCollections),
      switchMap(({ page, perPage }) =>
        this.unsplashService.listCollections(page, perPage).pipe(
          map(response =>
            CollectionsActions.loadCollectionsSuccess({
              collections: response.response?.results || [],
              total: response.response?.total || 0
            })
          ),
          catchError(error => of(CollectionsActions.loadCollectionsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private unsplashService: UnsplashService) {}
}
