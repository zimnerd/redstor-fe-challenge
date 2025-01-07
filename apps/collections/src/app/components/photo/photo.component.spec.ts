import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoComponent } from './photo.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { IPhoto } from 'shared-interfaces';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({})
  })
) as jest.Mock;

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoComponent, RouterTestingModule.withRoutes([])],
      providers: [provideMockStore()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;

    // Mock the photo BehaviorSubject
    component.photo$ = new BehaviorSubject<IPhoto>({
      user: {
        profile_image: { medium: 'mock-url' },
        name: 'Mock User',
        first_name: 'Mock',
        last_name: 'User',
        location: 'Mock Location'
      },
      urls: { full: 'mock-photo-url' },
      alt_description: 'Mock Photo',
      description: 'mock description',
      likes: 10,
      views: 100
    } as IPhoto);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
