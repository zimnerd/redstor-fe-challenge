import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCollections, loadCollectionPhotos, resetCollectionState } from './collections.actions';
import { ICollection, IPhoto } from 'shared-interfaces';
import * as CollectionsSelectors from './collections.selectors';

@Injectable({ providedIn: 'root' })
export class CollectionsFacade {
  private store: Store = inject(Store);

  // Selectors as observables
  collections$ = this.store.select(CollectionsSelectors.selectAllCollections);
  isLoading$ = this.store.select(CollectionsSelectors.selectCollectionsLoading);
  photos$ = this.store.select(CollectionsSelectors.selectCollectionPhotos);
  total$ = this.store.select(CollectionsSelectors.selectTotal);
  collectionTotal$ = this.store.select(CollectionsSelectors.selectCollectionTotal);
  error$ = this.store.select(CollectionsSelectors.selectCollectionsError);
  currentPage$ = this.store.select(CollectionsSelectors.selectCurrentPage);
  totalPages$ = this.store.select(CollectionsSelectors.selectTotalPages);

  // Actions
  loadCollections(page = 1, perPage = 10) {
    this.store.dispatch(loadCollections({ page, perPage }));
  }

  loadCollectionPhotos(collectionId: string, page: number, perPage: number): void {
    this.store.dispatch(
      loadCollectionPhotos({
        collectionId,
        page,
        perPage: Math.min(perPage, 36)
      })
    );
  }

  resetCollectionState(): void {
    this.store.dispatch(resetCollectionState());
  }
}
