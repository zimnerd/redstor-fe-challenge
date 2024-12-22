import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ICollection } from 'shared-interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCollections, selectAllCollections, selectCollectionsLoading, selectCurrentPage, selectTotalPages } from 'state-management';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatProgressBarModule, MatCardModule, RouterModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  collections$: Observable<ICollection[]>;
  isLoading$: Observable<boolean>;
  currentPage$ = this.store.select(selectCurrentPage);
  totalPages$ = this.store.select(selectTotalPages);
  pageSizeOptions = [10, 20, 30]; // Unsplash max is 30 per page
  perPage = 10;
  totalItems = 0; // Track total number of items

  constructor(private store: Store) {
    this.collections$ = this.store.select(selectAllCollections);
    this.isLoading$ = this.store.select(selectCollectionsLoading);

    // Subscribe to total pages to calculate total items
    this.totalPages$.subscribe(totalPages => {
      this.totalItems = totalPages * this.perPage;
    });
  }

  ngOnInit() {
    this.loadCollections(1);
  }

  loadCollections(page: number, perPage = this.perPage) {
    // Ensure page is within valid range
    if (page < 1) page = 1;
    this.store.dispatch(loadCollections({ page, perPage }));
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    const newPage = event.pageIndex + 1;
    const newPerPage = event.pageSize;

    if (newPerPage !== this.perPage) {
      // If page size changed, reset to first page
      this.perPage = newPerPage;
      this.loadCollections(1, newPerPage);
    } else {
      // Otherwise just load the requested page
      this.loadCollections(newPage, this.perPage);
    }
  }
}
