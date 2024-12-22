import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { COLLECTIONS_FEATURE_KEY, collectionsReducer } from '../state-management/store/collections';
import { CollectionsEffects } from '../state-management/store/collections/collections.effects';

@NgModule({
  imports: [StoreModule.forFeature(COLLECTIONS_FEATURE_KEY, collectionsReducer), EffectsModule.forFeature([CollectionsEffects])]
})
export class StateModule {}
