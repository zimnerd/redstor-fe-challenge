import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CollectionsEffects } from '../collections.effects';

describe('CollectionsEffects', () => {
  let actions$: Observable<any>;
  let effects: CollectionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(CollectionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
