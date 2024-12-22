import { createReducer, on } from '@ngrx/store';
import { ICollection } from 'shared-interfaces';
import { loadCollectionsSuccess } from './collections.actions';

export const collectionsFeatureKey = 'collections';

export interface State {
  collections: ICollection[];
}

export const initialState: State = {
  collections: []
};

export const reducer = createReducer(
  initialState,
  on(loadCollectionsSuccess, (state, { collections }) => ({ ...state, collections }))
);
