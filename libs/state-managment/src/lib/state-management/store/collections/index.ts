export * from './collections.actions';
export * from './collections.reducer';
export * from './collections.selectors';

import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { CollectionsState } from 'shared-interfaces';
import { collectionsReducer } from './collections.reducer';

export interface State {
  collections: CollectionsState;
}

export const reducers: ActionReducerMap<State> = {
  collections: collectionsReducer
};

export const metaReducers: MetaReducer<State>[] = [];
