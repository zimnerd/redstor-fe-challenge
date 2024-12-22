import { IPhoto } from './photo.interface';

export interface ICollection {
  id: number;
  title: string;
  published_at: Date;
  cover_photo: IPhoto;
  total_photos: number;
}


export interface UnsplashResponse<T> {
  response: T;
  errors?: string[];
  status: number;
}

export interface ICollectionsState {
  collections: ICollection[];
  loading: boolean;
  error: string | null;
}
