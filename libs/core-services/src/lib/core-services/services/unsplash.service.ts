import { Injectable } from '@angular/core';
import { createApi } from 'unsplash-js';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { from, Observable } from 'rxjs';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import { ICollection, IPhoto } from 'shared-interfaces';
import { unsplashAccessKey } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  api;

  constructor() {
    this.api = createApi({ accessKey: unsplashAccessKey });
  }

  listCollections(
    page: number,
    perPage: number
  ): Observable<
    ApiResponse<{
      results: ICollection[];
      total: number;
    }>
  > {
    return from(
      this.api.collections.list({
        page,
        perPage
      })
    );
  }

  listCollectionPhotos(
    id: string,
    page = 1,
    perPage = 10
  ): Observable<
    ApiResponse<{
      results: IPhoto[];
      total: number;
    }>
  > {
    return from(this.api.collections.getPhotos({ collectionId: id, page, perPage }));
  }

  getPhoto(id: string): Observable<ApiResponse<Full>> {
    return from(this.api.photos.get({ photoId: id }));
  }
}
