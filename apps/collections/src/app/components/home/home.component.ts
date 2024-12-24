import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CollectionsFacade } from 'state-management';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatPaginatorModule, RouterModule, MatToolbarModule]
})
export class HomeComponent implements OnInit {
  readonly collections$ = this.collectionsFacade.collections$;
  readonly isLoading$ = this.collectionsFacade.isLoading$;
  readonly total$ = this.collectionsFacade.total$;
  readonly currentPage$ = this.collectionsFacade.currentPage$;

  pageSizeOptions = [10, 20, 30];
  perPage = 10;

  constructor(private collectionsFacade: CollectionsFacade) {}

  ngOnInit(): void {
    this.loadCollections(1, this.perPage);
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
    const newPage = event.pageIndex + 1;
    const newPerPage = event.pageSize;

    if (newPerPage !== this.perPage) {
      this.perPage = newPerPage;
      this.loadCollections(1, newPerPage);
    } else {
      this.loadCollections(newPage, this.perPage);
    }
  }

  private loadCollections(page: number, perPage: number): void {
    this.collectionsFacade.loadCollections(page, perPage);
  }
}
