import { ICollectionsState } from './collections/collections.reducer';

export interface AppState {
  collections: ICollectionsState;
}

export * from './collections';
