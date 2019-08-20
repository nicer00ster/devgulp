// API URL
export const API_URL = 'http://localhost:8000/wp-json/wp/v2';
export const TOKEN_URL = 'http://localhost:8000/wp-json/jwt-auth/v1/token';

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

// Global types
export const SCREEN_RESIZE = 'SCREEN_RESIZE';
export const INPUT = 'INPUT';
export const TOGGLE_LOGIN_MENU = 'TOGGLE_LOGIN_MENU';
export const OPEN_LOGIN_MENU = 'OPEN_LOGIN_MENU';
export const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';
export const OPEN_USER_MENU = 'OPEN_USER_MENU';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const CLOSE_MODAL = 'CLOSE_MODAL';
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

export const FETCH_TOTAL_POSTS = 'FETCH_TOTAL_POSTS';
export const FETCH_TOTAL_POSTS_SUCCESS = 'FETCH_TOTAL_POSTS_SUCCESS';
export const FETCH_TOTAL_POSTS_FAILURE = 'FETCH_TOTAL_POSTS_FAILURE';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_MEDIA = 'ADD_MEDIA';
export const ADD_MEDIA_SUCCESS = 'ADD_MEDIA_SUCCESS';
export const ADD_MEDIA_FAILURE = 'ADD_MEDIA_FAILURE';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
