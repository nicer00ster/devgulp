import * as types from '../constants';

const initialState = {
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  loginMenuOpen: false,
  userMenuOpen: false,
  modalOpen: false,
  drawerOpen: false,
  donationMenuOpen: false,
  emojisOpen: false,
  searchExpanded: false,
  online: true,
  taxonomyFilter: 1,
  route: '/',
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_ONLINE:
      return {
        ...state,
        online: true,
      };
    case types.SET_OFFLINE:
      return {
        ...state,
        online: false,
      };
    case types.SCREEN_RESIZE:
      return Object.assign({}, state, {
        ...state,
        screenWidth: action.width,
      });
    case types.LOGIN_SUCCESS:
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loginMenuOpen: false,
        userMenuOpen: false,
      };
    case types.TOGGLE_LOGIN_MENU:
      return {
        ...state,
        loginMenuOpen: !state.loginMenuOpen,
      };
    case types.OPEN_LOGIN_MENU:
      return {
        ...state,
        loginMenuOpen: true,
      };
    case types.TOGGLE_USER_MENU:
      return {
        ...state,
        userMenuOpen: !state.userMenuOpen,
        donationMenuOpen: false,
        loginMenuOpen: false,
        modalOpen: false,
        searchExpanded: false,
      };
    case types.TOGGLE_SEARCH:
      return {
        ...state,
        searchExpanded: !state.searchExpanded,
        donationMenuOpen: false,
        loginMenuOpen: false,
        modalOpen: false,
        userMenuOpen: false,
      };
    case types.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
        loginMenuOpen: false,
        userMenuOpen: false,
        donationMenuOpen: false,
        searchExpanded: false,
        modalOpen: false,
      };
    case types.TOGGLE_DONATION_MENU:
      return {
        ...state,
        donationMenuOpen: !state.donationMenuOpen,
        userMenuOpen: false,
        modalOpen: false,
        searchExpanded: false,
      };
    case types.TOGGLE_EMOJIS:
      return {
        ...state,
        emojisOpen: !state.emojisOpen,
      };
    case types.CLOSE_EMOJIS:
      return {
        ...state,
        emojisOpen: false,
      };
    case types.CLOSE_DONATION_MENU:
      return {
        ...state,
        donationMenuOpen: false,
      };
    case types.CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false,
      };
    case types.TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
        userMenuOpen: false,
        donationMenuOpen: false,
        searchExpanded: false,
        loginMenuOpen: false,
      };
    case types.CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
      };
    case types.FILTER_TAXONOMY:
      return {
        ...state,
        taxonomyFilter: action.taxonomy,
      };
    default:
      return state;
  }
}
