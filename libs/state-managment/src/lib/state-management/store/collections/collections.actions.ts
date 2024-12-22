import { createAction, props } from '@ngrx/store';
import { ICollection, IPhoto } from 'shared-interfaces';

export const loadCollections = createAction('[Collections] Load Collections', props<{ page: number; perPage: number }>());

export const loadCollectionsSuccess = createAction(
  '[Collections] Load Collections Success',
  props<{
    collections: ICollection[];
    total: number;
  }>()
);

export const loadCollectionsFailure = createAction('[Collections] Load Collections Failure', props<{ error: string }>());

export const addCollection = createAction('[Collections] Add Collection', props<{ collection: ICollection }>());

export const deleteCollection = createAction('[Collections] Delete Collection', props<{ id: number }>());

export const loadCollectionPhotos = createAction(
  '[Collections] Load Collection Photos',
  props<{ collectionId: string; page: number; perPage: number }>()
);

export const loadCollectionPhotosSuccess = createAction(
  '[Collections] Load Collection Photos Success',
  props<{ photos: IPhoto[]; total: number }>()
);

export const loadCollectionPhotosFailure = createAction('[Collections] Load Collection Photos Failure', props<{ error: string }>());
