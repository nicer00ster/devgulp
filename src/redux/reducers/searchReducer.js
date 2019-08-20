import * as types from "../constants";

const initialState = {
    results: [],
    isSearching: false,
    hasError: false,
    errorMessage: "",
};

export default function searchReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.SEARCH:
            return {
                ...state,
                isSearching: true,
                hasError: false,
                errorMessage: "",
            };
        case types.SEARCH_SUCCESS:
            return {
                ...state,
                isSearching: false,
                results: action.response,
                hasError: false,
                errorMessage: "",
            };
        case types.SEARCH_FAILURE:
            return {
                ...state,
                isSearching: false,
                hasError: true,
                errorMessage: action.error.message,
            };
        default:
            return state;
    }
}
