import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IPhoto } from 'shared-interfaces';
import { loadCollectionPhotos, selectCollectionsLoading, selectCollectionPhotos, selectTotal } from 'state-management';

interface AppState {
  collections: {
    loading: boolean;
    photos: IPhoto[];
    total: number;
  };
}

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class CollectionComponent implements OnInit {
  isLoading$: Observable<boolean>;
  photos$: Observable<IPhoto[]>;
  total$: Observable<number>;
  pageSizeOptions = [10, 20, 30];
  perPage = 10;
  currentCollectionId: string | null = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
    this.isLoading$ = this.store.select(selectCollectionsLoading);
    this.photos$ = this.store.select(selectCollectionPhotos);
    this.total$ = this.store.select(selectTotal);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentCollectionId = params.get('collectionId');
      if (this.currentCollectionId) {
        this.loadPhotos(1, this.perPage);
      }
    });
  }

  loadPhotos(page: number, perPage = this.perPage) {
    if (this.currentCollectionId) {
      this.store.dispatch(
        loadCollectionPhotos({
          collectionId: this.currentCollectionId,
          page,
          perPage: Math.min(perPage, 36) // Limit max items per page
        })
      );
    }
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    const newPage = event.pageIndex + 1;
    const newPerPage = Math.min(event.pageSize, 36);

    if (newPerPage !== this.perPage) {
      this.perPage = newPerPage;
      this.loadPhotos(1, newPerPage);
    } else {
      this.loadPhotos(newPage, this.perPage);
    }
  }

  handleGotoPhoto(photo: IPhoto): void {
    if (this.currentCollectionId) {
      this.router.navigate(['collection', this.currentCollectionId, 'photo', photo.id]);
    }
  }
}
