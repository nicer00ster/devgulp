import * as types from "../constants";

const initialState = {
  screenWidth: typeof window === "object" ? window.innerWidth : null,
  loginMenuOpen: false,
  userMenuOpen: false,
  modalOpen: false,
  drawerOpen: false,
  searchExpanded: false,
  taxonomyFilter: 1,
  route: "/"
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SCREEN_RESIZE:
      return Object.assign({}, state, {
        ...state,
        screenWidth: action.width
      });
    case types.LOGIN_SUCCESS:
    case types.TOGGLE_LOGIN_MENU:
      return {
        ...state,
        loginMenuOpen: !state.loginMenuOpen
      };
    case types.OPEN_LOGIN_MENU:
      return {
        ...state,
        loginMenuOpen: true,
      };
    case types.LOGOUT_SUCCESS:
    case types.TOGGLE_USER_MENU:
      return {
        ...state,
        userMenuOpen: !state.userMenuOpen
      };
    case types.TOGGLE_SEARCH:
      return {
        ...state,
        searchExpanded: !state.searchExpanded,
      };
    case types.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };
    case types.TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen
      };
    case types.CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
      };
    case types.FILTER_TAXONOMY:
      return {
        ...state,
        taxonomyFilter: action.taxonomy
      };
    default:
      return state;
  }
}
