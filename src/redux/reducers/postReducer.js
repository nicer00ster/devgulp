import * as types from "../constants";

const initialState = {
  post: {},
  author: {},
  isFetchingPost: false,
  hasError: false,
  errorMessage: ""
};

export default function postReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_POST:
      return {
        ...state,
        isFetchingPost: true,
        post: {},
        author: {},
        hasError: false,
        errorMessage: ""
      };
    case types.FETCH_POST_SUCCESS:
      console.log(action);
      return {
        ...state,
        isFetchingPost: false,
        post: { ...action.post },
        author: { ...action.author.data },
        hasError: false,
        errorMessage: ""
      };
    case types.FETCH_POST_FAILURE:
      return {
        ...state,
        isFetchingPost: false,
        hasError: true,
        errorMessage: action.error.message
      };
    default:
      return state;
  }
}
