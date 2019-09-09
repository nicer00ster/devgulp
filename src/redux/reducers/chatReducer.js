import * as types from '../constants';

const initialState = {
    message: '',
    messagingUser: null,
};

export default function chatReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.SEND_MESSAGE:
            return {
                ...state,
                message: action.message,
            };
        case types.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
            };
        case types.SEND_MESSAGE_FAILURE:
            return {
                ...state,
            };
        case types.SET_MESSAGING_USER:
            return {
                ...state,
                messagingUser: action.user,
            };
        default:
            return state;
    }
}
