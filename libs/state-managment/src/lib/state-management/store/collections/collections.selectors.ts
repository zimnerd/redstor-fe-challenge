import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICollectionsState } from './collections.reducer';

export const selectCollectionsState = createFeatureSelector<ICollectionsState>('collections');

export const selectAllCollections = createSelector(selectCollectionsState, (state: ICollectionsState) => state.collections);

export const selectCollectionsLoading = createSelector(selectCollectionsState, (state: ICollectionsState) => state.loading);

export const selectCurrentPage = createSelector(selectCollectionsState, (state: ICollectionsState) => state.currentPage);

export const selectTotalPages = createSelector(selectCollectionsState, (state: ICollectionsState) => state.totalPages);

export const selectCollectionsError = createSelector(selectCollectionsState, state => state.error);
