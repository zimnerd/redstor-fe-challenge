import { IPhoto } from './photo.interface';

export interface ICollection {
  id: number;
  title: string;
  description: string;
  published_at: Date;
  cover_photo: IPhoto;
  total_photos: number;
  preview_photos?: {
    id: string;
    urls: {
      thumb: string;
      regular: string;
    };
  }[];
  links: {
    self: string;
    html: string;
    photos: string;
    related: string;
  };
}

export interface UnsplashResponse<T> {
  response: T;
  errors?: string[];
  status: number;
}

export interface ICollectionsState {
  collections: ICollection[];
  photos: IPhoto[];
  loading: boolean;
  error: string | null;
  currentPage?: number;
  perPage?: number;
  totalPages?: number;
  total?: number;
  collectionTotal?: number;
}
