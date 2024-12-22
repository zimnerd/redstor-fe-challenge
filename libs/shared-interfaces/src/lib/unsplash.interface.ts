export interface UnsplashResponse<T> {
  response: T;
  errors?: string[];
  status: number;
}

export interface Collection {
  id: string;
  title: string;
  description?: string;
  images: string[];
  createdAt: Date;
}

export interface CollectionsState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
}
