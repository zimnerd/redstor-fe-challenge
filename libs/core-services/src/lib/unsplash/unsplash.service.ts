import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface UnsplashResponse<T> {
  results: T[];
  total: number;
  total_pages: number;
}

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private apiUrl = 'https://api.unsplash.com';

  constructor(private http: HttpClient) {}

  listCollections(page = 1, perPage = 10): Observable<UnsplashResponse<any>> {
    return this.http.get<UnsplashResponse<any>>(`${this.apiUrl}/collections?page=${page}&per_page=${perPage}`);
  }
}
