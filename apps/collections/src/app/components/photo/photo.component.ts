import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UnsplashService } from 'core-services';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IPhoto } from 'shared-interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// toDo Is there a way to improve the rendering strategy in this component?
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule],
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent implements OnInit {
  private unsplashService = inject(UnsplashService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  photo$: BehaviorSubject<IPhoto> = new BehaviorSubject<IPhoto>({} as IPhoto);
  isLoading$: Observable<boolean> = this.photo$.pipe(map(p => !p));
  collectionId: string | null = null;

  ngOnInit(): void {
    const photoId = this.activatedRoute.snapshot.params['photoId'];
    this.collectionId = this.activatedRoute.snapshot.params['collectionId'];

    this.unsplashService
      .getPhoto(photoId)
      .pipe(
        map((response: any) => response.response as IPhoto),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(photo => {
        this.photo$.next(photo);
      });
  }

  handleGotoCollection() {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId]);
  }
}
