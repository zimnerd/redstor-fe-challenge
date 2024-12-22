import { Route } from '@angular/router';
import { CollectionComponent, HomeComponent, PhotoComponent } from './components';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'collection/:collectionId', component: CollectionComponent },
  { path: 'collection/:collectionId/photo/:photoId', component: PhotoComponent }
];
