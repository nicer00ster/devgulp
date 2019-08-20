import * as types from "../constants";

const initialState = {
  id: null,
  username: "",
  email: "",
  avatar: "",
  token: "",
  isAuthenticated: false,
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingToken: false,
  checkingCredentials: true,
  hasError: false
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_USER:
      return {
        ...state
      };
    case types.FETCH_USER_SUCCESS:
      console.log('FETCH_USER_SUCCESS', action);
      return {
        ...state,
        checkingCredentials: false,
        isAuthenticated: true,
        username: action.user.name,
        email: action.user.user_email,
        id: action.user.id,
        token: action.token,
        avatar: action.user.acf.avatar
      };
    case types.FETCH_USER_FAILURE:
      return {
        ...state,
        checkingCredentials: false,
        isAuthenticated: false,
        hasError: true,
        errorMessage: action.error.message
      };
    case types.LOGIN:
      return {
        ...state,
        isLoggingIn: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        hasError: false,
        errorMessage: "",
        id: action.result.user_id,
        username: action.result.user_nicename,
        email: action.result.user_email,
        token: action.result.token,
        avatar: action.avatar
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        hasError: true,
        errorMessage: action.error.message
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoggingOut: true
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...initialState,
        checkingCredentials: false
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false
      };
    case types.REGISTER:
      return {
        ...state,
        isRegistering: true
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isRegistering: false
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isRegistering: false,
        hasError: true,
        errorMessage: action.error.message
      };
    case types.VERIFIED_TOKEN:
      return {
        ...state,
        isCheckingToken: true
      };
    case types.VERIFIED_TOKEN_SUCCESS:
      return {
        ...state,
        id: action.token.data.user_id,
        username: action.token.data.user_nicename,
        email: action.token.data.user_email,
        token: action.token.data.token,
        isCheckingToken: false,
        isAuthenticated: true,
        hasError: false,
        errorMessage: ""
      };
    case types.VERIFIED_TOKEN_FAILURE:
      return {
        ...state,
        hasError: true,
        errorMessage: action.error.message,
        isCheckingToken: false
      };
    default:
      return state;
  }
}
