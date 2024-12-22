import { Injectable, Signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCollections } from './collections.actions';
import { ICollection } from 'shared-interfaces';
import { selectCollections } from './collections.selectors';

@Injectable({ providedIn: 'root' })
export class CollectionsFacade {
  private readonly store: Store = inject(Store);

  readonly collections$: Signal<ICollection[]> = this.store.selectSignal(selectCollections);

  loadCollections() {
    this.store.dispatch(loadCollections());
  }
}
