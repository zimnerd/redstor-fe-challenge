export * from './collections.actions';
export * from './collections.effects';
export * from './collections.reducer';
export * from './collections.selectors';
export * from './collections.facade';

import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromCollections from './collections.reducer';

export interface State {
  collections: fromCollections.State;
}

export const reducers: ActionReducerMap<State> = {
  collections: fromCollections.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
