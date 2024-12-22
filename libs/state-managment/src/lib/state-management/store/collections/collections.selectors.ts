import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICollectionsState } from 'shared-interfaces';

export const selectCollectionsState = createFeatureSelector<ICollectionsState>('collections');

export const selectAllCollections = createSelector(selectCollectionsState, (state: ICollectionsState) => state.collections);

export const selectCollectionsLoading = createSelector(selectCollectionsState, (state: ICollectionsState) => state.loading);

export const selectCurrentPage = createSelector(selectCollectionsState, (state: ICollectionsState) => state.currentPage);

export const selectTotalPages = createSelector(selectCollectionsState, (state: ICollectionsState) => state.totalPages);

export const selectCollectionsError = createSelector(selectCollectionsState, state => state.error);

export const selectTotal = createSelector(selectCollectionsState, state => state.total || 0);

export const selectCollectionPhotos = createSelector(selectCollectionsState, (state: ICollectionsState) => state.photos);
