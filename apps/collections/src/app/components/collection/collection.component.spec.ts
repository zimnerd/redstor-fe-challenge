import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CollectionComponent } from './collection.component';
import { CollectionsFacade } from 'state-management';
import { ActivatedRoute } from '@angular/router';
import { IPhoto } from 'shared-interfaces';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let collectionsFacadeMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    collectionsFacadeMock = {
      isLoading$: of(false),
      photos$: of([]),
      total$: of(0),
      collectionTotal$: of(0),
      loadCollectionPhotos: jest.fn(),
      resetCollectionState: jest.fn()
    };

    activatedRouteMock = {
      paramMap: of({
        get: jest.fn().mockReturnValue('1')
      })
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: CollectionsFacade, useValue: collectionsFacadeMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct values', () => {
    expect(component.currentCollectionId).toBe('1');
    expect(collectionsFacadeMock.loadCollectionPhotos).toHaveBeenCalledWith('1', 1, 10);
  });

  it('should call resetCollectionState on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(collectionsFacadeMock.resetCollectionState).toHaveBeenCalled();
  });

  it('should load photos with correct parameters', () => {
    component.currentCollectionId = '1';
    component.loadPhotos(2, 20);
    expect(collectionsFacadeMock.loadCollectionPhotos).toHaveBeenCalledWith('1', 2, 20);
  });

  it('should handle page change correctly', () => {
    component.currentCollectionId = '1';
    component.onPageChange({ pageIndex: 1, pageSize: 20 });
    expect(component.perPage).toBe(20);
    expect(collectionsFacadeMock.loadCollectionPhotos).toHaveBeenCalledWith('1', 1, 20);

    component.onPageChange({ pageIndex: 2, pageSize: 20 });
    expect(collectionsFacadeMock.loadCollectionPhotos).toHaveBeenCalledWith('1', 3, 20);
  });

  it('should navigate to photo correctly', () => {
    const routerSpy = jest.spyOn(component['router'], 'navigate');
    const photo = { id: '123' } as IPhoto;
    component.currentCollectionId = '1';
    component.handleGotoPhoto(photo);
    expect(routerSpy).toHaveBeenCalledWith(['collection', '1', 'photo', '123']);
  });
});
