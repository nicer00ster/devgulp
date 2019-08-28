import * as types from '../constants';

const initialState = {
  author: {},
  posts: [],
  fetchedFollowers: [],
  isFetchingAuthor: true,
  isFetchingUserPosts: true,
  isUpdatingUser: false,
  isUploadingAvatar: false,
  hasError: false,
  errorMessage: '',
};

export default function authorReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_AUTHOR:
      return {
        ...state,
        isFetchingAuthor: true,
        author: {},
        hasError: false,
        errorMessage: '',
      };
    case types.FETCH_AUTHOR_SUCCESS:
      return {
        ...state,
        isFetchingAuthor: false,
        author: { ...action.user },
        hasError: false,
        errorMessage: '',
      };
    case types.FETCH_AUTHOR_FAILURE:
      return {
        ...state,
        isFetchingAuthor: false,
        hasError: true,
        errorMessage: action.error.message,
      };
    case types.UPDATE_USER_INFO:
      return {
        ...state,
        isUpdatingUser: true,
      };
    case types.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        author: {
          ...state.author,
          description: action.response.data.description,
          company_name: action.response.data.company_name,
        },
        isUpdatingUser: false,
      };
    case types.UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        isUpdatingUser: false,
      };
    case types.FETCH_USER_FOLLOWERS:
      return {
        ...state,
        isFetchingFollowers: true,
        fetchedFollowers: [],
      };
    case types.FETCH_USER_FOLLOWERS_SUCCESS:
      return {
        ...state,
        isFetchingFollowers: false,
        fetchedFollowers: action.response.data,
      };
    case types.FETCH_USER_FOLLOWERS_FAILURE:
      return {
        ...state,
        isFetchingFollowers: false,
      };
    case types.FETCH_USER_POSTS:
      return {
        ...state,
      };
    case types.FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.response.data,
        isFetchingUserPosts: false,
      };
    case types.FETCH_USER_POSTS_FAILURE:
      return {
        ...state,
        isFetchingUserPosts: false,
      };
    case types.FOLLOW_OR_UNFOLLOW_USER:
      return {
        ...state,
        isUpdatingUser: true,
      };
    case types.FOLLOW_OR_UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        isUpdatingUser: false,
        author: {
          ...state.author,
          acf: {
            ...state.author.acf,
            user_followers: action.response.data.map(user => user.id),
          },
        },
        fetchedFollowers: action.response.data,
      };
    case types.FOLLOW_OR_UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        isUpdatingUser: false,
      };
    case types.UPLOAD_AVATAR:
      return {
        ...state,
        isUploadingAvatar: true,
      };
    case types.UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        isUploadingAvatar: false,
        author: {
          ...state.author,
          acf: {
            ...state.author.acf,
            avatar: action.response.data.acf.avatar,
          },
        },
      };
    case types.UPLOAD_AVATAR_FAILURE:
      return {
        ...state,
        isUploadingAvatar: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
}
