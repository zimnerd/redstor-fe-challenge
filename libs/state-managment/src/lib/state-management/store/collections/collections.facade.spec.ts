import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CollectionsFacade } from './collections.facade';
import * as CollectionsSelectors from './collections.selectors';
import { loadCollections, loadCollectionPhotos, resetCollectionState } from './collections.actions';

describe('CollectionsFacade', () => {
  let facade: CollectionsFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionsFacade,
        provideMockStore({
          selectors: [
            { selector: CollectionsSelectors.selectAllCollections, value: [] },
            { selector: CollectionsSelectors.selectCollectionsLoading, value: false },
            { selector: CollectionsSelectors.selectCollectionPhotos, value: [] },
            { selector: CollectionsSelectors.selectTotal, value: 0 },
            { selector: CollectionsSelectors.selectCollectionTotal, value: 0 },
            { selector: CollectionsSelectors.selectCollectionsError, value: null },
            { selector: CollectionsSelectors.selectCurrentPage, value: 1 },
            { selector: CollectionsSelectors.selectTotalPages, value: 1 }
          ]
        })
      ]
    });

    facade = TestBed.inject(CollectionsFacade);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have selectors as observables', () => {
    expect(facade.collections$).toBeDefined();
    expect(facade.isLoading$).toBeDefined();
    expect(facade.photos$).toBeDefined();
    expect(facade.total$).toBeDefined();
    expect(facade.collectionTotal$).toBeDefined();
    expect(facade.error$).toBeDefined();
    expect(facade.currentPage$).toBeDefined();
    expect(facade.totalPages$).toBeDefined();
  });

  it('should dispatch loadCollections action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const page = 1;
    const perPage = 10;
    facade.loadCollections(page, perPage);
    expect(dispatchSpy).toHaveBeenCalledWith(loadCollections({ page, perPage }));
  });

  it('should dispatch loadCollectionPhotos action with correct parameters', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const collectionId = '123';
    const page = 1;
    const perPage = 10;
    facade.loadCollectionPhotos(collectionId, page, perPage);
    expect(dispatchSpy).toHaveBeenCalledWith(loadCollectionPhotos({ collectionId, page, perPage: Math.min(perPage, 36) }));
  });

  it('should dispatch resetCollectionState action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    facade.resetCollectionState();
    expect(dispatchSpy).toHaveBeenCalledWith(resetCollectionState());
  });
});
