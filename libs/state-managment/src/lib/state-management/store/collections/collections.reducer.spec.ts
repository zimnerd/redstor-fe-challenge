import { reducer, initialState } from './collections.reducer';
import * as CollectionsActions from './collections.actions';
import { Collection } from '@shared-interfaces';

describe('Collections Reducer', () => {
  const mockCollection: Collection = {
    id: '1',
    name: 'Test Collection',
    items: []
  };

  describe('loadCollections action', () => {
    it('should set loading to true', () => {
      const action = CollectionsActions.loadCollections();
      const state = reducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('loadCollectionsSuccess action', () => {
    it('should update collections and set loading to false', () => {
      const collections = [mockCollection];
      const action = CollectionsActions.loadCollectionsSuccess({ collections });
      const state = reducer(initialState, action);

      expect(state.collections).toEqual(collections);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('loadCollectionsFailure action', () => {
    it('should set error and loading to false', () => {
      const error = 'Error loading collections';
      const action = CollectionsActions.loadCollectionsFailure({ error });
      const state = reducer(initialState, action);

      expect(state.error).toBe(error);
      expect(state.loading).toBe(false);
    });
  });
});
