import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCollections, loadCollectionPhotos, resetCollectionState } from './collections.actions';
import { ICollection, IPhoto } from 'shared-interfaces';
import * as CollectionsSelectors from './collections.selectors';

@Injectable({ providedIn: 'root' })
export class CollectionsFacade {
  private readonly store: Store = inject(Store);

  // Selectors as observables
  readonly collections$ = this.store.select(CollectionsSelectors.selectAllCollections);
  readonly isLoading$ = this.store.select(CollectionsSelectors.selectCollectionsLoading);
  readonly photos$ = this.store.select(CollectionsSelectors.selectCollectionPhotos);
  readonly total$ = this.store.select(CollectionsSelectors.selectTotal);
  readonly collectionTotal$ = this.store.select(CollectionsSelectors.selectCollectionTotal);
  readonly error$ = this.store.select(CollectionsSelectors.selectCollectionsError);
  readonly currentPage$ = this.store.select(CollectionsSelectors.selectCurrentPage);
  readonly totalPages$ = this.store.select(CollectionsSelectors.selectTotalPages);

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
