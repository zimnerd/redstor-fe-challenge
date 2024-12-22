import { createReducer, on } from '@ngrx/store';
import { ICollection } from 'shared-interfaces';
import * as CollectionsActions from './collections.actions';

export const COLLECTIONS_FEATURE_KEY = 'collections';

export interface ICollectionsState {
  collections: ICollection[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export const initialState: ICollectionsState = {
  collections: [],
  loading: false,
  error: null,
  currentPage: 1,
  perPage: 10,
  totalPages: 0
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
    totalPages: Math.ceil(total / state.perPage)
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
