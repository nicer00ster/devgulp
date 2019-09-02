import * as types from '../constants';

const initialState = {
    page: {},
    isFetchingPage: true,
    hasError: false,
    errorMessage: '',
};

export default function pageReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_PAGE:
            return {
                ...state,
            };
        case types.FETCH_PAGE_SUCCESS:
            return {
                ...state,
                page: { ...action.response.data[0] },
                isFetchingPage: false,
                hasError: false,
                errorMessage: '',
            };
        case types.FETCH_PAGE_FAILURE:
            return {
                ...state,
                isFetchingPage: false,
                hasError: true,
                errorMessage: action.error.message,
            };
        default:
            return state;
    }
}
