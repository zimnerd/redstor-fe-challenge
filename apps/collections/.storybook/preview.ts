import { moduleMetadata } from '@storybook/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideMockStore } from '@ngrx/store/testing';

export const decorators = [
  moduleMetadata({
    imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
    providers: [
      provideMockStore({
        initialState: {
          collections: {
            collection: {
              photos: []
            }
          }
        }
      })
    ]
  })
];
