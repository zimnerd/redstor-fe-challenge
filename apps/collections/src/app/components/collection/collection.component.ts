import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy, signal, DestroyRef } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UnsplashService } from 'core-services';
import { IPhoto } from 'shared-interfaces';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule],
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {
  private readonly unsplashService = inject(UnsplashService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly photos$ = new BehaviorSubject<IPhoto[]>([]);
  readonly isLoading$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.isLoading$.next(true);
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];

    this.unsplashService
      .listCollectionPhotos(collectionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(photos => {
        this.photos$.next(photos?.response?.results || []);
        this.isLoading$.next(false);
      });
  }

  handleGotoPhoto(photo: IPhoto) {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId, 'photo', photo.id]);
  }
}
