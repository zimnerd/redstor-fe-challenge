import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCollections } from './collections.actions';
import { ICollection } from 'shared-interfaces';
import { selectCollections } from './collections.selectors';
import { createSelector } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class CollectionsFacade {
  private readonly store: Store = inject(Store);

  readonly collections$: Signal<ICollection[]> = this.store.selectSignal(selectCollections);

  loadCollections() {
    this.store.dispatch(loadCollections());
  }

  selectTotalPages = createSelector(selectCollectionsState, state => state.totalPages);

  selectCurrentPage = createSelector(selectCollectionsState, state => state.currentPage);
}
