import * as types from '../constants';

const initialState = {
  author: {},
  fetchedFollowers: [],
  isFetchingAuthor: true,
  isUpdatingUser: false,
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
    default:
      return state;
  }
}
