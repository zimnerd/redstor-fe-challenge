import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCollections } from './collections.actions';
import { ICollection } from 'shared-interfaces';
import { createSelector } from '@ngrx/store';
import { selectAllCollections, selectCollectionsState } from './collections.selectors';

@Injectable({ providedIn: 'root' })
export class CollectionsFacade {
  private readonly store: Store = inject(Store);

  readonly collections$: Signal<ICollection[]> = this.store.selectSignal(selectAllCollections);

  loadCollections() {
    this.store.dispatch(loadCollections({ page: 1, perPage: 10 }));
  }

  selectTotalPages = createSelector(selectCollectionsState, state => state.totalPages);

  selectCurrentPage = createSelector(selectCollectionsState, state => state.currentPage);
}
