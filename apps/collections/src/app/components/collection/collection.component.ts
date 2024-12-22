import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICollection } from 'shared-interfaces';
import { addCollection, deleteCollection, loadCollections, selectAllCollections } from 'state-management';

@Component({
  selector: 'app-collection',
  template: `
    <div *ngIf="collections$ | async as collections">
      <div *ngFor="let collection of collections">
        <h2>{{ collection.title }}</h2>
        <p>{{ collection.description }}</p>
      </div>
    </div>
  `
})
export class CollectionComponent implements OnInit {
  collections$: Observable<ICollection[]>;

  constructor(private store: Store) {
    this.collections$ = this.store.select(selectAllCollections);
  }

  ngOnInit() {
    this.store.dispatch(loadCollections({ page: 1, perPage: 10 }));
  }

  addCollection(collection: ICollection) {
    this.store.dispatch(addCollection({ collection }));
  }

  deleteCollection(id: number) {
    this.store.dispatch(deleteCollection({ id }));
  }
}
