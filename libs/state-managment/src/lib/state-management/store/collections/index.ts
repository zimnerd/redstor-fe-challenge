export * from './collections.selectors';
export * from './collections.reducer';
export * from './collections.actions';
export * from './collections.effects';

import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { collectionsReducer } from './collections.reducer';
import { ICollectionsState } from 'shared-interfaces';

export interface State {
  collections: ICollectionsState;
}

export const reducers: ActionReducerMap<State> = {
  collections: collectionsReducer
};

export const metaReducers: MetaReducer<State>[] = [];
