import * as types from '../constants';

const initialState = {
  posts: [],
  categories: [],
  postCount: 12,
  totalPosts: 0,
  totalPages: 0,
  addPostId: null,
  isFetchingPosts: false,
  isFetchingCategories: false,
  isAddingPost: false,
  isUploadingImage: false,
  imageUrl: '',
  imageId: null,
  hasError: false,
  addPostError: false,
  addMediaError: false,
  errorMessage: '',
  addPostErrorMessage: '',
  addMediaErrorMessage: '',
  taxonomyFilter: 1,
};

export default function postsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FILTER_TAXONOMY:
      return {
        ...state,
        taxonomyFilter: action.taxonomy,
      };
    case types.FETCH_POSTS:
      return {
        ...state,
        isFetchingPosts: true,
      };
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetchingPosts: false,
        postCount: action.postCount,
        totalPosts: action.totalPosts,
        totalPages: parseInt(action.totalPages),
        posts: action.posts,
      };
    case types.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetchingPosts: false,
        hasError: true,
        errorMessage: action.error.message,
      };
    case types.FETCH_POSTS_BY_CATEGORY:
      return {
        ...state,
        isFetchingPosts: true,
      };
    case types.FETCH_POSTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetchingPosts: false,
        posts: action.response.data,
      };
    case types.FETCH_POSTS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        isFetchingPosts: false,
      };
    case types.FETCH_CATEGORIES:
      return {
        ...state,
        isFetchingCategories: true,
      };
    case types.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetchingCategories: false,
        categories: action.categories,
      };
    case types.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetchingCategories: false,
        hasError: true,
        errorMessage: action.error.message,
      };
    case types.ADD_POST:
      return {
        ...state,
        isAddingPost: true,
        addPostError: false,
        addPostErrorMessage: '',
      };
    case types.ADD_POST_SUCCESS:
      return {
        ...state,
        isAddingPost: false,
        imageId: null,
        addPostId: action.response.data.id,
        addPostError: false,
        imageUrl: '',
        posts: [
          ...state.posts,
          { ...action.response.data },
        ],
      };
    case types.ADD_POST_FAILURE:
      return {
        ...state,
        isAddingPost: false,
        addPostId: null,
        addPostError: true,
        addPostErrorMessage: action.error.message,
      };
    case types.ADD_MEDIA:
      return {
        ...state,
        isUploadingImage: true,
      };
    case types.ADD_MEDIA_SUCCESS:
      return {
        ...state,
        isUploadingImage: false,
        hasMediaError: false,
        imageUrl: action.response.data.guid.raw,
        imageId: action.response.data.id,
      };
    case types.ADD_MEDIA_FAILURE:
      return {
        ...state,
        isUploadingImage: false,
        hasMediaError: true,
        addMediaErrorMessage: action.error,
      };
    default:
      return state;
  }
}
