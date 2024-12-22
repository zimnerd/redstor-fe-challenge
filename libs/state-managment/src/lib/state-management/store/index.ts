import { ICollectionsState } from 'shared-interfaces';

export interface AppState {
  collections: ICollectionsState;
}

export * from './collections';
