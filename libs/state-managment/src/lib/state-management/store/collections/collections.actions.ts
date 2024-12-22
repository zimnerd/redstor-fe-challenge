import { createAction, props } from '@ngrx/store';
import { ICollection } from 'shared-interfaces';

export const loadCollections = createAction('[Collections] Load Collections', props<{ page: number; perPage: number }>());

export const loadCollectionsSuccess = createAction(
  '[Collections] Load Collections Success',
  props<{ collections: ICollection[]; total: number }>()
);

export const loadCollectionsFailure = createAction('[Collections] Load Collections Failure', props<{ error: string }>());

export const addCollection = createAction('[Collections] Add Collection', props<{ collection: ICollection }>());

export const deleteCollection = createAction('[Collections] Delete Collection', props<{ id: number }>());
