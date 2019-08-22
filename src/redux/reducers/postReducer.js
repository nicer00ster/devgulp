import * as types from '../constants';

const initialState = {
  post: {},
  author: {},
  isFetchingPost: false,
  isAddingComment: false,
  hasError: false,
  errorMessage: '',
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
        errorMessage: '',
      };
    case types.FETCH_POST_SUCCESS:
      return {
        ...state,
        isFetchingPost: false,
        post: {
          comments: action.post._embedded['replies']['0'].map(post => post),
          ...action.post,
        },
        author: { ...action.author.data },
        hasError: false,
        errorMessage: '',
      };
    case types.FETCH_POST_FAILURE:
      return {
        ...state,
        isFetchingPost: false,
        hasError: true,
        errorMessage: action.error.message,
      };
    case types.ADD_COMMENT:
    case types.ADD_COMMENT_REPLY:
      return {
        ...state,
        isAddingComment: true,
      };
    case types.ADD_COMMENT_SUCCESS:
    case types.ADD_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        isAddingComment: false,
        post: {
          ...state.post,
          comments: [action.response.data, ...state.post.comments],
        },
      };
    case types.ADD_COMMENT_FAILURE:
    case types.ADD_COMMENT_REPLY_FAILURE:
      return {
        ...state,
        isAddingComment: false,
      };
    default:
      return state;
  }
}
