import {USER_LOGIN, USER_LOGOUT} from '@/actions/types';

const initialState = {
    isAuthenticated: false,
    profile: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                profile: action.payload
            };
        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                profile: null
            };
        default:
            return state;
    }
}

export const login = (data) => ({
   type: USER_LOGIN,
   payload: data
});

export const logout = () => ({
    type: USER_LOGOUT
});