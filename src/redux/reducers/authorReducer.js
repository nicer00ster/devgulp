import * as types from "../constants";

const initialState = {
  author: {},
  isFetchingAuthor: true,
  hasError: false,
  errorMessage: ""
};

export default function authorReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_AUTHOR:
      return {
        ...state,
        isFetchingAuthor: true,
        author: {},
        hasError: false,
        errorMessage: ""
      };
    case types.FETCH_AUTHOR_SUCCESS:
      return {
        ...state,
        isFetchingAuthor: false,
        author: { ...action.user },
        hasError: false,
        errorMessage: ""
      };
    case types.FETCH_AUTHOR_FAILURE:
      return {
        ...state,
        isFetchingAuthor: false,
        hasError: true,
        errorMessage: action.error.message
      };
    default:
      return state;
  }
}
