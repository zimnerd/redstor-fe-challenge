import { createReducer, on } from '@ngrx/store';
import { ICollectionsState } from 'shared-interfaces';
import * as CollectionsActions from './collections.actions';

export const initialState: ICollectionsState = {
  collections: [],
  photos: [],
  loading: false,
  error: null,
  currentPage: 1,
  perPage: 10,
  totalPages: 0,
  total: 0
};

export const collectionsReducer = createReducer(
  initialState,
  on(CollectionsActions.loadCollections, (state, { page, perPage }) => ({
    ...state,
    loading: true,
    error: null,
    currentPage: page
  })),
  on(CollectionsActions.loadCollectionsSuccess, (state, { collections, total }) => ({
    ...state,
    collections,
    loading: false,
    total,
    totalPages: Math.ceil(total / (state.perPage || 10))
  })),
  on(CollectionsActions.loadCollectionsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(CollectionsActions.addCollection, (state, { collection }) => ({
    ...state,
    collections: [...state.collections, collection]
  })),
  on(CollectionsActions.deleteCollection, (state, { id }) => ({
    ...state,
    collections: state.collections.filter(collection => collection.id !== id)
  })),
  on(CollectionsActions.loadCollectionPhotos, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CollectionsActions.loadCollectionPhotosSuccess, (state, { photos, total }) => ({
    ...state,
    photos,
    loading: false,
    collectionTotal: total
  })),
  on(CollectionsActions.loadCollectionPhotosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
