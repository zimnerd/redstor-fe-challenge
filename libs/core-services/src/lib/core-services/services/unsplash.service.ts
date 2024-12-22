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

  listCollections(): Observable<
    ApiResponse<{
      results: ICollection[];
      total: number;
    }>
  > {
    return from(this.api.collections.list({}));
  }

  listCollectionPhotos(id: string): Observable<
    ApiResponse<{
      results: IPhoto[];
      total: number;
    }>
  > {
    return from(this.api.collections.getPhotos({ collectionId: id }));
  }

  getPhoto(id: string): Observable<ApiResponse<Full>> {
    return from(this.api.photos.get({ photoId: id }));
  }
}
