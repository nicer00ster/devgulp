import * as types from '../constants';

const initialState = {
  results: [],
  isSearching: false,
  hasSearched: false,
  hasError: false,
  query: '',
  errorMessage: '',
};

export default function searchReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SEARCH:
      console.log(action);
      return {
        ...state,
        isSearching: true,
        hasError: false,
        hasSearched: false,
        query: action.query,
        errorMessage: '',
      };
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        results: action.response,
        query: '',
        hasError: false,
        hasSearched: true,
        errorMessage: '',
      };
    case types.SEARCH_FAILURE:
      return {
        ...state,
        isSearching: false,
        query: '',
        hasError: true,
        hasSearched: true,
        errorMessage: action.error.message,
      };
    default:
      return state;
  }
}
