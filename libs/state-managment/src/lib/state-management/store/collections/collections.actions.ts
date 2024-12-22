import { createAction, props } from '@ngrx/store';
import { Collection } from 'shared-interfaces';

export const loadCollections = createAction('[Collections] Load Collections');
export const loadCollectionsSuccess = createAction('[Collections] Load Collections Success', props<{ collections: Collection[] }>());
export const loadCollectionsFailure = createAction('[Collections] Load Collections Failure', props<{ error: string }>());

export const addCollection = createAction('[Collections] Add Collection', props<{ collection: Collection }>());

export const deleteCollection = createAction('[Collections] Delete Collection', props<{ id: string }>());
