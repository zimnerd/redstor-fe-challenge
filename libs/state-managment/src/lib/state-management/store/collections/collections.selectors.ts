import { createFeatureSelector, createSelector } from '@ngrx/store';
import { COLLECTIONS_FEATURE_KEY } from './collections.reducer';
import { CollectionsState } from 'shared-interfaces';

export const selectCollectionsState = createFeatureSelector<CollectionsState>(COLLECTIONS_FEATURE_KEY);

export const selectAllCollections = createSelector(selectCollectionsState, state => state.collections);

export const selectCollectionsLoading = createSelector(selectCollectionsState, state => state.loading);

export const selectCollectionsError = createSelector(selectCollectionsState, state => state.error);
