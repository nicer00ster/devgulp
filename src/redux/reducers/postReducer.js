import * as types from '../constants';

const initialState = {
  post: {},
  author: {},
  isFetchingPost: true,
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
        post: action.post,
        // post: {
        //   comments: arrangeComments(action.post.comments),
        //   ...action.post,
        // },
        // post: {
        // comments: arrangeComments(action.post.comments),
        // comments: action.post._embedded['replies']['0'].map(post => post),
        //   ...action.post,
        // },
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
      return {
        ...state,
        isAddingComment: true,
      };
    case types.ADD_COMMENT_SUCCESS:
      const { data } = action.response;
      return {
        ...state,
        isAddingComment: false,
        post: {
          ...state.post,
          comments: [
            {
              comment_ID: data.id,
              comment_post_ID: data.post,
              comment_author: data.author_name,
              comment_content: data.content.raw,
              comment_author_email: data.author_email,
              comment_author_url: data.author_url,
              comment_date: data.date,
              comment_parent: data.parent,
              user_id: data.author,
              comment_author_avatar: data.user_avatar,
            },
            ...state.post.comments,
          ],
        },
      };
    case types.ADD_COMMENT_FAILURE:
      return {
        ...state,
        isAddingComment: false,
      };
    case types.ADD_COMMENT_REPLY:
      return {
        ...state,
        isAddingComment: true,
      };
    case types.ADD_COMMENT_REPLY_SUCCESS:
      return {
        ...state,
        isAddingComment: false,
        post: {
          ...action.response.data,
        },
      };
    case types.ADD_COMMENT_REPLY_FAILURE:
      return {
        ...state,
        isAddingComment: false,
      };
    case types.UPDATE_POST_LIKES:
      return {
        ...state,
      };
    case types.UPDATE_POST_LIKES_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          acf: {
            post_likes: action.response.acf.post_likes,
          },
        },
      };
    case types.UPDATE_POST_LIKES_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
