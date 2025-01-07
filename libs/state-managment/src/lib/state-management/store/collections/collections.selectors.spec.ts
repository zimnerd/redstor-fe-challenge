import {
  selectCollectionsState,
  selectAllCollections,
  selectCollectionsLoading,
  selectCurrentPage,
  selectTotalPages,
  selectCollectionsError,
  selectTotal,
  selectCollectionTotal,
  selectCollectionPhotos
} from './collections.selectors';
import { ICollectionsState } from 'shared-interfaces';

describe('Collections Selectors', () => {
  const initialState: ICollectionsState = {
    collections: [],
    loading: false,
    currentPage: 1,
    totalPages: 5,
    error: null,
    total: 100,
    collectionTotal: 50,
    photos: []
  };

  it('should select the collections state', () => {
    const result = selectCollectionsState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select all collections', () => {
    const result = selectAllCollections.projector(initialState);
    expect(result).toEqual(initialState.collections);
  });

  it('should select collections loading', () => {
    const result = selectCollectionsLoading.projector(initialState);
    expect(result).toBe(initialState.loading);
  });

  it('should select the current page', () => {
    const result = selectCurrentPage.projector(initialState);
    expect(result).toBe(initialState.currentPage);
  });

  it('should select the total pages', () => {
    const result = selectTotalPages.projector(initialState);
    expect(result).toBe(initialState.totalPages);
  });

  it('should select collections error', () => {
    const result = selectCollectionsError.projector(initialState);
    expect(result).toBe(initialState.error);
  });

  it('should select the total', () => {
    const result = selectTotal.projector(initialState);
    expect(result).toBe(initialState.total);
  });

  it('should select the collection total', () => {
    const result = selectCollectionTotal.projector(initialState);
    expect(result).toBe(initialState.collectionTotal);
  });

  it('should select collection photos', () => {
    const result = selectCollectionPhotos.projector(initialState);
    expect(result).toEqual(initialState.photos);
  });
});
