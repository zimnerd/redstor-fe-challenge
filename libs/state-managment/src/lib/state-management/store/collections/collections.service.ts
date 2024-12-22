import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICollection } from 'shared-interfaces';
import { UnsplashService } from 'core-services';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  constructor(private unsplashService: UnsplashService) {}

  getCollections(page = 1, perPage = 10): Observable<ICollection[]> {
    return this.unsplashService.listCollections(page, perPage).pipe(
      map(result => {
        if (result.type !== 'success') throw new Error('Failed to load collections');

        return result.response.results.map(item => ({
          id: item.id,
          title: item.title,
          published_at: item.published_at,
          cover_photo: item.cover_photo,
          total_photos: item.total_photos
        }));
      })
    );
  }
}
