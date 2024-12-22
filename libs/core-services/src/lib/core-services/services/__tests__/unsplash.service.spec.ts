import { TestBed } from '@angular/core/testing';

import { UnsplashService } from '../unsplash.service';

describe('UnsplashService', () => {
  let service: UnsplashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsplashService);
  });

  it('should be created', () => {});

  it('should be able to list collections', async () => {});

  it('should be able to list collection photos', async () => {});
});
