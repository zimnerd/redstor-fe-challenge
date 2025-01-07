import * as fromCollections from './collections.reducer';
import * as CollectionsSelectors from './collections.selectors';
import { Collection } from '@shared-interfaces';

describe('Collections Selectors', () => {
  const mockCollection: Collection = {
    id: '1',
    name: 'Test Collection',
    items: []
  };

  const initialState: fromCollections.State = {
    collections: [mockCollection],
    selectedCollection: null,
    loading: false,
    error: null
  };

  it('should select collections', () => {
    const result = CollectionsSelectors.selectCollections.projector(initialState);
    expect(result).toEqual([mockCollection]);
  });

  it('should select loading state', () => {
    const result = CollectionsSelectors.selectLoading.projector(initialState);
    expect(result).toBeFalse();
  });

  it('should select selected collection', () => {
    const result = CollectionsSelectors.selectSelectedCollection.projector(initialState);
    expect(result).toBeNull();
  });

  it('should select error state', () => {
    const result = CollectionsSelectors.selectError.projector(initialState);
    expect(result).toBeNull();
  });
});
