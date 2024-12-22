export interface UnsplashResponse<T> {
  response: T;
  errors?: string[];
  status: number;
}

export interface Collection {
  id: string;
  title: string;
  cover_photo: {
    urls: {
      small: string;
    };
    description: string;
  };
}
