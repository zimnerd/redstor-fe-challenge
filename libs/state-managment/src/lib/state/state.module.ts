import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CollectionsEffects } from '../state-management/store/collections/collections.effects';
import { collectionsReducer } from '../state-management/store/collections/collections.reducer';

@NgModule({
  imports: [StoreModule.forFeature('collections', collectionsReducer), EffectsModule.forFeature([CollectionsEffects])]
})
export class StateModule {}
