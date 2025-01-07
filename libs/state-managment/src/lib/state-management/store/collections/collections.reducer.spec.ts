import { collectionsReducer, initialState } from './collections.reducer';
import * as CollectionsActions from './collections.actions';
import { ICollectionsState, ICollection, IPhoto } from 'shared-interfaces';

describe('Collections Reducer', () => {
  const photo: IPhoto = {
    id: '1',
    width: 800,
    height: 600,
    color: '#000000',
    description: 'A test photo',
    alt_description: 'An alternative description',
    likes: 100,
    views: 1000,
    urls: {
      raw: 'test-raw-url',
      full: 'test-full-url',
      regular: 'test-regular-url',
      small: 'test-small-url',
      thumb: 'test-thumb-url',
      small_s3: 'test-small-s3-url'
    },
    links: {
      self: 'test-self-link',
      html: 'test-html-link',
      download: 'test-download-link',
      download_location: 'test-download-location-link'
    },
    user: {
      id: 'user-1',
      username: 'testuser',
      name: 'Test User',
      first_name: 'Test',
      last_name: 'User',
      profile_image: {
        small: 'test-profile-small-url',
        medium: 'test-profile-medium-url',
        large: 'test-profile-large-url'
      },
      portfolio_url: 'test-portfolio-url',
      location: 'Test Location'
    }
  };

  const collections: ICollection[] = [
    {
      id: 1,
      title: 'Test Title',
      description: 'Test Description',
      total_photos: 10,
      published_at: new Date(),
      cover_photo: photo,
      links: {
        self: 'test-self-link',
        html: 'test-html-link',
        photos: 'test-photos-link',
        related: 'test-related-link'
      }
    }
  ];

  it('should return the initial state', () => {
    const action = { type: 'Unknown' } as any;
    const state = collectionsReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should handle loadCollections action', () => {
    const action = CollectionsActions.loadCollections({ page: 2, perPage: 10 });
    const expectedState: ICollectionsState = {
      ...initialState,
      loading: true,
      error: null,
      currentPage: 2
    };
    const state = collectionsReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle loadCollectionsSuccess action', () => {
    const collections: ICollection[] = [
      {
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        total_photos: 10,
        published_at: new Date(),
        cover_photo: photo,
        links: {
          self: 'test-self-link',
          html: 'test-html-link',
          photos: 'test-photos-link',
          related: 'test-related-link'
        }
      }
    ];

    const action = CollectionsActions.loadCollectionsSuccess({ collections, total: 1 });
    const expectedState: ICollectionsState = {
      ...initialState,
      collections,
      loading: false,
      total: 1,
      totalPages: 1
    };
    const state = collectionsReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle loadCollectionsFailure action', () => {
    const error = 'Error loading collections';
    const action = CollectionsActions.loadCollectionsFailure({ error });
    const expectedState: ICollectionsState = {
      ...initialState,
      error,
      loading: false
    };
    const state = collectionsReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle addCollection action', () => {
    const collection: ICollection = {
      id: 2,
      title: 'New Collection Title',
      description: 'New Collection Description',
      total_photos: 5,
      published_at: new Date(),
      cover_photo: photo,
      links: {
        self: 'new-self-link',
        html: 'new-html-link',
        photos: 'new-photos-link',
        related: 'new-related-link'
      }
    };

    const action = CollectionsActions.addCollection({ collection });
    const expectedState: ICollectionsState = {
      ...initialState,
      collections: [...initialState.collections, collection]
    };
    const state = collectionsReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle deleteCollection action', () => {
    const initialStateWithCollections: ICollectionsState = {
      ...initialState,
      collections
    };
    const action = CollectionsActions.deleteCollection({ id: 1 });
    const expectedState: ICollectionsState = {
      ...initialState,
      collections: []
    };
    const state = collectionsReducer(initialStateWithCollections, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle loadCollectionPhotos action', () => {
    const action = CollectionsActions.loadCollectionPhotos({ collectionId: '123', page: 1, perPage: 10 });
    const expectedState: ICollectionsState = {
      ...initialState,
      loading: true,
      error: null
    };
    const state = collectionsReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle loadCollectionPhotosSuccess action', () => {
    const photos: IPhoto[] = [photo];

    const action = CollectionsActions.loadCollectionPhotosSuccess({ photos, total: 1 });
    const expectedState: ICollectionsState = {
      ...initialState,
      photos,
      loading: false,
      collectionTotal: 1
    };
    const state = collectionsReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle loadCollectionPhotosFailure action', () => {
    const error = 'Error loading photos';
    const action = CollectionsActions.loadCollectionPhotosFailure({ error });
    const expectedState: ICollectionsState = {
      ...initialState,
      error,
      loading: false
    };
    const state = collectionsReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle resetCollectionState action', () => {
    const initialStateWithPhotos: ICollectionsState = {
      ...initialState,
      photos: [photo],
      loading: true,
      error: 'Error'
    };
    const action = CollectionsActions.resetCollectionState();
    const expectedState: ICollectionsState = {
      ...initialState,
      photos: [],
      loading: false,
      error: null
    };
    const state = collectionsReducer(initialStateWithPhotos, action);
    expect(state).toEqual(expectedState);
  });
});
