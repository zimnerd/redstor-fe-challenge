import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPhoto } from 'shared-interfaces';
import * as CollectionsActions from '../store/collections/collections.actions';
import * as CollectionsSelectors from '../store/collections/collections.selectors';

@Injectable({
  providedIn: 'root'
})
export class CollectionsFacade {
  // Selectors as observables
  isLoading$: Observable<boolean> = this.store.select(CollectionsSelectors.selectCollectionsLoading);
  photos$: Observable<IPhoto[]> = this.store.select(CollectionsSelectors.selectCollectionPhotos);
  total$: Observable<number> = this.store.select(CollectionsSelectors.selectTotal);
  collectionTotal$: Observable<number> = this.store.select(CollectionsSelectors.selectCollectionTotal);

  constructor(private store: Store) {}

  // Actions
  loadCollectionPhotos(collectionId: string, page: number, perPage: number): void {
    this.store.dispatch(
      CollectionsActions.loadCollectionPhotos({
        collectionId,
        page,
        perPage: Math.min(perPage, 36)
      })
    );
  }

  // Add other actions as needed
  resetCollectionState(): void {
    this.store.dispatch(CollectionsActions.resetCollectionState());
  }
}
