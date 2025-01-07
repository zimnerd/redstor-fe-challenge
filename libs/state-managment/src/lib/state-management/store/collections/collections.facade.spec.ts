import { TestBed } from '@angular/core/testing';
import { CollectionsFacade } from './collections.facade';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as CollectionsActions from './collections.actions';
import { initialState } from './collections.reducer';

describe('CollectionsFacade', () => {
  let facade: CollectionsFacade;
  let store: jest.Mocked<Store>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionsFacade, provideMockStore({ initialState: { collections: initialState } })]
    });

    facade = TestBed.inject(CollectionsFacade);
    store = TestBed.inject(Store) as jest.Mocked<Store>;
    jest.spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should dispatch loadCollections action', () => {
    facade.loadCollections();
    expect(store.dispatch).toHaveBeenCalledWith(CollectionsActions.loadCollections());
  });

  it('should dispatch loadCollection action', () => {
    facade.loadCollection('123');
    expect(store.dispatch).toHaveBeenCalledWith(CollectionsActions.loadCollection({ id: '123' }));
  });
});
