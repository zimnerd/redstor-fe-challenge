import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CollectionsFacade } from 'state-management';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCollectionsFacade: jest.Mocked<CollectionsFacade>;

  beforeEach(async () => {
    mockCollectionsFacade = {
      loadCollections: jest.fn(),
      collections$: of([]),
      loading$: of(false),
      isLoading$: of(false)
    } as unknown as jest.Mocked<CollectionsFacade>;

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
      providers: [{ provide: CollectionsFacade, useValue: mockCollectionsFacade }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load collections on init', () => {
    expect(mockCollectionsFacade.loadCollections).toHaveBeenCalled();
  });

  it('should display loading state', () => {
    mockCollectionsFacade.isLoading$ = of(true);
    fixture.detectChanges();
    expect(component.isLoading$).toBeDefined();
  });
});
