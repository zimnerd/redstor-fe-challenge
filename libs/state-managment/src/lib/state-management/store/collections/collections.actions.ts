import { createAction, props } from '@ngrx/store';
import { ICollection } from 'shared-interfaces';

export const loadCollections = createAction('[Collections] Load Collections');
export const loadCollectionsSuccess = createAction(
  '[Collections] Load Collections success',
  props<{ collections: ICollection[]; total: number; page: number }>()
);
export const loadCollectionsFailure = createAction('[Collections] Load Collections failure');
