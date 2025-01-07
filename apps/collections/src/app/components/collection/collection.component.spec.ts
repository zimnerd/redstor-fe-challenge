import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionComponent } from './collection.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CollectionsFacade } from 'state-management';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let mockCollectionsFacade: jest.Mocked<CollectionsFacade>;

  beforeEach(async () => {
    mockCollectionsFacade = {
      loadCollection: jest.fn(),
      loadCollectionPhotos: jest.fn(),
      selectedCollection$: of(null),
      loading$: of(false),
      resetCollectionState: jest.fn()
    } as unknown as jest.Mocked<CollectionsFacade>;

    await TestBed.configureTestingModule({
      imports: [CollectionComponent],
      providers: [
        { provide: CollectionsFacade, useValue: mockCollectionsFacade },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (collectionId: string) => '123'
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load collection based on route param', () => {
    expect(mockCollectionsFacade.loadCollectionPhotos).toHaveBeenCalledWith('123', 1, 10);
  });
});
