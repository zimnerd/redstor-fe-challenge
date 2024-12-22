import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ICollection } from 'shared-interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadCollections,
  selectAllCollections,
  selectCollectionsLoading,
  selectCurrentPage,
  selectTotalPages,
  selectTotal
} from 'state-management';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PreviewPopupComponent } from '../preview-popup/preview-popup.component';

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
  totalItems = 0;

  constructor(private store: Store, private dialog: MatDialog) {
    this.collections$ = this.store.select(selectAllCollections);
    this.isLoading$ = this.store.select(selectCollectionsLoading);

    // Use selector instead of accessing state directly
    this.store.select(selectTotal).subscribe(total => {
      this.totalItems = total || 0;
    });
  }

  ngOnInit() {
    this.loadCollections(1);
  }

  loadCollections(page: number, perPage = this.perPage) {
    if (page < 1) page = 1;

    const maxPages = Math.ceil(this.totalItems / perPage);
    if (maxPages > 0 && page > maxPages) {
      page = maxPages;
    }

    this.store.dispatch(
      loadCollections({
        page,
        perPage: Math.min(perPage, 30) // Ensure we respect the 30 item limit
      })
    );
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    const newPage = event.pageIndex + 1;
    const newPerPage = Math.min(event.pageSize, 30);

    if (newPerPage !== this.perPage) {
      this.perPage = newPerPage;
      this.loadCollections(1, newPerPage);
    } else {
      this.loadCollections(newPage, this.perPage);
    }
  }

  openPreview(photo: any) {
    this.dialog.open(PreviewPopupComponent, {
      data: photo,
      panelClass: 'preview-dialog',
      maxWidth: '95vw',
      maxHeight: '95vh'
    });
  }
}
