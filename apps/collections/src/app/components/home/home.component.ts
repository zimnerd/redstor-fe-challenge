import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { UnsplashService } from 'core-services';
import { ICollection } from 'shared-interfaces';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatProgressBarModule, MatCardModule, RouterModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly unsplashService = inject(UnsplashService);
  private readonly destroyRef = inject(DestroyRef);

  isLoading = false;
  collections: ICollection[] = [];

  ngOnInit(): void {
    this.unsplashService
      .listCollections()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(collections => {
        this.collections = collections?.response?.results || [];
        this.isLoading = false;
      });
  }
}
