import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PhotoComponent } from './photo.component';
import { UnsplashService } from 'core-services';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from 'shared-interfaces';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let unsplashServiceMock: any;
  let router: Router;
  let activatedRouteMock: any;

  beforeEach(async () => {
    unsplashServiceMock = {
      getPhoto: jest.fn().mockReturnValue(
        of({
          response: {
            id: '1',
            description: 'Test Photo',
            urls: {
              full: 'https://example.com/photo.jpg'
            },
            user: {
              profile_image: {
                medium: 'https://example.com/profile.jpg'
              }
            }
          } as IPhoto
        })
      )
    };

    activatedRouteMock = {
      snapshot: {
        params: {
          photoId: '1',
          collectionId: '123'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PhotoComponent],
      providers: [
        { provide: UnsplashService, useValue: unsplashServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch photo on init', () => {
    component.ngOnInit();
    expect(unsplashServiceMock.getPhoto).toHaveBeenCalledWith('1');
    component.photo$.subscribe(photo => {
      expect(photo).toEqual({ id: '1', description: 'Test Photo' });
    });
  });

  it('should navigate to collection on handleGotoCollection', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.handleGotoCollection();
    expect(navigateSpy).toHaveBeenCalledWith(['collection', '123']);
  });
});
