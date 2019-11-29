// API URL
const BASE_URL = process.env.API_URL;
export const API_URL = BASE_URL + '/wp-json/wp/v2';
export const TOKEN_URL = BASE_URL + '/wp-json/simple-jwt-authentication/v1/token';
export const ACF_URL = BASE_URL + '/wp-json/acf/v3';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/bmp',
];

export const FILE_TYPE_ERROR = {
  error: {
    message: 'File type not allowed.',
  },
};

// Global Types
export const SCREEN_RESIZE = 'SCREEN_RESIZE';
export const INPUT = 'INPUT';
export const TOGGLE_LOGIN_MENU = 'TOGGLE_LOGIN_MENU';
export const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_DONATION_MENU = 'TOGGLE_DONATION_MENU';
export const CLOSE_DONATION_MENU = 'CLOSE_DONATION_MENU';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const OPEN_LOGIN_MENU = 'OPEN_LOGIN_MENU';
export const OPEN_USER_MENU = 'OPEN_USER_MENU';
export const OPEN_MORE_MENU = 'OPEN_MORE_MENU';
export const CLOSE_MORE_MENU = 'CLOSE_MORE_MENU';
export const FILTER_TAXONOMY = 'FILTER_TAXONOMY';

// Auth Types
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const VERIFIED_TOKEN = 'VERIFIED_TOKEN';
export const VERIFIED_TOKEN_SUCCESS = 'VERIFIED_TOKEN_SUCCESS';
export const VERIFIED_TOKEN_FAILURE = 'VERIFIED_TOKEN_FAILURE';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const FETCH_AUTHOR = 'FETCH_AUTHOR';
export const FETCH_AUTHOR_SUCCESS = 'FETCH_AUTHOR_SUCCESS';
export const FETCH_AUTHOR_FAILURE = 'FETCH_AUTHOR_FAILURE';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

export const FETCH_POSTS_BY_CATEGORY = 'FETCH_POSTS_BY_CATEGORY';
export const FETCH_POSTS_BY_CATEGORY_SUCCESS = 'FETCH_POSTS_BY_CATEGORY_SUCCESS';
export const FETCH_POSTS_BY_CATEGORY_FAILURE = 'FETCH_POSTS_BY_CATEGORY_FAILURE';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const FETCH_USER_FOLLOWERS = 'FETCH_USER_FOLLOWERS';
export const FETCH_USER_FOLLOWERS_SUCCESS = 'FETCH_USER_FOLLOWERS_SUCCESS';
export const FETCH_USER_FOLLOWERS_FAILURE = 'FETCH_USER_FOLLOWERS_FAILURE';

export const FETCH_USER_POSTS = 'FETCH_USER_POSTS';
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS';
export const FETCH_USER_POSTS_FAILURE = 'FETCH_USER_POSTS_FAILURE';

export const FETCH_PAGE = 'FETCH_PAGE';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_FAILURE = 'FETCH_PAGE_FAILURE';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_MEDIA = 'ADD_MEDIA';
export const ADD_MEDIA_SUCCESS = 'ADD_MEDIA_SUCCESS';
export const ADD_MEDIA_FAILURE = 'ADD_MEDIA_FAILURE';

export const UPLOAD_AVATAR = 'UPLOAD_AVATAR';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const ADD_COMMENT_REPLY = 'ADD_COMMENT_REPLY';
export const ADD_COMMENT_REPLY_SUCCESS = 'ADD_COMMENT_REPLY_SUCCESS';
export const ADD_COMMENT_REPLY_FAILURE = 'ADD_COMMENT_REPLY_FAILURE';

export const FOLLOW_OR_UNFOLLOW_USER = 'FOLLOW_OR_UNFOLLOW_USER';
export const FOLLOW_OR_UNFOLLOW_USER_SUCCESS = 'FOLLOW_OR_UNFOLLOW_USER_SUCCESS';
export const FOLLOW_OR_UNFOLLOW_USER_FAILURE = 'FOLLOW_OR_UNFOLLOW_USER_FAILURE';

export const UPDATE_POST_LIKES = 'UPDATE_POST_LIKES';
export const UPDATE_POST_LIKES_SUCCESS = 'UPDATE_POST_LIKES_SUCCESS';
export const UPDATE_POST_LIKES_FAILURE = 'UPDATE_POST_LIKES_FAILURE';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE';
