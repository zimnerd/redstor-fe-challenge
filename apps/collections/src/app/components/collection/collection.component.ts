import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from 'shared-interfaces';
import { CollectionsFacade } from 'state-management';
import { TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    NavbarComponent,
    TranslateModule
  ]
})
export class CollectionComponent implements OnInit, OnDestroy {
  readonly isLoading$ = this.collectionsFacade.isLoading$;
  readonly photos$ = this.collectionsFacade.photos$;
  readonly total$ = this.collectionsFacade.total$;
  readonly collectionTotal$ = this.collectionsFacade.collectionTotal$;

  pageSizeOptions = [10, 20, 30];
  perPage = 10;
  currentCollectionId: string | null = null;

  constructor(
    private collectionsFacade: CollectionsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentCollectionId = params.get('collectionId');
      if (this.currentCollectionId) {
        this.loadPhotos(1, this.perPage);
      }
    });
  }

  ngOnDestroy(): void {
    this.collectionsFacade.resetCollectionState();
  }

  loadPhotos(page: number, perPage = this.perPage): void {
    if (this.currentCollectionId) {
      this.collectionsFacade.loadCollectionPhotos(this.currentCollectionId, page, perPage);
    }
  }

  onPageChange(event: { pageIndex: number; pageSize: number }): void {
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

  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;
    this.translate.use(language);
  }
}
