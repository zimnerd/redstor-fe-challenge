export interface UnsplashResponse<T> {
  response: T;
  errors?: string[];
  status: number;
}
