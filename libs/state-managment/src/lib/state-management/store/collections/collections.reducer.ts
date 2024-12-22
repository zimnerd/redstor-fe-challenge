import { createReducer, on } from '@ngrx/store';
import { CollectionsState } from 'shared-interfaces';
import * as CollectionsActions from './collections.actions';

export const COLLECTIONS_FEATURE_KEY = 'collections';

export const initialState: CollectionsState = {
  collections: [],
  loading: false,
  error: null
};

export const collectionsReducer = createReducer(
  initialState,
  on(CollectionsActions.loadCollections, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CollectionsActions.loadCollectionsSuccess, (state, { collections }) => ({
    ...state,
    collections,
    loading: false
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
  }))
);
