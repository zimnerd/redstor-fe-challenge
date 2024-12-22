import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ICollection } from 'shared-interfaces';
import { UnsplashService } from 'core-services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatProgressBarModule, MatCardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  collections: ICollection[] = [];
  isLoading = true;

  constructor(private unsplashService: UnsplashService) {}

  ngOnInit() {
    this.loadCollections();
  }

  private loadCollections() {
    this.isLoading = true;
    this.unsplashService.listCollections().subscribe({
      next: collections => {
        console.log('Received collections:', collections); // Debug log
        this.collections = collections.response?.results || [];
        this.isLoading = false;
      },
      error: error => {
        console.error('Error loading collections:', error);
        this.isLoading = false;
      }
    });
  }
}
