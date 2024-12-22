export * from './collections.selectors';
export * from './collections.reducer';
export * from './collections.actions';
export * from './collections.effects';

import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { collectionsReducer, ICollectionsState } from './collections.reducer';

export interface State {
  collections: ICollectionsState;
}

export const reducers: ActionReducerMap<State> = {
  collections: collectionsReducer
};

export const metaReducers: MetaReducer<State>[] = [];
