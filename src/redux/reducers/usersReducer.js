import * as types from "../constants";

const initialState = {
  users: [],
  isFetchingUsers: false,
  hasError: false,
  errorMessage: ""
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCH_USERS:
      return {
        ...state,
        isFetchingUsers: true
      };
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetchingUsers: false,
        users: action.users,
        hasError: false,
        errorMessage: ""
      };
    case types.FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetchingUsers: false,
        hasError: true,
        errorMessage: action.error.message
      };
    default:
      return state;
  }
}
